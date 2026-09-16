import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe";

// Server-side writes to a profile's Hub Plus membership. Kept in one place so
// the admin control panel and the checkout flow can't drift into writing the
// plan columns differently.

/**
 * Starts (or extends) a premium membership.
 *
 * @param expiresAt ISO timestamp the membership lapses at, or null for an
 *   open-ended grant with no end date.
 */
export async function grantPremium(userId: string, expiresAt: string | null = null) {
  const patch: Record<string, unknown> = {
    plan: "premium",
    plan_expires_at: expiresAt,
  };

  // Stamped only the first time. plan_started_at answers "a member since when",
  // so rewriting it whenever an admin adjusts someone's plan would quietly
  // destroy that history — and disagree with the webhook path, which preserves it.
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("plan_started_at")
    .eq("id", userId)
    .maybeSingle();

  if (!data?.plan_started_at) patch.plan_started_at = new Date().toISOString();

  return supabaseAdmin.from("profiles").update(patch).eq("id", userId);
}

/** Drops the account back to free access immediately. */
export async function revokePremium(userId: string) {
  return supabaseAdmin
    .from("profiles")
    .update({ plan: "free", plan_expires_at: null })
    .eq("id", userId);
}

/**
 * The Stripe customer for this account, creating one on first checkout.
 *
 * Reused across checkouts on purpose: a fresh customer per attempt would split
 * one person's invoices across several records and leave the billing portal
 * showing only their most recent subscription.
 *
 * The Supabase user id goes into Stripe metadata as well as our own column, so
 * a customer can still be traced back to an account from the Stripe dashboard
 * alone — useful when handling a support request or a chargeback.
 */
export async function getOrCreateStripeCustomer(user: {
  id: string;
  email: string;
  displayName: string;
}): Promise<string> {
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.stripe_customer_id) return profile.stripe_customer_id;

  const customer = await stripe().customers.create({
    email: user.email,
    name: user.displayName,
    metadata: { supabase_user_id: user.id },
  });

  const { error } = await supabaseAdmin
    .from("profiles")
    .update({ stripe_customer_id: customer.id })
    .eq("id", user.id);

  if (error) {
    // The customer exists in Stripe but we failed to remember it. Surfacing
    // this rather than continuing: carrying on would create a second customer
    // on the next attempt, which is the exact duplication this function exists
    // to prevent, and it would go unnoticed until someone read the invoices.
    console.error("failed to store stripe_customer_id for", user.id, error);
    throw new Error("Could not link your account to Stripe.");
  }

  return customer.id;
}

/**
 * Mirrors a Stripe subscription onto the profile. The webhook's only writer.
 *
 * `accessUntil` is what actually controls access (lib/plan.ts), and it tracks
 * the subscription's current period end. That makes the failure mode safe: if
 * webhooks stop arriving entirely, memberships quietly expire at the end of the
 * period already paid for, rather than continuing forever.
 */
export async function applyStripeSubscription(
  userId: string,
  input: {
    subscriptionId: string;
    status: string;
    /** ISO timestamp access runs to, or null when the subscription is over. */
    accessUntil: string | null;
    active: boolean;
  },
) {
  const patch: Record<string, unknown> = {
    stripe_subscription_id: input.subscriptionId,
    subscription_status: input.status,
    plan: input.active ? "premium" : "free",
    plan_expires_at: input.active ? input.accessUntil : null,
  };

  if (input.active) {
    // Only stamped the first time: plan_started_at answers "since when have
    // they been a member", so refreshing it on every renewal would erase that.
    const { data } = await supabaseAdmin
      .from("profiles")
      .select("plan_started_at")
      .eq("id", userId)
      .maybeSingle();

    if (!data?.plan_started_at) patch.plan_started_at = new Date().toISOString();
  }

  return supabaseAdmin.from("profiles").update(patch).eq("id", userId);
}

/** Finds the account behind a Stripe customer id, for events without metadata. */
export async function findUserByStripeCustomer(customerId: string): Promise<string | null> {
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  return data?.id ?? null;
}

/** The Stripe customer already linked to this account, if any. */
export async function getStripeCustomerId(userId: string): Promise<string | null> {
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", userId)
    .maybeSingle();

  return data?.stripe_customer_id ?? null;
}

export type CancelResult = { stopped: boolean; reason?: string };

/**
 * Ends this account's Stripe subscription immediately, so billing stops.
 *
 * Called by every path that takes a membership away — admin delete, revoke,
 * suspend, and a full refund. Before this existed, each of those changed only
 * our own database while Stripe carried on charging the card every month, which
 * is the kind of bug a customer discovers before we do.
 *
 * Reports rather than throws: the caller decides whether a failure should stop
 * what it was doing (deleting an account) or merely be reported (suspending
 * someone, where locking them out is the urgent part).
 *
 * Cancelling emits customer.subscription.deleted, and the webhook applies it —
 * so membership state still has a single writer. Callers that need the change
 * to be visible immediately write it themselves too; both are idempotent.
 */
export async function cancelStripeSubscription(userId: string): Promise<CancelResult> {
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("stripe_subscription_id")
    .eq("id", userId)
    .maybeSingle();

  const subscriptionId = data?.stripe_subscription_id;
  // Nothing to stop: an admin-granted membership never had a subscription.
  if (!subscriptionId) return { stopped: true };

  try {
    const existing = await stripe().subscriptions.retrieve(subscriptionId);

    // Already over — treated as success so a repeated admin action doesn't fail.
    if (existing.status === "canceled" || existing.status === "incomplete_expired") {
      return { stopped: true };
    }

    await stripe().subscriptions.cancel(subscriptionId);
    return { stopped: true };
  } catch (err) {
    // The subscription is gone from Stripe entirely; nothing left to bill.
    if (typeof err === "object" && err !== null && "code" in err && err.code === "resource_missing") {
      return { stopped: true };
    }

    const reason = err instanceof Error ? err.message : "unknown error";
    console.error("failed to cancel stripe subscription for", userId, err);
    return { stopped: false, reason };
  }
}
