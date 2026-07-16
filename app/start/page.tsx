"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useT } from "../i18n/I18nProvider";
import { AuthPanel } from "../forum/components/AuthPanel";

const BG = "#EAF6FF";
const NAVY = "#092A4D";
const ORANGE = "#fd7933";
const STORAGE_KEY = "studynl.plan";

type Stage = "exploring" | "applying" | "accepted" | "here";
type Status = "eu" | "nonEu" | "unsure";
type Level = "bachelor" | "master" | "exchange" | "other";
type CityChoice = "chosen" | "shortlist" | "open";

type Answers = {
  stage: Stage | null;
  status: Status | null;
  level: Level | null;
  city: CityChoice | null;
};

const EMPTY_ANSWERS: Answers = { stage: null, status: null, level: null, city: null };

type TaskId = "study-route" | "visa" | "funding" | "housing" | "cities" | "arrival";

const TASK_HREFS: Record<TaskId, string> = {
  "study-route": "/guides/study-route",
  visa: "/guides/visa-residency",
  funding: "/guides/scholarships",
  housing: "/guides/accommodation",
  cities: "/cities",
  arrival: "/guides/arrival-checklist",
};

const TASKS_BY_STAGE: Record<Stage, TaskId[]> = {
  exploring: ["study-route", "cities", "funding"],
  applying: ["study-route", "visa", "funding"],
  accepted: ["housing", "visa", "arrival"],
  here: ["arrival", "housing", "cities"],
};

const STAGE_OPTIONS: { id: Stage; labelKey: string; descKey: string }[] = [
  { id: "exploring", labelKey: "startPlan.q1.exploring.label", descKey: "startPlan.q1.exploring.desc" },
  { id: "applying", labelKey: "startPlan.q1.applying.label", descKey: "startPlan.q1.applying.desc" },
  { id: "accepted", labelKey: "startPlan.q1.accepted.label", descKey: "startPlan.q1.accepted.desc" },
  { id: "here", labelKey: "startPlan.q1.here.label", descKey: "startPlan.q1.here.desc" },
];

const STATUS_OPTIONS: { id: Status; labelKey: string }[] = [
  { id: "eu", labelKey: "startPlan.q2.eu.label" },
  { id: "nonEu", labelKey: "startPlan.q2.nonEu.label" },
  { id: "unsure", labelKey: "startPlan.q2.unsure.label" },
];

const LEVEL_OPTIONS: { id: Level; labelKey: string }[] = [
  { id: "bachelor", labelKey: "startPlan.q3.bachelor.label" },
  { id: "master", labelKey: "startPlan.q3.master.label" },
  { id: "exchange", labelKey: "startPlan.q3.exchange.label" },
  { id: "other", labelKey: "startPlan.q3.other.label" },
];

const CITY_OPTIONS: { id: CityChoice; labelKey: string }[] = [
  { id: "chosen", labelKey: "startPlan.q4.chosen.label" },
  { id: "shortlist", labelKey: "startPlan.q4.shortlist.label" },
  { id: "open", labelKey: "startPlan.q4.open.label" },
];

const STEP_KEYS = ["startPlan.step1", "startPlan.step2", "startPlan.step3", "startPlan.step4"];

