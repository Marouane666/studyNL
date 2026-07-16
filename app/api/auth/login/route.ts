import { supabaseAdmin, createEphemeralAuthClient } from "@/lib/supabase/admin";
import { setSessionCookies } from "@/lib/auth/session";
import { isValidEmail, jsonError } from "@/lib/http";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!isValidEmail(email) || !password) {
    return jsonError("Invalid email or password.", 401);
  }

  // A fresh client, not supabaseAdmin: signInWithPassword establishes an
  // in-memory session on whichever client calls it, and every later query on
  // that same client would then run as this user instead of the service role.
  const { data, error } = await createEphemeralAuthClient().auth.signInWithPassword({
    email,
    password,
  });
  if (error || !data.session || !data.user) {
    return jsonError("Invalid email or password.", 401);
  }

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("display_name, role, status")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profile?.status === "suspended") {
    await supabaseAdmin.auth.admin.signOut(data.session.access_token, "global").catch(() => {});
    return jsonError("This account has been suspended.", 403);
  }

  await setSessionCookies(data.session);

  return Response.json({
    user: {
      id: data.user.id,
      email: data.user.email ?? email,
      displayName: profile?.display_name || email,
      role: profile?.role ?? "member",
    },
  });
}
