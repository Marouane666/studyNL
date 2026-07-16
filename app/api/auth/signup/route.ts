import { supabaseAdmin, createEphemeralAuthClient } from "@/lib/supabase/admin";
import { setSessionCookies } from "@/lib/auth/session";
import { isValidEmail, jsonError } from "@/lib/http";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!name) return jsonError("Please enter your name.", 400);
  if (!isValidEmail(email)) return jsonError("Please enter a valid email address.", 400);
  if (password.length < 6) return jsonError("Password must be at least 6 characters.", 400);
  if (name.length > 80) return jsonError("Name is too long.", 400);

  const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name },
  });

  if (createError || !created.user) {
    console.error("signup createUser failed:", createError);
    const alreadyExists = createError?.code === "email_exists" || createError?.status === 422;
    return jsonError(
      alreadyExists ? "An account with that email already exists." : "Something went wrong. Please try again.",
      alreadyExists ? 409 : 500,
    );
  }

  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .insert({ id: created.user.id, display_name: name });

  if (profileError) {
    console.error("signup profile insert failed:", profileError);
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
    // Account + profile were created successfully — only the immediate auto-login
    // failed (e.g. a transient error). Say so with 200, not a hard failure: the
    // client falls back to a normal login with the same credentials.
    return Response.json({ requiresLogin: true });
  }

  await setSessionCookies(signIn.session);

  return Response.json({
    user: { id: created.user.id, email, displayName: name },
  });
}
