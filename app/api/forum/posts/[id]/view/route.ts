import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth/session";

// Only counts views from logged-in members (deduped per post/user pair), 
// anonymous view tracking was left out of this first version.
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ viewCount: null });

  const { id: postId } = await params;

  const { error: upsertError } = await supabaseAdmin
    .from("forum_post_views")
    .upsert(
      { post_id: postId, user_id: user.id },
      { onConflict: "post_id,user_id", ignoreDuplicates: true },
    );

  if (upsertError) return Response.json({ viewCount: null });

  // Plain select (not a HEAD count request): postgrest-js has a known quirk where a
  // HEAD count request against an unreachable/misconfigured table silently reports
  // count: null with no error, instead of surfacing the failure, see PostgrestBuilder's
  // "workaround for supabase/postgrest-js#295". A normal select's body is always parsed,
  // so real errors don't get swallowed.
  const { data: views, error: countError } = await supabaseAdmin
    .from("forum_post_views")
    .select("user_id")
    .eq("post_id", postId);

  if (countError) return Response.json({ viewCount: null });

  return Response.json({ viewCount: views?.length ?? 0 });
}
