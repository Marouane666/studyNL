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
    .select("id, endpoint, p256dh, auth_key");

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
        const statusCode = (err as { statusCode?: number })?.statusCode;
        // Logged so the actual error code is on record for next time, instead
        // of only ever branching on 404/410 and losing everything else.
        console.error(`Push send failed for subscription ${sub.id}: statusCode=${statusCode}`, err);
        // 404/410 mean the browser unsubscribed or the endpoint expired —
        // keeping those rows around would just fail again on every future send.
        if (statusCode === 404 || statusCode === 410) staleIds.push(sub.id);
      }
    }),
  );

  if (staleIds.length > 0) {
    await supabaseAdmin.from("push_subscriptions").delete().in("id", staleIds);
  }

  return Response.json({ accepted, failed, removed: staleIds.length });
}
