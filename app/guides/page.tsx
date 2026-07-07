"use client";

import Link from "next/link";
import { useState } from "react";
import { useT } from "../i18n/I18nProvider";
import { GUIDES, Guide } from "./guides";

const BG = "#EAF6FF";
const TEXT = "#092A4D";

const TAB_KEYS = [
  "guides.tab1",
  "guides.tab2",
  "guides.tab3",
  "guides.tab4",
  "guides.tab5",
  "guides.tab6",
] as const;

export default function GuidesPage() {
  const t = useT();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const visibleGuides = activeTab
    ? GUIDES.filter((g) => g.tabKey === activeTab)
    : GUIDES;

  return (
    <section style={{ backgroundColor: BG, color: TEXT }}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-2">
          <span
            className="inline-flex w-fit items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold"
            style={{ color: TEXT }}
          >
            {t("guides.badge1")}
          </span>
          <span
            className="inline-flex w-fit items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold"
            style={{ color: TEXT }}
          >
            {t("guides.badge2")}
          </span>
        </div>

        <h1
          className="mt-8 max-w-3xl break-words text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: TEXT }}
        >
          {t("guides.title")}
        </h1>

        <p
          className="mt-6 max-w-xl text-base leading-relaxed"
          style={{ color: `${TEXT}B3` }}
        >
          {t("guides.subtitle")}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          {TAB_KEYS.map((tabKey) => {
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                type="button"
                onClick={() => setActiveTab(isActive ? null : tabKey)}
                className="text-sm font-bold transition-opacity"
                style={{
                  color: TEXT,
                  opacity: isActive || activeTab === null ? 1 : 0.45,
                }}
              >
                {t(tabKey)}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GuideCard({ guide }: { guide: Guide }) {
  const t = useT();
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex min-h-[180px] flex-col rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)] transition-shadow duration-200 hover:shadow-[0_10px_28px_rgba(9,42,77,0.12)]"
    >
      <span
        className="inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ring-[#092A4D]/10"
        style={{ color: TEXT }}
      >
        {t(guide.catKey)}
      </span>

      <h3
        className="mt-5 text-lg font-bold leading-snug"
        style={{ color: TEXT }}
      >
        {t(guide.titleKey)}
      </h3>

      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: `${TEXT}99` }}
      >
        {t(guide.blurbKey)}
      </p>
    </Link>
  );
}
