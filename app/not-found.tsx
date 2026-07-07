"use client";

import Link from "next/link";
import { useT } from "./i18n/I18nProvider";

const BG = "#EAF6FF";
const NAVY = "#092A4D";
const ORANGE = "#fd7933";

export default function NotFound() {
  const t = useT();
  return (
    <section style={{ backgroundColor: BG, color: NAVY }}>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
        <span
          className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-extrabold tracking-[0.2em] ring-1 ring-[#092A4D]/10"
          style={{ color: ORANGE }}
        >
          {t("notfound.badge")}
        </span>

        <h1
          className="mt-8 break-words text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: NAVY }}
        >
          {t("notfound.title")}
        </h1>

        <p
          className="mt-6 max-w-lg text-base leading-relaxed"
          style={{ color: `${NAVY}99` }}
        >
          {t("notfound.subtitle")}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
            style={{ backgroundColor: ORANGE }}
          >
            {t("notfound.home")}
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold ring-1 ring-[#092A4D]/10 transition-colors hover:bg-[#f5f7fa]"
            style={{ color: NAVY }}
          >
            {t("notfound.guides")}
          </Link>
        </div>
      </div>
    </section>
  );
}
