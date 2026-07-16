"use client";

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

type Stage = {
  step: number;
  titleKey: string;
  blurbKey: string;
};

const STAGES: Stage[] = [
  { step: 1, titleKey: "start.s1.title", blurbKey: "start.s1.blurb" },
  { step: 2, titleKey: "start.s2.title", blurbKey: "start.s2.blurb" },
  { step: 3, titleKey: "start.s3.title", blurbKey: "start.s3.blurb" },
  { step: 4, titleKey: "start.s4.title", blurbKey: "start.s4.blurb" },
];

export default function StartHerePage() {
  const t = useT();
  return (
    <section className="bg-white" style={{ color: NAVY }}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <span
          className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold ring-1 ring-[#092A4D]/10"
          style={{ color: NAVY }}
        >
          {t("start.badge")}
        </span>

        <h1
          className="mt-8 max-w-4xl break-words text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: NAVY }}
        >
          {t("start.title")}
        </h1>

        <p
          className="mt-8 max-w-xl text-base leading-relaxed"
          style={{ color: `${NAVY}99` }}
        >
          {t("start.subtitle")}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage) => (
            <StageCard key={stage.step} stage={stage} />
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-[#f6f8fb] p-8 text-center sm:p-10">
          <h2 className="text-lg font-bold" style={{ color: NAVY }}>
            {t("startHere.cta.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
            {t("startHere.cta.subtitle")}
          </p>
          <Link
            href="/start"
            className="mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {t("startHere.cta.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function StageCard({ stage }: { stage: Stage }) {
  const t = useT();
  return (
    <div className="flex min-h-[230px] flex-col rounded-2xl bg-[#f6f8fb] px-6 py-6 ring-1 ring-[#092A4D]/5">
      <span
        className="inline-flex size-9 items-center justify-center rounded-full text-sm font-bold"
        style={{ backgroundColor: `${ORANGE}26`, color: ORANGE }}
      >
        {stage.step}
      </span>

      <h3
        className="mt-12 text-lg font-bold leading-snug"
        style={{ color: NAVY }}
      >
        {t(stage.titleKey)}
      </h3>

      <p
        className="mt-3 text-sm leading-relaxed"
        style={{ color: `${NAVY}99` }}
      >
        {t(stage.blurbKey)}
      </p>
    </div>
  );
}
