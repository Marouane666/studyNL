import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser, isAdmin } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";

const VALID_ROLES = new Set(["member", "moderator", "admin"]);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!isAdmin(user)) return jsonError("Admins only.", 403);

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const role = typeof body?.role === "string" ? body.role : "";

  if (!VALID_ROLES.has(role)) return jsonError("Invalid role.", 400);
  if (id === user!.id && role !== "admin") {
    return jsonError("You can't remove your own admin access.", 400);
  }

  const { error } = await supabaseAdmin.from("profiles").update({ role }).eq("id", id);
  if (error) return jsonError("Couldn't update that user's role.", 500);

  return Response.json({ ok: true, role });
}
