"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { useT } from "../../i18n/I18nProvider";
import { getGuide, GUIDES } from "../guides";

const BG = "#EAF6FF";
const NAVY = "#092A4D";
const ORANGE = "#fd7933";

export default function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const t = useT();

  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <section style={{ backgroundColor: BG, color: NAVY }}>
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#092A4D]/60 transition-colors hover:text-[#092A4D]"
        >
          <BackIcon />
          {t("guide.back")}
        </Link>

        <span
          className="mt-8 inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold ring-1 ring-[#092A4D]/10"
          style={{ color: NAVY }}
        >
          {t(guide.catKey)}
        </span>

        <h1
          className="mt-5 break-words text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: NAVY }}
        >
          {t(guide.titleKey)}
        </h1>

        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: `${NAVY}B3` }}
        >
          {t(guide.blurbKey)}
        </p>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-[0_2px_10px_rgba(9,42,77,0.05)] sm:p-8">
          <p className="text-base leading-relaxed" style={{ color: `${NAVY}CC` }}>
            {t("guide.note")}
          </p>
          <Link
            href="/start"
            className="mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
            style={{ backgroundColor: ORANGE }}
          >
            {t("guide.cta")}
          </Link>
        </div>

        <h2 className="mt-14 text-xl font-bold" style={{ color: NAVY }}>
          {t("guide.related")}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {related.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group flex min-h-[150px] flex-col rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)] transition-shadow duration-200 hover:shadow-[0_10px_28px_rgba(9,42,77,0.12)]"
            >
              <span
                className="inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ring-[#092A4D]/10"
                style={{ color: NAVY }}
              >
                {t(g.catKey)}
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug" style={{ color: NAVY }}>
                {t(g.titleKey)}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BackIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
