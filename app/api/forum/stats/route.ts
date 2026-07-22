import { supabaseAdmin } from "@/lib/supabase/admin";
import { jsonError } from "@/lib/http";

export async function GET() {
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  // Plain selects (not head:true count requests): postgrest-js has a known quirk where a
  // HEAD count request against an unreachable/misconfigured table silently reports
  // count: null with no error, instead of surfacing the failure, see PostgrestBuilder's
  // "workaround for supabase/postgrest-js#295". A normal select's body is always parsed,
  // so real errors don't get swallowed as if the table were just empty.
  const [totalMembers, newMembers, newPosts] = await Promise.all([
    supabaseAdmin.from("profiles").select("id"),
    supabaseAdmin.from("profiles").select("id").gte("created_at", since),
    supabaseAdmin.from("forum_posts").select("id").gte("created_at", since),
  ]);

  if (totalMembers.error || newMembers.error || newPosts.error) {
    return jsonError("Couldn't load stats.", 500);
  }

  return Response.json({
    totalMembers: totalMembers.data?.length ?? 0,
    newMembers30d: newMembers.data?.length ?? 0,
    newPosts30d: newPosts.data?.length ?? 0,
  });
}
