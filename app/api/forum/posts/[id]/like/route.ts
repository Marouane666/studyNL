import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return jsonError("Log in to like posts.", 401);

  const { id: postId } = await params;

  const { data: existing, error: lookupError } = await supabaseAdmin
    .from("forum_likes")
    .select("post_id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (lookupError) return jsonError("Couldn't update your like.", 500);

  const mutation = existing
    ? supabaseAdmin.from("forum_likes").delete().eq("post_id", postId).eq("user_id", user.id)
    : supabaseAdmin.from("forum_likes").insert({ post_id: postId, user_id: user.id });

  const { error: mutationError } = await mutation;
  if (mutationError) return jsonError("Couldn't update your like.", 500);

  // Plain select (not a HEAD count request) so a real error body is parseable, 
  // see the view route for why head:true count queries are avoided here.
  const { data: likes, error: countError } = await supabaseAdmin
    .from("forum_likes")
    .select("user_id")
    .eq("post_id", postId);

  if (countError) return jsonError("Couldn't update your like.", 500);

  return Response.json({ liked: !existing, likeCount: likes?.length ?? 0 });
}
