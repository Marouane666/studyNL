// Starts a Hub Plus subscription.
//
// This route does everything up to the payment and nothing after it: it makes
// sure there's an account, files the withdrawal consent, and hands back a
// Stripe Checkout URL for the browser to go to.
//
// It deliberately does NOT grant premium access. Access is granted only by
// app/api/stripe/webhook, because this request finishes the moment the customer
// is sent to Stripe — long before anyone has paid. Granting here would hand out
// memberships to anyone who opened the checkout page and walked away.
//
// Card details never touch this server: Stripe's hosted page collects them, and
// Apple Pay and Google Pay appear there automatically on supported devices.

import { supabaseAdmin, createEphemeralAuthClient } from "@/lib/supabase/admin";
import { getCurrentUser, setSessionCookies, type CurrentUser } from "@/lib/auth/session";
import { getOrCreateStripeCustomer } from "@/lib/membership";
import { isPremium } from "@/lib/plan";
import { hubPlusPriceId, siteUrl, stripe } from "@/lib/stripe";
import { isValidEmail, jsonError } from "@/lib/http";
import { POLICY_VERSION, WITHDRAWAL_CONSENT_TEXT } from "@/lib/legal";
import { DEFAULT_LANG } from "@/lib/languages";

const CONSENT_REQUIRED_MESSAGE =
  "Please confirm you consent to immediate access before continuing.";

/**
 * Files the withdrawal-right waiver for a purchase.
 *
 * Stores the sentence itself rather than a boolean: a consent record is only
 * evidence if it reproduces what the member was actually shown, and the wording
 * changes over time. Recorded before the customer leaves for Stripe, because
 * that is the moment they actually ticked the box.
 *
 * Deliberately not fatal — someone must never be blocked from paying because an
 * audit row failed to insert, so a failure here is logged loudly instead.
 */
async function recordConsent(userId: string, request: Request) {
  const { error } = await supabaseAdmin.from("hub_plus_consents").insert({
    user_id: userId,
    policy_version: POLICY_VERSION,
    consent_text: WITHDRAWAL_CONSENT_TEXT,
    user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
  });

  if (error) console.error("hub-plus consent record failed for", userId, error);
}

/** Creates the account for a visitor who isn't signed in, and signs them in. */
async function createAccount(body: {
  name: string;
  email: string;
  password: string;
}): Promise<{ user: CurrentUser } | { error: Response }> {
  const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email: body.email,
    password: body.password,
    email_confirm: true,
    user_metadata: { name: body.name },
  });

  if (createError || !created.user) {
    console.error("hub-plus checkout createUser failed:", createError);
    const alreadyExists = createError?.code === "email_exists" || createError?.status === 422;
    return {
      error: jsonError(
        alreadyExists
          ? "An account with that email already exists. Please log in first, then upgrade."
          : "Something went wrong. Please try again.",
        alreadyExists ? 409 : 500,
      ),
    };
  }

  // plan stays 'free' until Stripe confirms payment.
  const { error: profileError } = await supabaseAdmin.from("profiles").insert({
    id: created.user.id,
    display_name: body.name,
    email: body.email,
  });

  if (profileError) {
    console.error("hub-plus checkout profile insert failed:", profileError);
    await supabaseAdmin.auth.admin.deleteUser(created.user.id);
    return { error: jsonError("Something went wrong. Please try again.", 500) };
  }

  // A fresh client, not supabaseAdmin: signInWithPassword establishes an
  // in-memory session on whichever client calls it, and every later query on
  // that same client would then run as this user instead of the service role.
  const { data: signIn } = await createEphemeralAuthClient().auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  // A failed auto-login isn't fatal here: the account exists and Stripe
  // Checkout doesn't need a session. They'll be asked to log in on return.
  if (signIn?.session) await setSessionCookies(signIn.session);

  return {
    user: {
      id: created.user.id,
      email: body.email,
      displayName: body.name,
      role: "member",
      plan: "free",
      planExpiresAt: null,
      language: DEFAULT_LANG,
    },
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  // Checked before anything else: the waiver has to be given before delivery
  // begins, so no path creates an account or starts a payment without it.
  // `=== true` and not a truthy check — only an explicit tick is express consent.
  if (body?.consent !== true) return jsonError(CONSENT_REQUIRED_MESSAGE, 400);

  let user = await getCurrentUser();

  if (user && isPremium(user)) {
    return jsonError("You already have an active Hub Plus membership.", 409);
  }

  if (!user) {
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!name) return jsonError("Please enter your name.", 400);
    if (name.length > 80) return jsonError("Name is too long.", 400);
    if (!isValidEmail(email)) return jsonError("Please enter a valid email address.", 400);
    if (password.length < 6) return jsonError("Password must be at least 6 characters.", 400);

    const result = await createAccount({ name, email, password });
    if ("error" in result) return result.error;
    user = result.user;
  }

  await recordConsent(user.id, request);

  try {
    const customerId = await getOrCreateStripeCustomer(user);

    const session = await stripe().checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: hubPlusPriceId(), quantity: 1 }],

      // Stripe Tax needs to know where the customer is to pick the right VAT
      // rate, and for digital services the billing address is what decides it.
      billing_address_collection: "required",
      automatic_tax: { enabled: true },
      // Required whenever automatic tax runs against an existing customer:
      // it lets Checkout write the address it collects back onto them.
      customer_update: { address: "auto", name: "auto" },

      // Both ids are set: client_reference_id is what the Checkout Session
      // carries, while subscription metadata survives onto every later
      // invoice and renewal event, which is what the webhook reads.
      client_reference_id: user.id,
      metadata: { supabase_user_id: user.id },
      subscription_data: { metadata: { supabase_user_id: user.id } },

      // A route of its own rather than ?status= on the join page: reading a
      // query param there would force a Suspense boundary around a prerendered
      // page, and a dedicated page can poll for the webhook without a flash of
      // the signup form first.
      success_url: `${siteUrl()}/hub-plus/welcome`,
      cancel_url: `${siteUrl()}/hub-plus/join`,
    });

    if (!session.url) {
      console.error("stripe checkout session had no url:", session.id);
      return jsonError("Could not start checkout. Please try again.", 502);
    }

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("hub-plus checkout session failed:", err);
    return jsonError("Could not start checkout. Please try again.", 502);
  }
}
