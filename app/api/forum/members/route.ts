import { supabaseAdmin } from "@/lib/supabase/admin";
import { jsonError } from "@/lib/http";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("id, display_name, role, created_at")
    .eq("status", "active")
    .order("created_at", { ascending: true });

  if (error) return jsonError("Couldn't load members.", 500);

  return Response.json({
    members: (data ?? []).map((m) => ({
      id: m.id,
      displayName: m.display_name,
      role: m.role,
      joinedAt: m.created_at,
    })),
  });
}
