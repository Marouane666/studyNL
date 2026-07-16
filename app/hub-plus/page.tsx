"use client";

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

type Feature = {
  titleKey: string;
  blurbKey: string;
};

const FEATURES: Feature[] = [
  { titleKey: "hubplus.f1.title", blurbKey: "hubplus.f1.blurb" },
  { titleKey: "hubplus.f2.title", blurbKey: "hubplus.f2.blurb" },
  { titleKey: "hubplus.f3.title", blurbKey: "hubplus.f3.blurb" },
];

export default function HubPlusPage() {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <span
          className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold ring-1 ring-[#092A4D]/10"
          style={{ color: NAVY }}
        >
          {t("hubplus.badge")}
        </span>

        <div
          className="mt-8 rounded-3xl px-10 py-10 sm:px-16 sm:py-12"
          style={{ backgroundColor: NAVY }}
        >
          <h1 className="max-w-3xl break-words text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-white">
            {t("hubplus.title")}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">
            {t("hubplus.subtitle")}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <FeatureCard key={f.titleKey} feature={f} />
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-[#f6f8fb] p-8 text-center sm:p-10">
          <h2 className="text-xl font-bold" style={{ color: NAVY }}>
            {t("hubplus.cta.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
            {t("hubplus.cta.subtitle")}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {t("hubplus.cta.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const t = useT();
  return (
    <div className="flex min-h-[130px] flex-col justify-start rounded-2xl bg-white px-6 py-6">
      <h3
        className="text-lg font-bold leading-snug"
        style={{ color: NAVY }}
      >
        {t(feature.titleKey)}
      </h3>
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: `${NAVY}99` }}
      >
        {t(feature.blurbKey)}
      </p>
    </div>
  );
}
