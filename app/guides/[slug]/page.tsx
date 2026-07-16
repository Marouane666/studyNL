"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { useT } from "../../i18n/I18nProvider";
import { getGuide, GUIDES } from "../guides";
import type { GuideSection, GuideSource } from "../guides";

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

        <div
          className="mt-8 rounded-2xl border-l-4 bg-white p-6 shadow-[0_2px_10px_rgba(9,42,77,0.05)] sm:p-7"
          style={{ borderColor: ORANGE }}
        >
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: ORANGE }}>
            {t("guide.answer.label")}
          </p>
          <p className="mt-2 text-base leading-relaxed" style={{ color: NAVY }}>
            {t(guide.answerKey)}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-10">
          {guide.sections.map((sec) => (
            <GuideSectionBlock key={sec.headingKey} section={sec} />
          ))}
        </div>

        {guide.sources.length > 0 && (
          <div className="mt-10 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)] sm:p-7">
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: `${NAVY}80` }}>
              {t("guide.sources.label")}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {guide.sources.map((source) => (
                <SourceLink key={source.href} source={source} />
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 rounded-2xl bg-white p-6 shadow-[0_2px_10px_rgba(9,42,77,0.05)] sm:p-8">
          <Link
            href="/start"
            className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
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

function GuideSectionBlock({ section }: { section: GuideSection }) {
  const t = useT();
  return (
    <div>
      <h2 className="text-xl font-bold" style={{ color: NAVY }}>
        {t(section.headingKey)}
      </h2>
      {section.bodyKey && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed" style={{ color: `${NAVY}CC` }}>
          {t(section.bodyKey)}
        </p>
      )}
      {section.bulletKeys && section.bulletKeys.length > 0 && (
        <ul className="mt-3 flex max-w-2xl flex-col gap-2.5">
          {section.bulletKeys.map((key) => (
            <li key={key} className="flex items-start gap-2.5 text-base leading-relaxed" style={{ color: `${NAVY}CC` }}>
              <span
                className="mt-2.5 size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: ORANGE }}
                aria-hidden="true"
              />
              {t(key)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SourceLink({ source }: { source: GuideSource }) {
  return (
    <li>
      <a
        href={source.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
        style={{ color: NAVY }}
      >
        {source.label}
        <ExternalIcon />
      </a>
      <span className="ml-1.5 text-xs" style={{ color: `${NAVY}80` }}>
        · {source.org}
      </span>
    </li>
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

function ExternalIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
