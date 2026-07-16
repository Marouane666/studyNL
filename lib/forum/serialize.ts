import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type ForumPost = {
  id: string;
  body: string;
  imageUrl: string | null;
  createdAt: string;
  author: { id: string; displayName: string };
  likeCount: number;
  likedByMe: boolean;
  commentCount: number;
  viewCount: number;
};

type RawPost = {
  id: string;
  author_id: string;
  body: string;
  image_url: string | null;
  created_at: string;
};

/** Batches profile/like/comment/view lookups for a page of posts into one round-trip each. */
export async function enrichPosts(
  posts: RawPost[],
  currentUserId: string | null,
): Promise<ForumPost[]> {
  if (posts.length === 0) return [];

  const postIds = posts.map((p) => p.id);
  const authorIds = Array.from(new Set(posts.map((p) => p.author_id)));

  // Aggregate counts come from Postgres functions (one row per post_id), not raw
  // per-like/comment/view rows — a plain `.in("post_id", postIds)` select on
  // popular posts could exceed PostgREST's default row cap and silently
  // undercount. "likedByMe" stays a plain select: it's scoped to one user, so
  // it can return at most postIds.length rows regardless of total like volume.
  const [profilesRes, likeCountsRes, commentCountsRes, viewCountsRes, myLikesRes] = await Promise.all([
    supabaseAdmin.from("profiles").select("id, display_name").in("id", authorIds),
    supabaseAdmin.rpc("forum_like_counts", { post_ids: postIds }),
    supabaseAdmin.rpc("forum_comment_counts", { post_ids: postIds }),
    supabaseAdmin.rpc("forum_view_counts", { post_ids: postIds }),
    currentUserId
      ? supabaseAdmin.from("forum_likes").select("post_id").eq("user_id", currentUserId).in("post_id", postIds)
      : Promise.resolve({ data: [] as { post_id: string }[] }),
  ]);

  const displayNameById = new Map(
    (profilesRes.data ?? []).map((p) => [p.id as string, p.display_name as string]),
  );

  const likeCountByPost = new Map<string, number>(
    (likeCountsRes.data ?? []).map((r: { post_id: string; count: number }) => [r.post_id, Number(r.count)]),
  );
  const commentCountByPost = new Map<string, number>(
    (commentCountsRes.data ?? []).map((r: { post_id: string; count: number }) => [r.post_id, Number(r.count)]),
  );
  const viewCountByPost = new Map<string, number>(
    (viewCountsRes.data ?? []).map((r: { post_id: string; count: number }) => [r.post_id, Number(r.count)]),
  );
  const likedByMeSet = new Set((myLikesRes.data ?? []).map((r) => r.post_id));

  return posts.map((p) => ({
    id: p.id,
    body: p.body,
    imageUrl: p.image_url,
    createdAt: p.created_at,
    author: { id: p.author_id, displayName: displayNameById.get(p.author_id) || "Member" },
    likeCount: likeCountByPost.get(p.id) ?? 0,
    likedByMe: likedByMeSet.has(p.id),
    commentCount: commentCountByPost.get(p.id) ?? 0,
    viewCount: viewCountByPost.get(p.id) ?? 0,
  }));
}
