import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const endpoint = typeof body?.endpoint === "string" ? body.endpoint : "";
  const p256dh = typeof body?.keys?.p256dh === "string" ? body.keys.p256dh : "";
  const authKey = typeof body?.keys?.auth === "string" ? body.keys.auth : "";

  if (!endpoint || !p256dh || !authKey) return jsonError("Invalid subscription.", 400);

  const user = await getCurrentUser();

  const { error } = await supabaseAdmin.from("push_subscriptions").upsert(
    {
      user_id: user?.id ?? null,
      endpoint,
      p256dh,
      auth_key: authKey,
      user_agent: request.headers.get("user-agent") ?? null,
    },
    { onConflict: "endpoint" },
  );

  if (error) {
    console.error("POST /api/push/subscribe upsert failed:", error);
    return jsonError("Couldn't save subscription.", 500);
  }

  return Response.json({ ok: true });
}
