import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser, isAdmin } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!isAdmin(user)) return jsonError("Admins only.", 403);

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = typeof body?.status === "string" ? body.status : "";

  if (status !== "active" && status !== "suspended") return jsonError("Invalid status.", 400);
  if (id === user!.id) return jsonError("You can't suspend your own account.", 400);

  const { error } = await supabaseAdmin.from("profiles").update({ status }).eq("id", id);
  if (error) return jsonError("Couldn't update that user's status.", 500);

  return Response.json({ ok: true, status });
}
