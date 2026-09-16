import "server-only";
import Stripe from "stripe";

// Stripe client + the settings the rest of the payment code reads.
//
// Import only from app/api/**/route.ts. The secret key must never reach the
// browser, so nothing here may be imported from a "use client" file.

/**
 * Deliberately NOT validated at module load, unlike lib/push.ts.
 *
 * A module-scope throw means `next build` fails for anyone whose environment
 * lacks the keys — CI, a teammate checking out the repo, a preview deploy — even
 * for pages that never touch Stripe, because collecting page data evaluates the
 * module. Failing on first real use instead keeps the build honest while still
 * making a misconfiguration loud the moment a payment is attempted.
 */
function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Set it in .env.local — see lib/stripe.ts.`);
  }
  return value;
}

let client: Stripe | null = null;

export function stripe(): Stripe {
  if (client) return client;

  client = new Stripe(requiredEnv("STRIPE_SECRET_KEY"), {
    // Pinned rather than left to float: an account-level API version change in
    // the Stripe dashboard would otherwise silently alter the shape of webhook
    // payloads this code parses. This is the version the installed SDK's types
    // are generated against (stripe@22), so types and runtime agree.
    apiVersion: "2026-08-26.dahlia",
    appInfo: { name: "StudyNL Hub Plus" },
  });

  return client;
}

/** The recurring €9.99/month Hub Plus price, created in the Stripe dashboard. */
export function hubPlusPriceId(): string {
  return requiredEnv("STRIPE_PRICE_ID");
}

export function webhookSecret(): string {
  return requiredEnv("STRIPE_WEBHOOK_SECRET");
}

/**
 * Billing portal configuration to open the portal with.
 *
 * Optional: without it Stripe falls back to the account's default portal
 * settings, which are edited by hand in the dashboard and could cancel
 * subscriptions immediately. The Cancellation & Refund Policy promises
 * cancellation takes effect at the end of the paid period, so the configuration
 * created by the setup script pins that in place rather than trusting a
 * checkbox nobody will look at again.
 */
export function portalConfigurationId(): string | undefined {
  return process.env.STRIPE_PORTAL_CONFIG_ID || undefined;
}

/**
 * Absolute base URL for Checkout's return links. Stripe redirects the browser
 * here, so it has to be a real public URL — a relative path is rejected.
 */
export function siteUrl(): string {
  return requiredEnv("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "");
}

/**
 * Whether the configured key is a test key.
 *
 * Used to label the checkout page while we're in test mode, so nobody mistakes
 * a test card run for a real payment.
 */
export function isTestMode(): boolean {
  return (process.env.STRIPE_SECRET_KEY ?? "").startsWith("sk_test_");
}
