"use client";

// Dashboard overview. The shell (sidebar, topbar, membership gate) lives in
// layout.tsx; this is only the right-hand pane.

import Link from "next/link";
import { useAuth } from "../../auth/AuthProvider";
import { useT } from "../../i18n/I18nProvider";
import { GUIDES } from "../../guides/guides";
import { TASK_HREFS, taskTitleKey } from "../../start/tasks";
import { NAVY, NAVY_DEEP, ORANGE, Panel } from "./ui";
import { type PlanProgress, usePlanProgress } from "./usePlanProgress";

// Slugs, not indexes, so reordering the guide catalogue can't silently change
// what the library preview shows.
const PREVIEW_SLUGS = ["arrival-checklist", "cost-of-living", "accommodation"];

type Benefit = {
  titleKey: string;
  bodyKey: string;
  ctaKey: string;
  deliveryKey: string;
  href: string;
  icon: string;
};

const BENEFITS: Benefit[] = [
  {
    titleKey: "hubDash.benefit.guides.title",
    bodyKey: "hubDash.benefit.guides.body",
    ctaKey: "hubDash.benefit.guides.cta",
    deliveryKey: "hubDash.delivery.instant",
    href: "/hub-plus/dashboard/resources",
    icon: "▤",
  },
  {
    titleKey: "hubDash.benefit.qa.title",
    bodyKey: "hubDash.benefit.qa.body",
    ctaKey: "hubDash.benefit.qa.cta",
    deliveryKey: "hubDash.delivery.human",
    href: "/hub-plus/dashboard/support",
    icon: "?",
  },
  {
    titleKey: "hubDash.benefit.housing.title",
    bodyKey: "hubDash.benefit.housing.body",
    ctaKey: "hubDash.benefit.housing.cta",
    deliveryKey: "hubDash.delivery.partner",
    href: "/guides/accommodation",
    icon: "⌂",
  },
];

export default function DashboardOverviewPage() {
  const t = useT();
  const { user } = useAuth();
  const progress = usePlanProgress();
  const firstName = user?.displayName?.trim().split(/\s+/)[0] ?? "";

  return (
    <>
      <section
        className="overflow-hidden rounded-3xl px-7 py-9 text-white shadow-[0_18px_55px_rgba(6,27,51,0.13)] sm:px-10 sm:py-11"
        style={{
          background: `radial-gradient(circle at 88% 20%, rgba(157,230,223,.16), transparent 45%), linear-gradient(115deg, ${NAVY_DEEP} 30%, #0d3a68 100%)`,
        }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-[#9de6df]/25 bg-[#9de6df]/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#9de6df]">
          <span style={{ color: ORANGE }} aria-hidden="true">
            ✦
          </span>
          {t("hubDash.chip.member")}
        </span>

        <h1 className="mt-5 max-w-xl break-words text-[clamp(1.9rem,4vw,3.2rem)] font-extrabold leading-[1.02] tracking-tight">
          {t("hubDash.hero.title")} {firstName}.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70">
          {t("hubDash.hero.subtitle")}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/hub-plus/dashboard/plan"
            className="inline-flex min-h-11 items-center rounded-2xl px-5 text-xs font-extrabold text-white shadow-[0_10px_22px_rgba(255,113,55,0.25)] transition-opacity hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {t("hubDash.hero.ctaPlan")} →
          </Link>
          <Link
            href="/hub-plus"
            className="inline-flex min-h-11 items-center rounded-2xl border border-white/15 bg-white/10 px-5 text-xs font-extrabold text-white transition-colors hover:bg-white/20"
          >
            {t("hubDash.hero.ctaBenefits")}
          </Link>
        </div>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <ProgressCard progress={progress} />
        <NextStepCard progress={progress} />
      </div>

      <div className="mb-3.5 mt-7 flex flex-wrap items-end justify-between gap-3 px-0.5">
        <div>
          <h2 className="text-[17px] font-extrabold tracking-tight" style={{ color: NAVY }}>
            {t("hubDash.benefits.title")}
          </h2>
          <p className="mt-1 text-xs" style={{ color: `${NAVY}99` }}>
            {t("hubDash.benefits.subtitle")}
          </p>
        </div>
        <Link
          href="/hub-plus"
          className="text-[11px] font-extrabold hover:underline"
          style={{ color: ORANGE }}
        >
          {t("hubDash.benefits.viewAll")} →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {BENEFITS.map((b) => (
          <BenefitCard key={b.titleKey} benefit={b} />
        ))}
      </div>

      <p className="mt-3 text-xs leading-relaxed" style={{ color: `${NAVY}80` }}>
        {t("hubDash.benefits.note")}
      </p>

      <LibraryPreview />
    </>
  );
}

function ProgressCard({ progress }: { progress: PlanProgress | null }) {
  const t = useT();

  if (!progress) return <Panel className="min-h-[104px] p-6" />;

  if (!progress.stage) {
    return (
      <Panel className="flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="text-[17px] font-extrabold tracking-tight" style={{ color: NAVY }}>
            {t("hubDash.progress.title")}
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed" style={{ color: `${NAVY}99` }}>
            {t("hubDash.progress.empty")}
          </p>
        </div>
        <Link
          href="/start"
          className="inline-flex items-center rounded-full px-5 py-2.5 text-xs font-extrabold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: ORANGE }}
        >
          {t("hubDash.progress.build")}
        </Link>
      </Panel>
    );
  }

  const total = progress.tasks.length;
  const percent = total === 0 ? 0 : Math.round((progress.doneCount / total) * 100);

  return (
    <Panel className="grid items-center gap-4 p-6 sm:grid-cols-[1fr_auto]">
      <div>
        <h2 className="text-[17px] font-extrabold tracking-tight" style={{ color: NAVY }}>
          {t("hubDash.progress.title")}
        </h2>
        <p className="mt-1.5 text-xs" style={{ color: `${NAVY}99` }}>
          {progress.doneCount}/{total} {t("hubDash.progress.completed")}
        </p>
      </div>
      <div className="flex min-w-[210px] items-center gap-3.5">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e8eef5]">
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{
              width: `${percent}%`,
              background: `linear-gradient(90deg, ${ORANGE}, #ffb37d)`,
            }}
          />
        </div>
        <span className="text-xs font-extrabold" style={{ color: NAVY }}>
          {percent}%
        </span>
      </div>
    </Panel>
  );
}

