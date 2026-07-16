"use client";

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";
import { CITIES, City } from "./cities";

const BG = "#EAF6FF";
const TEXT = "#092A4D";
const ORANGE = "#fd7933";

export default function CitiesPage() {
  const t = useT();

  return (
    <section style={{ backgroundColor: BG, color: TEXT }}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <span
          className="inline-flex w-fit items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold"
          style={{ color: TEXT }}
        >
          {t("cities.badge")}
        </span>

        <h1
          className="mt-8 max-w-3xl break-words text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: TEXT }}
        >
          {t("cities.title")}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: `${TEXT}B3` }}>
          {t("cities.subtitle")}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CITIES.map((city) => (
            <CityCard key={city.slug} city={city} />
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-white p-8 text-center shadow-[0_1px_2px_rgba(9,42,77,0.04)] sm:p-10">
          <h2 className="text-xl font-bold" style={{ color: TEXT }}>
            {t("cities.cta.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed" style={{ color: `${TEXT}99` }}>
            {t("cities.cta.subtitle")}
          </p>
          <Link
            href="/start"
            className="mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {t("cities.cta.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function CityCard({ city }: { city: City }) {
  const t = useT();
  return (
    <Link
      href={`/cities/${city.slug}`}
      className="group flex min-h-[220px] flex-col rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)] transition-shadow duration-200 hover:shadow-[0_10px_28px_rgba(9,42,77,0.12)]"
    >
      <span
        className="inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ring-[#092A4D]/10"
        style={{ color: TEXT }}
      >
        {city.province}
      </span>
      <h3 className="mt-4 text-xl font-bold leading-snug" style={{ color: TEXT }}>
        {city.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: `${TEXT}99` }}>
        {t(city.positioningKey)}
      </p>
      <span
        className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-bold"
        style={{ color: ORANGE }}
      >
        {t("cities.viewProfile")}
        <ArrowRightIcon />
      </span>
    </Link>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}