export default function StartPage() {
  const t = useT();
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const [remoteReady, setRemoteReady] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.answers) setAnswers(parsed.answers);
        if (parsed?.done) setDone(parsed.done);
        if (parsed?.answers?.stage && parsed?.answers?.status && parsed?.answers?.level && parsed?.answers?.city) {
          setStep(5);
        }
      }
    } catch {
      // Ignore corrupt/unavailable localStorage — just start fresh.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, done }));
    } catch {
      // Storage may be unavailable (private browsing, quota) — plan just won't persist.
    }
  }, [answers, done, hydrated]);

  // On login, prefer whatever plan is already saved on the account; if the
  // account has no plan yet, seed it from whatever was built locally so
  // progress made before signing in isn't lost.
  useEffect(() => {
    if (!hydrated || authLoading) return;
    if (!user) {
      setRemoteReady(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/plan");
        const data = await res.json().catch(() => null);
        if (cancelled) return;
        const remoteAnswers = data?.plan?.answers;
        if (remoteAnswers && Object.keys(remoteAnswers).length > 0) {
          const merged = { ...EMPTY_ANSWERS, ...remoteAnswers };
          setAnswers(merged);
          setDone(data.plan.done ?? {});
          if (merged.stage && merged.status && merged.level && merged.city) setStep(5);
        } else if (answers.stage || answers.status || answers.level || answers.city) {
          await fetch("/api/plan", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers, done }),
          }).catch(() => {});
        }
      } finally {
        if (!cancelled) setRemoteReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
    // Deliberately only re-runs on login state changes — answers/done are
    // read once at the moment of login, not tracked as reactive deps here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, hydrated, authLoading]);

  // Once the initial login merge above has settled, keep the account copy in
  // sync with every subsequent local change.
  useEffect(() => {
    if (!user || !remoteReady) return;
    fetch("/api/plan", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, done }),
    }).catch(() => {});
  }, [answers, done, user, remoteReady]);

  function select<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  }

  function restart() {
    setAnswers(EMPTY_ANSWERS);
    setDone({});
    setStep(1);
  }

  function toggleDone(id: TaskId) {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const isResult = step === 5 && answers.stage && answers.status && answers.level && answers.city;
  const tasks = answers.stage ? TASKS_BY_STAGE[answers.stage] : [];
  const allTasksDone = tasks.length > 0 && tasks.every((id) => done[id]);

  return (
    <section style={{ backgroundColor: BG, color: NAVY }}>
      <div className="mx-auto max-w-2xl px-6 py-10">
        <span
          className="inline-flex w-fit items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold"
          style={{ color: NAVY }}
        >
          {t("startPlan.badge")}
        </span>

        <h1
          className="mt-8 break-words text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: NAVY }}
        >
          {t("startPlan.title")}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed" style={{ color: `${NAVY}B3` }}>
          {t("startPlan.subtitle")}
        </p>

        {!authLoading && !user && (
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(9,42,77,0.05)] sm:flex sm:items-center sm:justify-between sm:gap-4">
            <div>
              <p className="text-sm font-bold" style={{ color: NAVY }}>
                {t("startPlan.auth.banner.title")}
              </p>
              <p className="mt-1 text-sm" style={{ color: `${NAVY}99` }}>
                {t("startPlan.auth.banner.subtitle")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAuth((s) => !s)}
              className="mt-3 inline-flex shrink-0 items-center rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90 sm:mt-0"
              style={{ backgroundColor: ORANGE }}
            >
              {t("startPlan.auth.banner.cta")}
            </button>
          </div>
        )}

        {!authLoading && !user && showAuth && (
          <div className="mt-4">
            <AuthPanel
              loginSubtitle={t("startPlan.auth.login.subtitle")}
              signupSubtitle={t("startPlan.auth.signup.subtitle")}
            />
          </div>
        )}

        {!isResult ? (
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-[0_2px_10px_rgba(9,42,77,0.05)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: `${NAVY}80` }}>
              {t(STEP_KEYS[step - 1])}
            </p>

            {step === 1 && (
              <QuestionStep
                heading={t("startPlan.q1.heading")}
                options={STAGE_OPTIONS.map((o) => ({ id: o.id, label: t(o.labelKey), desc: t(o.descKey) }))}
                onSelect={(id) => select("stage", id as Stage)}
              />
            )}
            {step === 2 && (
              <QuestionStep
                heading={t("startPlan.q2.heading")}
                options={STATUS_OPTIONS.map((o) => ({ id: o.id, label: t(o.labelKey) }))}
                onSelect={(id) => select("status", id as Status)}
              />
            )}
            {step === 3 && (
              <QuestionStep
                heading={t("startPlan.q3.heading")}
                options={LEVEL_OPTIONS.map((o) => ({ id: o.id, label: t(o.labelKey) }))}
                onSelect={(id) => select("level", id as Level)}
              />
            )}
            {step === 4 && (
              <QuestionStep
                heading={t("startPlan.q4.heading")}
                options={CITY_OPTIONS.map((o) => ({ id: o.id, label: t(o.labelKey) }))}
                onSelect={(id) => select("city", id as CityChoice)}
              />
            )}

            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className="mt-6 text-sm font-bold underline-offset-2 hover:underline"
                style={{ color: `${NAVY}99` }}
              >
                {t("startPlan.back")}
              </button>
            )}
          </div>
        ) : (
          <div className="mt-8">
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_10px_rgba(9,42,77,0.05)] sm:p-8">
              <h2 className="text-xl font-bold" style={{ color: NAVY }}>
                {t("startPlan.result.heading")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
                {t("startPlan.result.subtitle")}
              </p>
            </div>

            <ol className="mt-5 flex flex-col gap-3">
              {tasks.map((id, i) => (
                <li
                  key={id}
                  className="flex items-start gap-4 rounded-2xl bg-white px-5 py-4 shadow-[0_1px_2px_rgba(9,42,77,0.04)]"
                >
                  <span
                    className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: done[id] ? "#15803d" : ORANGE }}
                  >
                    {done[id] ? <CheckIcon /> : i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={TASK_HREFS[id]}
                      className="text-base font-bold hover:underline"
                      style={{ color: NAVY }}
                    >
                      {t(`startPlan.task.${id}.title`)}
                    </Link>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
                      {t(`startPlan.task.${id}.desc`)}
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleDone(id)}
                      className="mt-2 text-xs font-bold underline-offset-2 hover:underline"
                      style={{ color: done[id] ? "#15803d" : ORANGE }}
                    >
                      {done[id] ? t("startPlan.result.taskUndo") : t("startPlan.result.taskDone")}
                    </button>
                  </div>
                </li>
              ))}
            </ol>

            {allTasksDone && (
              <div className="mt-5 rounded-2xl p-6 text-center sm:p-8" style={{ backgroundColor: NAVY }}>
                <h2 className="text-lg font-bold text-white">{t("startPlan.complete.title")}</h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/70">
                  {t("startPlan.complete.subtitle")}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/hub-plus"
                    className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
                    style={{ backgroundColor: ORANGE }}
                  >
                    {t("startPlan.complete.hubPlusButton")}
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                  >
                    {t("startPlan.complete.contactButton")}
                  </Link>
                </div>
              </div>
            )}

            <p className="mt-5 text-xs leading-relaxed" style={{ color: `${NAVY}80` }}>
              {user ? t("startPlan.sync.saved") : t("startPlan.result.privacyNote")}
            </p>

            <button
              type="button"
              onClick={restart}
              className="mt-4 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-bold shadow-[0_1px_3px_rgba(9,42,77,0.06)] hover:opacity-90"
              style={{ color: NAVY }}
            >
              {t("startPlan.startAgain")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function QuestionStep({
  heading,
  options,
  onSelect,
}: {
  heading: string;
  options: { id: string; label: string; desc?: string }[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mt-3">
      <h2 className="text-lg font-bold" style={{ color: NAVY }}>
        {heading}
      </h2>
      <div className="mt-4 flex flex-col gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className="flex flex-col items-start rounded-2xl bg-[#f6f8fb] px-5 py-4 text-left transition-colors hover:bg-[#eef1f6]"
          >
            <span className="text-sm font-bold" style={{ color: NAVY }}>
              {option.label}
            </span>
            {option.desc && (
              <span className="mt-1 text-xs leading-relaxed" style={{ color: `${NAVY}80` }}>
                {option.desc}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}
