"use client";

// My move plan — a read-only view of the plan built on /start, so the member
// can see where they are without leaving their space. Ticking steps off still
// happens in the planner itself, which owns that state.

import Link from "next/link";
import { useT } from "../../../i18n/I18nProvider";
import { TASK_HREFS, taskDescKey, taskTitleKey } from "../../../start/tasks";
import { NAVY, ORANGE, PageIntro, Panel } from "../ui";
import { usePlanProgress } from "../usePlanProgress";

export default function DashboardPlanPage() {
  const t = useT();
  const progress = usePlanProgress();

  return (
    <>
      <PageIntro title={t("hubDash.nav.plan")} subtitle={t("hubDash.plan.subtitle")} />

      {!progress ? (
        <Panel className="min-h-[160px]" />
      ) : !progress.stage ? (
        <Panel className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8">
          <div>
            <h2 className="text-[17px] font-extrabold tracking-tight" style={{ color: NAVY }}>
              {t("hubDash.progress.title")}
            </h2>
            <p className="mt-1.5 max-w-md text-xs leading-relaxed" style={{ color: `${NAVY}99` }}>
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
      ) : (
        <>
          <Panel className="grid items-center gap-4 p-6 sm:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-[17px] font-extrabold tracking-tight" style={{ color: NAVY }}>
                {t("hubDash.progress.title")}
              </h2>
              <p className="mt-1.5 text-xs" style={{ color: `${NAVY}99` }}>
                {progress.doneCount}/{progress.tasks.length} {t("hubDash.progress.completed")}
              </p>
            </div>
            <div className="flex min-w-[210px] items-center gap-3.5">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e8eef5]">
                <div
                  className="h-full rounded-full transition-[width] duration-500"
                  style={{
                    width: `${Math.round((progress.doneCount / progress.tasks.length) * 100)}%`,
                    background: `linear-gradient(90deg, ${ORANGE}, #ffb37d)`,
                  }}
                />
              </div>
              <span className="text-xs font-extrabold" style={{ color: NAVY }}>
                {Math.round((progress.doneCount / progress.tasks.length) * 100)}%
              </span>
            </div>
          </Panel>

          <ol className="mt-4 grid gap-3">
            {progress.tasks.map((id, i) => {
              const done = Boolean(progress.done[id]);
              return (
                <li key={id}>
                  <Panel className="flex items-start gap-4 p-5">
                    <span
                      className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: done ? "#15803d" : ORANGE }}
                      aria-hidden="true"
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={TASK_HREFS[id]}
                          className="text-sm font-extrabold hover:underline"
                          style={{ color: NAVY }}
                        >
                          {t(taskTitleKey(id))}
                        </Link>
                        {done && (
                          <span className="rounded-full bg-[#15803d1a] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#15803d]">
                            {t("hubDash.plan.doneLabel")}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed" style={{ color: `${NAVY}99` }}>
                        {t(taskDescKey(id))}
                      </p>
                    </div>
                  </Panel>
                </li>
              );
            })}
          </ol>

          <Link
            href="/start"
            className="mt-5 inline-flex items-center rounded-full bg-white px-5 py-3 text-xs font-extrabold shadow-[0_1px_3px_rgba(9,42,77,0.06)] transition-opacity hover:opacity-90"
            style={{ color: NAVY }}
          >
            {t("hubDash.plan.openPlanner")} →
          </Link>
        </>
      )}
    </>
  );
}
