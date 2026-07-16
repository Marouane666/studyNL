import { supabaseAdmin } from "@/lib/supabase/admin";
import { clearSessionCookies, getAccessTokenForSignOut } from "@/lib/auth/session";

export async function POST() {
  const accessToken = await getAccessTokenForSignOut();

  if (accessToken) {
    // Best-effort server-side revocation; cookies are cleared either way.
    await supabaseAdmin.auth.admin.signOut(accessToken, "global").catch(() => {});
  }

  await clearSessionCookies();
  return Response.json({ ok: true });
}
