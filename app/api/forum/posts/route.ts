import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser, isModerator } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";
import { enrichPosts } from "@/lib/forum/serialize";
import { isForumMediaUrl } from "@/lib/forum/media";

const MAX_BODY_LENGTH = 4000;

export async function GET() {
  const user = await getCurrentUser();

  let query = supabaseAdmin
    .from("forum_posts")
    .select("id, author_id, body, image_url, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  // Regular members and anonymous visitors never see hidden posts; moderators
  // and admins see everything (with a "hidden" badge) so they can manage them.
  if (!isModerator(user)) query = query.eq("status", "visible");

  const { data, error } = await query;

  if (error) return jsonError("Couldn't load posts.", 500);

  const posts = await enrichPosts(data ?? [], user?.id ?? null);
  return Response.json({ posts });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return jsonError("Log in to post.", 401);

  const body = await request.json().catch(() => null);
  const text = typeof body?.body === "string" ? body.body.trim() : "";
  const rawImageUrl = typeof body?.imageUrl === "string" ? body.imageUrl : "";
  // Only accept image URLs that point at our own forum-media bucket, otherwise a
  // caller hitting this endpoint directly could post an arbitrary third-party image
  // URL (bypassing the upload route's size/type checks, loading in every viewer's browser).
  const imageUrl = rawImageUrl && isForumMediaUrl(rawImageUrl) ? rawImageUrl : null;

  if (!text) return jsonError("Write something before posting.", 400);
  if (text.length > MAX_BODY_LENGTH) return jsonError("That post is too long.", 400);

  const { data, error } = await supabaseAdmin
    .from("forum_posts")
    .insert({ author_id: user.id, body: text, image_url: imageUrl })
    .select("id, author_id, body, image_url, status, created_at")
    .single();

  if (error || !data) {
    console.error("POST /api/forum/posts insert failed:", error);
    return jsonError("Couldn't publish that post.", 500);
  }

  const [post] = await enrichPosts([data], user.id);
  return Response.json({ post });
}
