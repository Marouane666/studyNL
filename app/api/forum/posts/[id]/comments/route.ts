import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser, isModerator } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";

const MAX_COMMENT_LENGTH = 2000;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: postId } = await params;
  const user = await getCurrentUser();

  let query = supabaseAdmin
    .from("forum_comments")
    .select("id, author_id, body, status, created_at")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (!isModerator(user)) query = query.eq("status", "visible");

  const { data, error } = await query;

  if (error) return jsonError("Couldn't load comments.", 500);

  const authorIds = Array.from(new Set((data ?? []).map((c) => c.author_id)));
  const { data: profiles } = authorIds.length
    ? await supabaseAdmin.from("profiles").select("id, display_name, role").in("id", authorIds)
    : { data: [] as { id: string; display_name: string; role: string }[] };
  const nameById = new Map((profiles ?? []).map((p) => [p.id, p.display_name as string]));
  const roleById = new Map((profiles ?? []).map((p) => [p.id, p.role as string]));

  const comments = (data ?? []).map((c) => ({
    id: c.id,
    body: c.body,
    status: c.status === "hidden" ? "hidden" : "visible",
    createdAt: c.created_at,
    author: {
      id: c.author_id,
      displayName: nameById.get(c.author_id) || "Member",
      role: roleById.get(c.author_id) ?? "member",
    },
  }));

  return Response.json({ comments });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return jsonError("Log in to comment.", 401);

  const { id: postId } = await params;
  const body = await request.json().catch(() => null);
  const text = typeof body?.body === "string" ? body.body.trim() : "";

  if (!text) return jsonError("Write a comment before posting.", 400);
  if (text.length > MAX_COMMENT_LENGTH) return jsonError("That comment is too long.", 400);

  const { data, error } = await supabaseAdmin
    .from("forum_comments")
    .insert({ post_id: postId, author_id: user.id, body: text })
    .select("id, author_id, body, status, created_at")
    .single();

  if (error || !data) return jsonError("Couldn't post that comment.", 500);

  return Response.json({
    comment: {
      id: data.id,
      body: data.body,
      status: data.status === "hidden" ? "hidden" : "visible",
      createdAt: data.created_at,
      author: { id: user.id, displayName: user.displayName, role: user.role },
    },
  });
}
