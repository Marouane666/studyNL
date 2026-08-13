import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Server-side writes to a profile's Hub Plus membership. Kept in one place so
// the admin control panel and the checkout flow can't drift into writing the
// plan columns differently.

/**
 * Starts (or extends) a premium membership.
 *
 * @param expiresAt ISO timestamp the membership lapses at, or null for an
 *   open-ended grant with no end date.
 */
export async function grantPremium(userId: string, expiresAt: string | null = null) {
  return supabaseAdmin
    .from("profiles")
    .update({
      plan: "premium",
      plan_started_at: new Date().toISOString(),
      plan_expires_at: expiresAt,
    })
    .eq("id", userId);
}

/** Drops the account back to free access immediately. */
export async function revokePremium(userId: string) {
  return supabaseAdmin
    .from("profiles")
    .update({ plan: "free", plan_expires_at: null })
    .eq("id", userId);
}
