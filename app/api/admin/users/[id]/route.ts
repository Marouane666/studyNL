import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser, isAdmin } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!isAdmin(user)) return jsonError("Admins only.", 403);

  const { id } = await params;
  if (id === user!.id) return jsonError("You can't delete your own account.", 400);

  const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
  if (error) return jsonError("Couldn't delete that user.", 500);

  return Response.json({ ok: true });
}
