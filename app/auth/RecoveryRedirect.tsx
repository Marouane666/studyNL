"use client";

// Sends a password-reset link that landed on the wrong page to /reset-password.
//
// Supabase only honours the redirectTo we ask for (see
// app/api/auth/forgot-password) when that URL is in the project's allowed
// Redirect URLs. When it isn't, it quietly falls back to the Site URL, usually
// the home page, with the recovery token in the fragment, and the member lands
// somewhere that ignores it. This catches that on any page and forwards the
// fragment unchanged.

import { useEffect } from "react";

export function RecoveryRedirect() {
  useEffect(() => {
    const { hash, pathname } = window.location;
    if (pathname === "/reset-password") return;
    const params = new URLSearchParams(hash.slice(1));
    // Covers a valid link (type=recovery) and an expired one (error_code), so
    // both reach the page that explains what to do.
    const isRecovery = params.get("type") === "recovery" || params.get("error_code") === "otp_expired";
    if (isRecovery) window.location.replace(`/reset-password${hash}`);
  }, []);

  return null;
}
