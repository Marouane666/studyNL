import { supabaseAdmin } from "@/lib/supabase/admin";
import { setSessionCookies } from "@/lib/auth/session";
import { isValidEmail, jsonError } from "@/lib/http";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!isValidEmail(email) || !password) {
    return jsonError("Invalid email or password.", 401);
  }

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password });
  if (error || !data.session || !data.user) {
    return jsonError("Invalid email or password.", 401);
  }

  await setSessionCookies(data.session);

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("display_name")
    .eq("id", data.user.id)
    .maybeSingle();

  return Response.json({
    user: {
      id: data.user.id,
      email: data.user.email ?? email,
      displayName: profile?.display_name || email,
    },
  });
}
