"use client";

// Asks for analytics-cookie consent. Shown only when at least one tool is
// configured in lib/siteConfig.ts and the visitor hasn't chosen yet, or when
// they reopen it from the footer to change their mind.
//
// "Decline" is as prominent as "Accept" on purpose: Dutch and EU regulators
// treat a banner that nudges towards yes as not collecting valid consent.

import Link from "next/link";
import { useEffect, useState } from "react";
import { hasAnalytics } from "@/lib/siteConfig";
import { useT } from "../i18n/I18nProvider";
import { onConsentSettingsOpen, setConsent, useConsent } from "./consent";

const NAVY = "#092A4D";

export function CookieBanner() {
  const t = useT();
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => onConsentSettingsOpen(() => setReopened(true)), []);

  if (!hasAnalytics() || consent === undefined) return null;
  if (consent !== null && !reopened) return null;

  function choose(value: "granted" | "denied") {
    setReopened(false);
    setConsent(value);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("cookies.title")}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-[#092A4D]/10 bg-white p-5 shadow-[0_18px_50px_rgba(6,27,51,0.18)] sm:bottom-5 sm:p-6"
    >
      <p className="text-sm font-bold" style={{ color: NAVY }}>
        {t("cookies.title")}
      </p>
      <p className="mt-1.5 text-xs leading-relaxed" style={{ color: `${NAVY}A6` }}>
        {t("cookies.body")}{" "}
        <Link href="/legal#privacy" className="font-semibold underline">
          {t("cookies.privacy")}
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-full border border-[#092A4D]/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[#092A4D]/5"
          style={{ color: NAVY }}
        >
          {t("cookies.decline")}
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: NAVY }}
        >
          {t("cookies.accept")}
        </button>
      </div>
    </div>
  );
}
