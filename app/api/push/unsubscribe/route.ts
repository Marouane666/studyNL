import { supabaseAdmin } from "@/lib/supabase/admin";
import { jsonError } from "@/lib/http";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const endpoint = typeof body?.endpoint === "string" ? body.endpoint : "";
  if (!endpoint) return jsonError("Invalid subscription.", 400);

  const { error } = await supabaseAdmin.from("push_subscriptions").delete().eq("endpoint", endpoint);
  if (error) return jsonError("Couldn't remove subscription.", 500);

  return Response.json({ ok: true });
}
