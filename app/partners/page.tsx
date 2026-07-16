"use client";

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";
import { PARTNERS } from "../../lib/partners";

const BG = "#EAF6FF";
const NAVY = "#092A4D";
const ORANGE = "#fd7933";

export default function PartnersPage() {
  const t = useT();

  return (
    <section style={{ backgroundColor: BG, color: NAVY }}>
      <div className="mx-auto max-w-4xl px-6 py-10">
        <span
          className="inline-flex w-fit items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold"
          style={{ color: NAVY }}
        >
          {t("partnersPage.badge")}
        </span>

        <h1
          className="mt-8 max-w-2xl break-words text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: NAVY }}
        >
          {t("partnersPage.title")}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: `${NAVY}B3` }}>
          {t("partnersPage.subtitle")}
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PARTNERS.map((partner) => (
            <li
              key={partner.slug}
              className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.logoSrc}
                    alt=""
                    className="h-6 w-auto max-w-22.5 object-contain"
                  />
                  <h3 className="text-base font-bold" style={{ color: NAVY }}>
                    {partner.name}
                  </h3>
                </div>
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ring-[#092A4D]/10"
                  style={{ color: `${NAVY}99` }}
                >
                  {t(partner.categoryKey)}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
                {t(partner.descriptionKey)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border-l-4 bg-white p-6 shadow-[0_2px_10px_rgba(9,42,77,0.05)] sm:p-7" style={{ borderColor: ORANGE }}>
          <h2 className="text-lg font-bold" style={{ color: NAVY }}>
            {t("partnersPage.disclosure.title")}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: `${NAVY}CC` }}>
            {t("partnersPage.disclosure.body")}
          </p>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-8 text-center shadow-[0_1px_2px_rgba(9,42,77,0.04)] sm:p-10">
          <h2 className="text-xl font-bold" style={{ color: NAVY }}>
            {t("partnersPage.cta.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
            {t("partnersPage.cta.subtitle")}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {t("partnersPage.cta.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
