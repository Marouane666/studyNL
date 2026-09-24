"use client";

// About StudyNL. Copy supplied by StudyNL, September 2026; every string lives
// under "aboutPage.*" in app/i18n/dictionary.ts.

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";
const MUTED = `${NAVY}B3`;

const JOURNEY = ["s1", "s2", "s3", "s4", "s5", "s6"];
const HOME_STEPS = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8"];

export default function AboutPage() {
  const t = useT();
  const k = (key: string) => t(`aboutPage.${key}`);

  return (
    <section className="bg-white" style={{ color: NAVY }}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold ring-1 ring-[#092A4D]/10">
          {k("hero.badge")}
        </span>
        <h1 className="mt-8 max-w-4xl break-words text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
          {k("hero.title")}
        </h1>
        <div className="mt-8 flex max-w-3xl flex-col gap-4 text-base leading-relaxed" style={{ color: MUTED }}>
          <p>{k("hero.p1")}</p>
          <p>{k("hero.p2")}</p>
          <p className="text-lg font-bold" style={{ color: NAVY }}>
            {k("hero.p3")}
          </p>
          <p>{k("hero.p4")}</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <StartButton label={k("home.cta")} />
          <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: ORANGE }}>
            {k("hero.tagline")}
          </p>
        </div>

        {/* More than information */}
        <Block>
          <Heading>{k("more.title")}</Heading>
          <Body>
            <p>{k("more.p1")}</p>
            <p>{k("more.p2")}</p>
            <Strong>{k("more.p3")}</Strong>
            <p>{k("more.p4")}</p>
          </Body>
        </Block>

        {/* Why StudyNL */}
        <Block tinted>
          <Eyebrow>{k("why.eyebrow")}</Eyebrow>
          <Heading>{k("why.title")}</Heading>
          <Body>
            <p>{k("why.p1")}</p>
            <p>{k("why.p2")}</p>
            <Strong>{k("why.p3")}</Strong>
            <p>{k("why.p4")}</p>
            <p>{k("why.p5")}</p>
          </Body>
          <Closing>{k("why.closing")}</Closing>
        </Block>

        {/* Your journey */}
        <Block>
          <Heading>{k("journey.title")}</Heading>
          <Body>
            <p>{k("journey.p1")}</p>
            <p>{k("journey.p2")}</p>
            <p>{k("journey.p3")}</p>
            <p>{k("journey.p4")}</p>
          </Body>
          <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {JOURNEY.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-2.5 rounded-xl bg-[#f6f8fb] px-3.5 py-3 text-sm font-bold"
              >
                <span
                  className="grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-extrabold text-white"
                  style={{ backgroundColor: ORANGE }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                {k(`journey.${step}`)}
              </li>
            ))}
          </ol>
          <Closing>{k("journey.closing")}</Closing>
        </Block>

        {/* Safety */}
        <Block tinted>
          <Heading>{k("safety.title")}</Heading>
          <Body>
            <p>{k("safety.p1")}</p>
            <Strong>{k("safety.p2")}</Strong>
            <p>{k("safety.p3")}</p>
            <p>{k("safety.p4")}</p>
          </Body>
          <div className="mt-6 max-w-3xl text-base font-bold leading-relaxed">
            <p>{k("safety.closing1")}</p>
            <p style={{ color: ORANGE }}>{k("safety.closing2")}</p>
          </div>
        </Block>

        {/* Hub Plus */}
        <div className="mt-10 rounded-3xl p-8 text-white sm:p-12" style={{ backgroundColor: NAVY }}>
          <span className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
            {k("hub.eyebrow")}
          </span>
          <h2 className="mt-4 max-w-3xl text-[clamp(1.6rem,3.5vw,2.5rem)] font-extrabold leading-tight tracking-tight">
            {k("hub.title")}
          </h2>
          <div className="mt-5 flex max-w-3xl flex-col gap-4 text-sm leading-relaxed text-white/75 sm:text-base">
            <p>{k("hub.p1")}</p>
            <p>{k("hub.p2")}</p>
            <p>{k("hub.p3")}</p>
            <p>{k("hub.idea")}</p>
          </div>
          <blockquote
            className="mt-4 max-w-3xl border-l-4 pl-5 text-lg font-bold leading-snug sm:text-xl"
            style={{ borderColor: ORANGE }}
          >
            {k("hub.quote")}
          </blockquote>
          <p className="mt-6 max-w-3xl text-sm font-semibold text-white/85 sm:text-base">{k("hub.closing")}</p>
          <Link
            href="/hub-plus"
            className="mt-7 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {k("hub.cta")}
          </Link>
        </div>

        {/* Accommodation */}
        <Block>
          <Heading>{k("acc.title")}</Heading>
          <Body>
            <p>{k("acc.p1")}</p>
            <p>{k("acc.p2")}</p>
            <p>{k("acc.p3")}</p>
            <p>{k("acc.p4")}</p>
          </Body>
          <Closing>{k("acc.p5")}</Closing>
        </Block>

        {/* Powered by graduates */}
        <Block tinted>
          <Heading>{k("grads.title")}</Heading>
          <Body>
            <p>{k("grads.p1")}</p>
          </Body>
          <blockquote
            className="mt-4 max-w-3xl border-l-4 pl-5 text-lg font-bold leading-snug sm:text-xl"
            style={{ borderColor: ORANGE }}
          >
            {k("grads.quote")}
          </blockquote>
          <Body>
            <p>{k("grads.p2")}</p>
            <p>{k("grads.p3")}</p>
            <Strong>{k("grads.p4")}</Strong>
          </Body>
        </Block>

        {/* From considering to home */}
        <Block>
          <Heading>{k("home.title")}</Heading>
          <Body>
            <p>{k("home.p1")}</p>
            <p>{k("home.p2")}</p>
            <Strong>{k("home.p3")}</Strong>
          </Body>
          <ul className="mt-6 grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2">
            {HOME_STEPS.map((step) => (
              <li key={step} className="flex items-center gap-2.5 text-sm font-semibold sm:text-base">
                <CheckIcon />
                {k(`home.${step}`)}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[clamp(1.25rem,2.5vw,1.75rem)] font-extrabold leading-tight tracking-tight">
            {k("home.closing")}
          </p>
          <div className="mt-6">
            <StartButton label={k("home.cta")} />
          </div>
        </Block>
      </div>
    </section>
  );
}

function Block({ children, tinted }: { children: React.ReactNode; tinted?: boolean }) {
  return (
    <div className={tinted ? "mt-10 rounded-3xl bg-[#f6f8fb] p-8 sm:p-12" : "mt-14 sm:px-2"}>
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="mb-4 inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ring-[#092A4D]/10"
      style={{ color: ORANGE }}
    >
      {children}
    </span>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-3xl text-[clamp(1.6rem,3.5vw,2.5rem)] font-extrabold leading-tight tracking-tight">
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 flex max-w-3xl flex-col gap-4 text-sm leading-relaxed sm:text-base" style={{ color: MUTED }}>
      {children}
    </div>
  );
}

/** A one-line turn in the argument, set in navy so it stands out from the body. */
function Strong({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-bold" style={{ color: NAVY }}>
      {children}
    </p>
  );
}

function Closing({ children }: { children: React.ReactNode }) {
  return <p className="mt-6 max-w-3xl text-base font-bold leading-relaxed">{children}</p>;
}

function StartButton({ label }: { label: string }) {
  return (
    <Link
      href="/start"
      className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
      style={{ backgroundColor: ORANGE }}
    >
      {label}
    </Link>
  );
}

function CheckIcon() {
  return (
    <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}
