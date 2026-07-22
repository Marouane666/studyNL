import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SECRET_KEY. Set them in .env.local (server-only, no NEXT_PUBLIC_ prefix).",
  );
}

// Service-role client, bypasses RLS. Import only from app/api/**/route.ts.
// Never import this from a "use client" file or expose it to the browser.
//
// IMPORTANT: never call auth.signInWithPassword() or auth.refreshSession() on
// this instance. Even with persistSession:false, supabase-js keeps an
// in-memory "current session" on whichever client establishes one, and every
// .from()/.storage()/.rpc() call on THAT SAME client instance afterwards uses
// that session's access token instead of the secret key (this is how the
// library is designed to work for a normal browser client, where it's
// desirable). Since this is a shared singleton, one user logging in would
// silently flip every other concurrent request's privilege level too. Use
// createEphemeralAuthClient() for any call that establishes a session.
export const supabaseAdmin = createClient(url, secretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * A fresh, one-time-use client for auth operations that establish a session
 * (signInWithPassword, refreshSession), never reused, so its session state
 * dies with it instead of silently hijacking supabaseAdmin's identity.
 */
export function createEphemeralAuthClient() {
  return createClient(url!, secretKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