function NextStepCard({ progress }: { progress: PlanProgress | null }) {
  const t = useT();

  if (!progress) return <Panel className="min-h-[104px] p-6" />;

  const nextTask = progress.nextTask;

  return (
    <Panel className="flex items-center justify-between gap-4 p-6">
      <span
        className="grid size-11 shrink-0 place-items-center rounded-2xl text-lg"
        style={{ color: ORANGE, backgroundColor: "#ffe6da" }}
        aria-hidden="true"
      >
        ↗
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="text-[17px] font-extrabold tracking-tight" style={{ color: NAVY }}>
          {t("hubDash.next.title")}
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed" style={{ color: `${NAVY}99` }}>
          {!progress.stage
            ? t("hubDash.next.noPlan")
            : nextTask
              ? t(taskTitleKey(nextTask))
              : t("hubDash.next.allDone")}
        </p>
      </div>
      <Link
        href={nextTask ? TASK_HREFS[nextTask] : "/hub-plus/dashboard/plan"}
        className="shrink-0 whitespace-nowrap text-[11px] font-extrabold hover:underline"
        style={{ color: ORANGE }}
      >
        {nextTask ? t("hubDash.next.open") : t("hubDash.next.openPlan")}
      </Link>
    </Panel>
  );
}

function BenefitCard({ benefit }: { benefit: Benefit }) {
  const t = useT();
  return (
    <Panel className="flex flex-col p-5">
      <div className="flex items-center justify-between gap-3">
        <span
          className="grid size-10 place-items-center rounded-2xl text-base text-white"
          style={{ background: "linear-gradient(145deg, #0d3a68, #1d5d91)" }}
          aria-hidden="true"
        >
          {benefit.icon}
        </span>
        <span className="rounded-full bg-[#eef5fb] px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-wide text-[#54718c]">
          {t(benefit.deliveryKey)}
        </span>
      </div>
      <h3 className="mt-4 text-[15px] font-extrabold" style={{ color: NAVY }}>
        {t(benefit.titleKey)}
      </h3>
      <p className="mt-1.5 text-[11px] leading-relaxed" style={{ color: `${NAVY}99` }}>
        {t(benefit.bodyKey)}
      </p>
      <Link
        href={benefit.href}
        className="mt-auto flex items-center justify-between pt-4 text-[11px] font-extrabold"
        style={{ color: NAVY }}
      >
        <span>{t(benefit.ctaKey)}</span>
        <span style={{ color: ORANGE }}>→</span>
      </Link>
    </Panel>
  );
}

function LibraryPreview() {
  const t = useT();
  const guides = PREVIEW_SLUGS.map((slug) => GUIDES.find((g) => g.slug === slug)).filter(
    (g): g is (typeof GUIDES)[number] => Boolean(g),
  );

  return (
    <>
      <div className="mb-3.5 mt-7 flex flex-wrap items-end justify-between gap-3 px-0.5">
        <h2 className="text-[17px] font-extrabold tracking-tight" style={{ color: NAVY }}>
          {t("hubDash.library.title")}
        </h2>
        <Link
          href="/hub-plus/dashboard/resources"
          className="text-[11px] font-extrabold hover:underline"
          style={{ color: ORANGE }}
        >
          {t("hubDash.nav.resources")} →
        </Link>
      </div>

      <Panel className="p-4 sm:p-5">
        <ul className="grid gap-2">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="flex items-center gap-3 rounded-2xl bg-[#f6f9fc] p-3 transition-colors hover:bg-[#eef4fa]"
              >
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-xl text-[10px] font-extrabold"
                  style={{ color: ORANGE, backgroundColor: "#ffe6da" }}
                  aria-hidden="true"
                >
                  {t("hubDash.library.tag")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-bold" style={{ color: NAVY }}>
                    {t(g.titleKey)}
                  </span>
                  <span className="block truncate text-[10px]" style={{ color: `${NAVY}99` }}>
                    {t(g.blurbKey)}
                  </span>
                </span>
                <span className="shrink-0 text-[10px] font-extrabold" style={{ color: NAVY }}>
                  {t("hubDash.library.open")} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
