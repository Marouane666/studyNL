// MOCK CHECKOUT — no payment provider is wired up yet.
//
// This endpoint completes the /hub-plus/join flow end to end (account + premium
// access) so the membership experience can be demoed and reviewed, but it takes
// no money: whatever payment method the form shows is never charged. When a real
// provider (Mollie / Stripe / Adyen) lands, the grant below moves behind that
// provider's webhook and this route goes back to only creating the account.
//
// Until then it can be switched off with HUB_PLUS_MOCK_CHECKOUT=off, which makes
// premium grantable from /ps-admin only.

import { supabaseAdmin, createEphemeralAuthClient } from "@/lib/supabase/admin";
import { getCurrentUser, setSessionCookies } from "@/lib/auth/session";
import { grantPremium } from "@/lib/membership";
import { isValidEmail, jsonError } from "@/lib/http";

const MOCK_CHECKOUT_ENABLED = process.env.HUB_PLUS_MOCK_CHECKOUT !== "off";

export async function POST(request: Request) {
  if (!MOCK_CHECKOUT_ENABLED) {
    return jsonError("Hub Plus checkout isn't available yet.", 503);
  }

  // Already signed in: upgrade the account in place, no details needed.
  const current = await getCurrentUser();
  if (current) {
    const { error } = await grantPremium(current.id);
    if (error) {
      console.error("hub-plus checkout upgrade failed:", error);
      return jsonError("Something went wrong. Please try again.", 500);
    }
    return Response.json({
      mock: true,
      user: { ...current, plan: "premium", planExpiresAt: null },
    });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!name) return jsonError("Please enter your name.", 400);
  if (name.length > 80) return jsonError("Name is too long.", 400);
  if (!isValidEmail(email)) return jsonError("Please enter a valid email address.", 400);
  if (password.length < 6) return jsonError("Password must be at least 6 characters.", 400);

  const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name },
  });

  if (createError || !created.user) {
    console.error("hub-plus checkout createUser failed:", createError);
    const alreadyExists = createError?.code === "email_exists" || createError?.status === 422;
    return jsonError(
      alreadyExists
        ? "An account with that email already exists. Please log in first, then upgrade."
        : "Something went wrong. Please try again.",
      alreadyExists ? 409 : 500,
    );
  }

  const { error: profileError } = await supabaseAdmin.from("profiles").insert({
    id: created.user.id,
    display_name: name,
    email,
    plan: "premium",
    plan_started_at: new Date().toISOString(),
  });

  if (profileError) {
    console.error("hub-plus checkout profile insert failed:", profileError);
    await supabaseAdmin.auth.admin.deleteUser(created.user.id);
    return jsonError("Something went wrong. Please try again.", 500);
  }

  // A fresh client, not supabaseAdmin: signInWithPassword establishes an
  // in-memory session on whichever client calls it, and every later query on
  // that same client would then run as this user instead of the service role.
  const { data: signIn, error: signInError } = await createEphemeralAuthClient().auth.signInWithPassword({
    email,
    password,
  });

  if (signInError || !signIn.session) {
    // Account + membership exist, only the immediate auto-login failed, so the
    // client falls back to a normal login with the same credentials.
    return Response.json({ mock: true, requiresLogin: true });
  }

  await setSessionCookies(signIn.session);

  return Response.json({
    mock: true,
    user: {
      id: created.user.id,
      email,
      displayName: name,
      role: "member",
      plan: "premium",
      planExpiresAt: null,
    },
  });
}
