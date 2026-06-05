"use client";

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";

const NAVY = "#03294f";
const ORANGE = "#fd7933";

type Step = {
  number: string;
  titleKey: string;
  blurbKey: string;
};

const STEPS: Step[] = [
  { number: "1", titleKey: "moveplan.s1.title", blurbKey: "moveplan.s1.blurb" },
  { number: "2", titleKey: "moveplan.s2.title", blurbKey: "moveplan.s2.blurb" },
  { number: "3", titleKey: "moveplan.s3.title", blurbKey: "moveplan.s3.blurb" },
  { number: "4", titleKey: "moveplan.s4.title", blurbKey: "moveplan.s4.blurb" },
];

export function MovePlan() {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div
            className="rounded-[2.5rem] px-4 py-8 sm:px-5 sm:py-10"
            style={{
              background:
                "linear-gradient(135deg, #fde0d0 0%, #f5e6f0 50%, #d8e0f5 100%)",
            }}
          >
            <div className="flex h-full flex-col rounded-[2rem] bg-white p-8 sm:p-10">
              <div className="flex items-start justify-between">
                <span
                  className="inline-flex size-12 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: NAVY }}
                >
                  <ArrowUpRightIcon />
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-semibold ring-1 ring-[#03294f]/10"
                    style={{ color: NAVY }}
                  >
                    {t("moveplan.tag1")}
                  </span>
                  <span
                    className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-semibold ring-1 ring-[#03294f]/10"
                    style={{ color: NAVY }}
                  >
                    2025
                  </span>
                </div>
              </div>

              <h3
                className="mt-16 break-words text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-tight"
                style={{ color: NAVY }}
              >
                {t("moveplan.title")}
              </h3>

              <p
                className="mt-5 max-w-sm text-sm leading-relaxed"
                style={{ color: `${NAVY}80` }}
              >
                {t("moveplan.subtitle")}
              </p>

              <Link
                href="/plan"
                className="mt-8 inline-flex w-fit items-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: NAVY }}
              >
                {t("moveplan.cta")}
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <span
              className="inline-flex w-fit items-center rounded-full bg-white px-4 py-1.5 text-xs font-medium ring-1 ring-[#03294f]/10"
              style={{ color: NAVY }}
            >
              {t("moveplan.badge")}
            </span>

            <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
              <h2
                className="break-words text-[clamp(1.5rem,3.2vw,2.25rem)] font-extrabold leading-[1.1] tracking-tight"
                style={{ color: NAVY }}
              >
                {t("moveplan.heading")}
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: `${NAVY}80` }}
              >
                {t("moveplan.heading_blurb")}
              </p>
            </div>

            <ol className="mt-6 flex flex-col gap-3">
              {STEPS.map((s) => (
                <StepRow key={s.number} step={s} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepRow({ step }: { step: Step }) {
  const t = useT();
  return (
    <li className="group flex items-center gap-5 rounded-2xl border border-[#03294f]/10 bg-white px-5 py-4 transition-colors duration-200 hover:border-[#fd7933]/30 hover:bg-[#fff4ec]">
      <span
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: ORANGE }}
      >
        {step.number}
      </span>
      <div className="min-w-0 flex-1 grid gap-1 sm:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] sm:items-center sm:gap-6">
        <h3
          className="text-sm font-bold sm:text-base"
          style={{ color: NAVY }}
        >
          {t(step.titleKey)}
        </h3>
        <p
          className="text-xs leading-relaxed sm:text-sm"
          style={{ color: `${NAVY}80` }}
        >
          {t(step.blurbKey)}
        </p>
      </div>
      <span
        className="shrink-0 text-[#03294f]/40 transition-colors duration-200 group-hover:text-[#fd7933]"
      >
        <ArrowRightIcon />
      </span>
    </li>
  );
}

function Svg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

function ArrowRightIcon() {
  return (
    <Svg width={18} height={18}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </Svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <Svg width={20} height={20}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Svg>
  );
}
