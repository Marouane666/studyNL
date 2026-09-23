// Sets a new password from a password-reset link.
//
// The link in the reset email lands on /reset-password with a recovery access
// token in the URL fragment; that page posts it here with the new password.
// The token is what proves the visitor opened the email, so it is verified
// with Supabase before anything changes.

import { supabaseAdmin } from "@/lib/supabase/admin";
import { jsonError } from "@/lib/http";

const INVALID_LINK_MESSAGE = "This reset link has expired or was already used. Please request a new one.";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const accessToken = typeof body?.accessToken === "string" ? body.accessToken : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (password.length < 6) return jsonError("Password must be at least 6 characters.", 400);
  if (!accessToken) return jsonError(INVALID_LINK_MESSAGE, 401);

  const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !data.user) return jsonError(INVALID_LINK_MESSAGE, 401);

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("status")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profile?.status === "suspended") return jsonError("This account has been suspended.", 403);

  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(data.user.id, {
    password,
  });
  if (updateError) {
    console.error("password reset update failed for", data.user.id, updateError);
    return jsonError("Something went wrong. Please try again.", 500);
  }

  // A reset is often done because someone else might know the old password,
  // so every existing session, including the recovery one, is ended and the
  // member signs in again with the new password.
  await supabaseAdmin.auth.admin.signOut(accessToken, "global").catch(() => {});

  return Response.json({ ok: true });
}
