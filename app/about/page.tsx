"use client";

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

type Value = {
  catKey: string;
  titleKey: string;
  blurbKey: string;
};

const VALUES: Value[] = [
  { catKey: "about.v1.cat", titleKey: "about.v1.title", blurbKey: "about.v1.blurb" },
  { catKey: "about.v2.cat", titleKey: "about.v2.title", blurbKey: "about.v2.blurb" },
  { catKey: "about.v3.cat", titleKey: "about.v3.title", blurbKey: "about.v3.blurb" },
];

export default function AboutPage() {
  const t = useT();
  return (
    <section className="bg-white" style={{ color: NAVY }}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <span
          className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold ring-1 ring-[#092A4D]/10"
          style={{ color: NAVY }}
        >
          {t("about.badge")}
        </span>

        <h1
          className="mt-8 max-w-4xl break-words text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: NAVY }}
        >
          {t("about.title")}
        </h1>

        <p
          className="mt-8 max-w-xl text-base leading-relaxed"
          style={{ color: `${NAVY}99` }}
        >
          {t("about.subtitle")}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <ValueCard key={v.catKey} value={v} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/guides"
            className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {t("about.cta.guides")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-[#f6f8fb] px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#eef1f6]"
            style={{ color: NAVY }}
          >
            {t("about.cta.contact")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function ValueCard({ value }: { value: Value }) {
  const t = useT();
  return (
    <div className="flex min-h-[220px] flex-col rounded-2xl bg-white px-7 py-7 ring-1 ring-[#092A4D]/10">
      <span
        className="inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold ring-1 ring-[#092A4D]/10"
        style={{ color: NAVY }}
      >
        {t(value.catKey)}
      </span>

      <h3
        className="mt-7 text-lg font-bold leading-snug"
        style={{ color: NAVY }}
      >
        {t(value.titleKey)}
      </h3>

      <p
        className="mt-3 text-sm leading-relaxed"
        style={{ color: `${NAVY}99` }}
      >
        {t(value.blurbKey)}
      </p>
    </div>
  );
}
