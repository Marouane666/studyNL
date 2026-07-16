import { supabaseAdmin } from "@/lib/supabase/admin";
import { jsonError } from "@/lib/http";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("id, display_name, created_at")
    .order("created_at", { ascending: true });

  if (error) return jsonError("Couldn't load members.", 500);

  return Response.json({
    members: (data ?? []).map((m) => ({
      id: m.id,
      displayName: m.display_name,
      joinedAt: m.created_at,
    })),
  });
}
