"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { useT } from "../../i18n/I18nProvider";
import { getCity, CITIES } from "../cities";

const BG = "#EAF6FF";
const NAVY = "#092A4D";
const ORANGE = "#fd7933";

const PRESSURE_KEYS: Record<string, string> = {
  "very-high": "cities.pressure.veryHigh",
  high: "cities.pressure.high",
  moderate: "cities.pressure.moderate",
};

export default function CityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const t = useT();

  const city = getCity(slug);
  if (!city) notFound();

  const related = CITIES.filter((c) => c.slug !== city.slug).slice(0, 3);

  return (
    <section style={{ backgroundColor: BG, color: NAVY }}>
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/cities"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#092A4D]/60 transition-colors hover:text-[#092A4D]"
        >
          <BackIcon />
          {t("cities.back")}
        </Link>

        <span
          className="mt-8 inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold ring-1 ring-[#092A4D]/10"
          style={{ color: NAVY }}
        >
          {city.province}
        </span>

        <h1
          className="mt-5 break-words text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: NAVY }}
        >
          {city.name}
        </h1>

        <p className="mt-4 max-w-2xl text-lg font-semibold leading-relaxed" style={{ color: `${NAVY}B3` }}>
          {t(city.positioningKey)}
        </p>

        <p className="mt-4 max-w-2xl text-base leading-relaxed" style={{ color: `${NAVY}CC` }}>
          {t(city.summaryKey)}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FactCard label={t("cities.fact.scale")} value={t(city.scaleLabelKey)} />
          <FactCard
            label={t("cities.fact.housing")}
            value={t(PRESSURE_KEYS[city.housingPressure])}
          />
          <FactCard label={t("cities.fact.province")} value={city.province} />
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold" style={{ color: NAVY }}>
            {t("cities.bestFor.heading")}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {city.bestForKeys.map((key) => (
              <li
                key={key}
                className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold ring-1 ring-[#092A4D]/10"
                style={{ color: NAVY }}
              >
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold" style={{ color: NAVY }}>
            {t("cities.institutions.heading")}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
            {t("cities.institutions.note")}
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {city.institutions.map((name) => (
              <li
                key={name}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold shadow-[0_1px_2px_rgba(9,42,77,0.04)]"
                style={{ color: NAVY }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)] sm:p-7">
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: `${NAVY}80` }}>
            {t("cities.official.heading")}
          </p>
          <a
            href={city.officialLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
            style={{ color: NAVY }}
          >
            {city.officialLink.label}
            <ExternalIcon />
          </a>
          <span className="ml-1.5 text-xs" style={{ color: `${NAVY}80` }}>
            · {city.officialLink.org}
          </span>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-6 text-center shadow-[0_2px_10px_rgba(9,42,77,0.05)] sm:p-8">
          <h2 className="text-lg font-bold" style={{ color: NAVY }}>
            {t("cities.detailCta.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
            {t("cities.detailCta.subtitle")}
          </p>
          <Link
            href="/start"
            className="mt-5 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {t("cities.detailCta.button")}
          </Link>
        </div>

        <h2 className="mt-14 text-xl font-bold" style={{ color: NAVY }}>
          {t("cities.related")}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {related.map((c) => (
            <Link
              key={c.slug}
              href={`/cities/${c.slug}`}
              className="group flex min-h-[130px] flex-col rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)] transition-shadow duration-200 hover:shadow-[0_10px_28px_rgba(9,42,77,0.12)]"
            >
              <span
                className="inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ring-[#092A4D]/10"
                style={{ color: NAVY }}
              >
                {c.province}
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug" style={{ color: NAVY }}>
                {c.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_1px_2px_rgba(9,42,77,0.04)]">
      <p className="text-xs font-bold uppercase tracking-wide" style={{ color: `${NAVY}80` }}>
        {label}
      </p>
      <p className="mt-1 text-base font-bold" style={{ color: NAVY }}>
        {value}
      </p>
    </div>
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
