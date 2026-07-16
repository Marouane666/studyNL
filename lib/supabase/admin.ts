import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SECRET_KEY. Set them in .env.local (server-only, no NEXT_PUBLIC_ prefix).",
  );
}

// Service-role client — bypasses RLS. Import only from app/api/**/route.ts.
// Never import this from a "use client" file or expose it to the browser.
export const supabaseAdmin = createClient(url, secretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
