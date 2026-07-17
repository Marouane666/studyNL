import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser, isAdmin } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";
import { webpush } from "@/lib/push";

const MAX_TITLE_LENGTH = 100;
const MAX_BODY_LENGTH = 500;

export async function GET() {
  const user = await getCurrentUser();
  if (!isAdmin(user)) return jsonError("Admins only.", 403);

  const { data, error } = await supabaseAdmin.from("push_subscriptions").select("id");
  if (error) return jsonError("Couldn't load subscribers.", 500);

  return Response.json({ subscriberCount: data?.length ?? 0 });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!isAdmin(user)) return jsonError("Admins only.", 403);

  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const message = typeof body?.body === "string" ? body.body.trim() : "";
  const url = typeof body?.url === "string" && body.url.trim() ? body.url.trim() : "/";

  if (!title || title.length > MAX_TITLE_LENGTH) return jsonError("Title is required (max 100 characters).", 400);
  if (!message || message.length > MAX_BODY_LENGTH) return jsonError("Message is required (max 500 characters).", 400);

  const { data: subscriptions, error } = await supabaseAdmin
    .from("push_subscriptions")
    .select("id, endpoint, p256dh, auth_key, created_at");

  if (error) return jsonError("Couldn't load subscribers.", 500);
  if (!subscriptions || subscriptions.length === 0) {
    return Response.json({ accepted: 0, failed: 0, removed: 0 });
  }

  const payload = JSON.stringify({ title, body: message, url });
  const staleIds: string[] = [];
  // "Accepted" — the push service (FCM/etc.) took the message for delivery.
  // This is NOT proof it was ever displayed on a device; that last mile
  // depends on the OS/browser actually waking the app in the background.
  let accepted = 0;
  let failed = 0;

  await Promise.all(
    subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth_key },
          },
          payload,
        );
        accepted += 1;
      } catch (err: unknown) {
        failed += 1;
        const e = err as { statusCode?: number; body?: string; headers?: Record<string, string> };
        // Logged in full — statusCode alone can't distinguish "genuinely
        // expired" from a config problem (e.g. InvalidRegistration,
        // MismatchSenderId) that a push service can also report as 404/410.
        // .body/.headers carry that distinction and were previously discarded.
        console.error(
          `[push-debug] send failed sub=${sub.id} createdAt=${sub.created_at} ` +
            `endpoint=...${sub.endpoint.slice(-24)} statusCode=${e?.statusCode} ` +
            `body=${e?.body} headers=${JSON.stringify(e?.headers)}`,
        );
        // 404/410 mean the browser unsubscribed or the endpoint expired —
        // keeping those rows around would just fail again on every future send.
        if (e?.statusCode === 404 || e?.statusCode === 410) staleIds.push(sub.id);
      }
    }),
  );

  if (staleIds.length > 0) {
    await supabaseAdmin.from("push_subscriptions").delete().in("id", staleIds);
  }

  return Response.json({ accepted, failed, removed: staleIds.length });
}
