import "server-only";
import { cookies } from "next/headers";
import { supabaseAdmin, createEphemeralAuthClient } from "@/lib/supabase/admin";
import { type Role, isAdminRole, isModeratorRole } from "@/lib/roles";

export type { Role };

const ACCESS_COOKIE = "sb_at";
const REFRESH_COOKIE = "sb_rt";
const REFRESH_MAX_AGE = 60 * 60 * 24 * 60; // 60 days — outer ceiling; Supabase still validates the token itself.

const cookieDefaults = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

type SessionTokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export async function setSessionCookies(tokens: SessionTokens) {
  const store = await cookies();
  store.set(ACCESS_COOKIE, tokens.access_token, {
    ...cookieDefaults,
    maxAge: tokens.expires_in,
  });
  store.set(REFRESH_COOKIE, tokens.refresh_token, {
    ...cookieDefaults,
    maxAge: REFRESH_MAX_AGE,
  });
}

export async function clearSessionCookies() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

/**
 * Returns a valid access token for revoking the session on logout, refreshing
 * first if the short-lived access-token cookie already expired but the
 * refresh token hasn't — otherwise logout would silently skip revocation.
 */
export async function getAccessTokenForSignOut(): Promise<string | undefined> {
  const store = await cookies();
  const accessToken = store.get(ACCESS_COOKIE)?.value;
  if (accessToken) return accessToken;

  const refreshToken = store.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) return undefined;

  const { data, error } = await createEphemeralAuthClient().auth.refreshSession({
    refresh_token: refreshToken,
  });
  return error || !data.session ? undefined : data.session.access_token;
}

export type CurrentUser = {
  id: string;
  email: string;
  displayName: string;
  role: Role;
};

export function isModerator(user: CurrentUser | null): boolean {
  return isModeratorRole(user?.role);
}

export function isAdmin(user: CurrentUser | null): boolean {
  return isAdminRole(user?.role);
}

async function loadUser(accessToken: string): Promise<CurrentUser | null> {
  const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !data.user) return null;

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("display_name, role, status")
    .eq("id", data.user.id)
    .maybeSingle();

  // Suspended accounts are treated as logged out everywhere — this is the
  // single enforcement point, so no individual route needs its own check.
  if (profile?.status === "suspended") return null;

  return {
    id: data.user.id,
    email: data.user.email ?? "",
    displayName: profile?.display_name || data.user.email || "Member",
    role: (profile?.role as Role) ?? "member",
  };
}

/** Reads the session cookies, transparently refreshing an expired access token. */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const store = await cookies();
  const accessToken = store.get(ACCESS_COOKIE)?.value;
  const refreshToken = store.get(REFRESH_COOKIE)?.value;

  if (accessToken) {
    const user = await loadUser(accessToken);
    if (user) return user;
  }

  if (!refreshToken) return null;

  const { data, error } = await createEphemeralAuthClient().auth.refreshSession({
    refresh_token: refreshToken,
  });
  if (error || !data.session) {
    // Don't clear cookies here: refresh tokens rotate on use, so a concurrent
    // request racing on the same stale token can fail here right after another
    // request's refresh already succeeded and set fresh cookies — clearing
    // them now would log the user out of a session that just renewed.
    // Cookies naturally expire (REFRESH_MAX_AGE) if the session really is dead.
    return null;
  }

  await setSessionCookies(data.session);
  return loadUser(data.session.access_token);
}
