import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser, isModerator } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!isModerator(user)) return jsonError("Moderators only.", 403);

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = typeof body?.status === "string" ? body.status : "";
  if (status !== "visible" && status !== "hidden") return jsonError("Invalid status.", 400);

  const { error } = await supabaseAdmin.from("forum_comments").update({ status }).eq("id", id);
  if (error) return jsonError("Couldn't update that comment.", 500);

  return Response.json({ ok: true, status });
}
