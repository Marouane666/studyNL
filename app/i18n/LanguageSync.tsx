"use client";

// Keeps the language picker and the member's account in step.
//
// Lives as its own component, rendered inside AuthProvider, because
// I18nProvider wraps AuthProvider in app/layout.tsx and so can't read the
// session itself. Renders nothing.
//
// When the two disagree, the choice made on this device wins: someone who just
// picked a language means it, and having the server overwrite that a moment
// later is the more annoying failure. The account only supplies the language
// when this browser has no stored choice at all — a fresh device, which is the
// case the account copy exists for.

import { useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { LANG_STORAGE_KEY, useI18n } from "./I18nProvider";

export function LanguageSync() {
  const { user } = useAuth();
  const { lang, setLang } = useI18n();
  const accountLang = user?.language;

  // Fresh device: adopt whatever the account remembers.
  useEffect(() => {
    if (!accountLang) return;
    if (window.localStorage.getItem(LANG_STORAGE_KEY)) return;
    setLang(accountLang);
  }, [accountLang, setLang]);

  // Otherwise push this device's choice up, so the next device — and any email
  // the server sends — uses it.
  useEffect(() => {
    if (!user || !accountLang || accountLang === lang) return;

    // Fire and forget: a failed save just means the account keeps the older
    // language, which is not worth interrupting anyone over.
    fetch("/api/auth/language", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: lang }),
    }).catch(() => {});
  }, [user, accountLang, lang]);

  return null;
}
