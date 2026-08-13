// Pure membership (Hub Plus) logic, safe to import from both server (route
// handlers, lib/auth/session.ts) and client ("use client" components) code,
// no server-only imports here — same contract as lib/roles.ts.
//
// A membership is deliberately independent of the forum `role`: role says what
// a user may moderate, plan says whether they've paid for Hub Plus.

export type Plan = "free" | "premium";

export const PLANS: Plan[] = ["free", "premium"];

export type Membership = {
  plan: Plan;
  /** ISO timestamp, or null for an open-ended grant with no end date. */
  planExpiresAt: string | null;
};

export function isPlan(value: unknown): value is Plan {
  return typeof value === "string" && (PLANS as string[]).includes(value);
}

/**
 * The single access check for every Hub Plus benefit. A membership only counts
 * while it hasn't lapsed, so an expired subscription degrades to free access
 * without anything having to run a nightly job over the profiles table.
 */
export function isPremium(membership: Membership | null | undefined): boolean {
  if (membership?.plan !== "premium") return false;
  if (!membership.planExpiresAt) return true;

  const expires = Date.parse(membership.planExpiresAt);
  // An unparseable date shouldn't silently hand out access.
  return Number.isFinite(expires) && expires > Date.now();
}

/** True for a premium membership whose end date has already passed. */
export function isLapsed(membership: Membership | null | undefined): boolean {
  return membership?.plan === "premium" && !isPremium(membership);
}
