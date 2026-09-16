// Opens Stripe's billing portal for the signed-in member.
//
// This is the cancellation facility the Cancellation & Refund Policy promises
// ("through the Hub Plus account or membership area"), and it also covers
// updating a card and downloading invoices — all of which would otherwise be
// screens we'd have to build, and PCI surface we'd rather not own.
//
// Cancelling in the portal doesn't change anything here directly: Stripe emits
// customer.subscription.updated, and app/api/stripe/webhook applies it. One
// writer for membership state, always.

import { getCurrentUser } from "@/lib/auth/session";
import { getStripeCustomerId } from "@/lib/membership";
import { portalConfigurationId, siteUrl, stripe } from "@/lib/stripe";
import { jsonError } from "@/lib/http";

export async function POST() {
  const user = await getCurrentUser();
  if (!user) return jsonError("Please log in first.", 401);

  const customerId = await getStripeCustomerId(user.id);
  if (!customerId) {
    // Someone granted premium by hand from /ps-admin has no Stripe customer,
    // so there is genuinely no billing to manage. Said plainly rather than
    // failing with a generic error.
    return jsonError("There's no billing set up on this account.", 400);
  }

  try {
    const configuration = portalConfigurationId();

    const session = await stripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${siteUrl()}/hub-plus/dashboard/membership`,
      ...(configuration ? { configuration } : {}),
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("hub-plus portal session failed:", err);
    return jsonError("Could not open billing. Please try again.", 502);
  }
}
