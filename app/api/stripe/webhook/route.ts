// Stripe webhook — the only place Hub Plus access is granted or removed.
//
// Everything else in the payment flow is a redirect the customer could skip,
// abandon or open directly. This is the one channel that Stripe itself signs,
// so it is the only one trusted to change a membership.
//
// Two things about the current API version (2026-08-26.dahlia) that older
// examples get wrong, and which fail silently rather than loudly:
//   * `current_period_end` is no longer on the Subscription — it lives on each
//     subscription ITEM. Reading it off the subscription yields undefined, which
//     would set an empty expiry and hand out unlimited access.
//   * `invoice.subscription` is gone; it moved to
//     `invoice.parent.subscription_details.subscription`.
//
// Redelivery is safe: every handler is an idempotent "set state to this", so
// Stripe replaying an event simply writes the same values again.

import type Stripe from "stripe";
import { stripe, webhookSecret } from "@/lib/stripe";
import {
  applyStripeSubscription,
  cancelStripeSubscription,
  findUserByStripeCustomer,
  revokePremium,
} from "@/lib/membership";

/**
 * Statuses that should keep the member's access on.
 *
 * `past_due` is included on purpose: Stripe retries a failed payment over
 * several days, and locking someone out on the first decline — often an expired
 * card — creates a support problem out of something that usually fixes itself.
 * Access still stops on its own at the period end if the retries never succeed.
 */
const ACTIVE_STATUSES = new Set<Stripe.Subscription.Status>(["active", "trialing", "past_due"]);

/**
 * A little slack past the paid period so a renewal webhook arriving a few
 * minutes late can't briefly lock out a paying member. It cannot extend a
 * cancelled membership: `customer.subscription.deleted` revokes access outright
 * when the subscription actually ends.
 */
const RENEWAL_GRACE_MS = 24 * 60 * 60 * 1000;

/** Latest period end across the subscription's items (see note above). */
function accessUntil(subscription: Stripe.Subscription): string | null {
  const ends = subscription.items.data
    .map((item) => item.current_period_end)
    .filter((value): value is number => typeof value === "number");

  if (ends.length === 0) return null;
  return new Date(Math.max(...ends) * 1000 + RENEWAL_GRACE_MS).toISOString();
}

/** The Supabase account behind a subscription: metadata first, customer second. */
async function resolveUserId(subscription: Stripe.Subscription): Promise<string | null> {
  const fromMetadata = subscription.metadata?.supabase_user_id;
  if (fromMetadata) return fromMetadata;

  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;

  return customerId ? findUserByStripeCustomer(customerId) : null;
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const userId = await resolveUserId(subscription);
  if (!userId) {
    // Logged rather than thrown: retrying won't conjure an account, and a 500
    // would make Stripe redeliver this forever.
    console.error("stripe webhook: no account for subscription", subscription.id);
    return;
  }

  const active = ACTIVE_STATUSES.has(subscription.status);

  const { error } = await applyStripeSubscription(userId, {
    subscriptionId: subscription.id,
    status: subscription.status,
    accessUntil: accessUntil(subscription),
    active,
  });

  // Thrown so the handler returns 500 and Stripe retries: a write we lost here
  // means someone has paid and has no access, which must not be swallowed.
  if (error) throw new Error(`failed to apply subscription for ${userId}: ${error.message}`);
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing stripe-signature header", { status: 400 });

  // The raw body, not request.json(): the signature is computed over the exact
  // bytes Stripe sent, so parsing and re-serialising would invalidate it.
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = await stripe().webhooks.constructEventAsync(payload, signature, webhookSecret());
  } catch (err) {
    // Almost always a stale STRIPE_WEBHOOK_SECRET rather than an attack.
    console.error("stripe webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        // Only subscription checkouts matter here, and only paid ones.
        if (session.mode !== "subscription" || session.payment_status === "unpaid") break;

        const subscriptionId =
          typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
        if (!subscriptionId) break;

        // Re-fetched rather than trusted from the session: this gives the
        // authoritative status and period, and the same code path as renewals.
        const subscription = await stripe().subscriptions.retrieve(subscriptionId);
        await syncSubscription(subscription);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        // `deleted` arrives with status 'canceled', so the same sync handles
        // it — ACTIVE_STATUSES excludes it and access is dropped.
        await syncSubscription(event.data.object);
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object;

        // Only a full refund ends the membership. A partial one is usually a
        // goodwill gesture or a correction, and cutting access off for it would
        // punish the customer for our own generosity.
        if (!charge.refunded) {
          console.info("stripe webhook: partial refund on charge", charge.id, "— access unchanged");
          break;
        }

        // `charge.invoice` no longer exists in this API version, so the customer
        // is the link back to the account.
        const customerId =
          typeof charge.customer === "string" ? charge.customer : charge.customer?.id;
        if (!customerId) break;

        const userId = await findUserByStripeCustomer(customerId);
        if (!userId) {
          console.error("stripe webhook: refund for unknown customer", customerId);
          break;
        }

        // Refunding without cancelling would leave the member with full access
        // and another charge due next month — the exact two-step that gets
        // forgotten. Doing both here means whoever issues the refund is done.
        const billing = await cancelStripeSubscription(userId);
        if (!billing.stopped) {
          throw new Error(`refund for ${userId}: subscription still active (${billing.reason})`);
        }

        const { error } = await revokePremium(userId);
        if (error) throw new Error(`refund for ${userId}: ${error.message}`);

        console.info("stripe webhook: full refund — membership ended for", userId);
        break;
      }

      case "invoice.payment_failed": {
        // Access is not touched here; the accompanying
        // customer.subscription.updated moves the status to past_due. This is
        // the hook a "your payment failed" email will hang off once an email
        // provider exists.
        const invoice = event.data.object;
        const subscriptionRef = invoice.parent?.subscription_details?.subscription;
        const subscriptionId =
          typeof subscriptionRef === "string" ? subscriptionRef : subscriptionRef?.id;
        console.warn("stripe webhook: payment failed for subscription", subscriptionId ?? "unknown");
        break;
      }

      default:
        // Everything else is acknowledged and ignored, so Stripe stops retrying.
        break;
    }
  } catch (err) {
    console.error(`stripe webhook handler failed for ${event.type}:`, err);
    return new Response("Handler failed", { status: 500 });
  }

  return Response.json({ received: true });
}
