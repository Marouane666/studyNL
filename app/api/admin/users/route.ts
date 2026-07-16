import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser, isAdmin } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";

export async function GET() {
  const user = await getCurrentUser();
  if (!isAdmin(user)) return jsonError("Admins only.", 403);

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("id, display_name, email, role, status, created_at")
    .order("created_at", { ascending: true });

  if (error) return jsonError("Couldn't load users.", 500);

  return Response.json({
    users: (data ?? []).map((u) => ({
      id: u.id,
      displayName: u.display_name,
      email: u.email,
      role: u.role,
      status: u.status,
      joinedAt: u.created_at,
    })),
  });
}
