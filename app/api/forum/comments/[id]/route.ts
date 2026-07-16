import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser, isModerator } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!isModerator(user)) return jsonError("Moderators only.", 403);

  const { id } = await params;
  const { error } = await supabaseAdmin.from("forum_comments").delete().eq("id", id);
  if (error) return jsonError("Couldn't delete that comment.", 500);

  return Response.json({ ok: true });
}
