"use client";

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";

const BG = "#EAF6FF";
const NAVY = "#092A4D";
const ORANGE = "#fd7933";

export default function ForumPage() {
  const t = useT();
  return (
    <section style={{ backgroundColor: BG, color: NAVY }}>
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <span
          className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold ring-1 ring-[#092A4D]/10"
          style={{ color: NAVY }}
        >
          {t("forum.badge")}
        </span>

        <h1
          className="mx-auto mt-8 max-w-3xl break-words text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: NAVY }}
        >
          {t("forum.title")}
        </h1>

        <p
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed"
          style={{ color: `${NAVY}99` }}
        >
          {t("forum.subtitle")}
        </p>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-8 shadow-[0_2px_10px_rgba(9,42,77,0.05)]">
          <p className="text-base leading-relaxed" style={{ color: `${NAVY}CC` }}>
            {t("forum.note")}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/guides"
              className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
              style={{ backgroundColor: ORANGE }}
            >
              {t("forum.cta")}
            </Link>
            <Link
              href="/help-centre"
              className="inline-flex items-center rounded-full bg-[#eaf2fa] px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#dce8f5]"
              style={{ color: NAVY }}
            >
              {t("nav.helpCentre")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
