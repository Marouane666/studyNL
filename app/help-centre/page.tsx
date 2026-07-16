"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useT } from "../i18n/I18nProvider";

const BG = "#EAF6FF";
const NAVY = "#092A4D";
const ORANGE = "#fd7933";

type Faq = { id: string; questionKey: string; answerKey: string; href: string };

const FAQS: Faq[] = [
  { id: "studielink", questionKey: "helpc.q1", answerKey: "helpc.a1", href: "/guides/enrolment" },
  { id: "rental-scam", questionKey: "helpc.q2", answerKey: "helpc.a2", href: "/guides/avoid-scams" },
  { id: "working", questionKey: "helpc.q3", answerKey: "helpc.a3", href: "/guides/working-while-studying" },
  { id: "after-arrival", questionKey: "helpc.q4", answerKey: "helpc.a4", href: "/guides/arrival-checklist" },
  { id: "budget", questionKey: "helpc.q5", answerKey: "helpc.a5", href: "/guides/cost-of-living" },
  { id: "documents", questionKey: "helpc.q6", answerKey: "helpc.a6", href: "/guides/visa-residency" },
  { id: "visa-deadline", questionKey: "helpc.q7", answerKey: "helpc.a7", href: "/guides/visa-residency" },
  { id: "bsn", questionKey: "helpc.q8", answerKey: "helpc.a8", href: "/guides/arrival-checklist" },
  { id: "affordable-housing", questionKey: "helpc.q9", answerKey: "helpc.a9", href: "/cities" },
  { id: "deposit", questionKey: "helpc.q10", answerKey: "helpc.a10", href: "/guides/avoid-scams" },
];

function normalize(value: string): string {
  // Strip punctuation so a query like "Can I work?" (from a homepage quick-tag
  // link) tokenizes to "work", matching FAQ text like "work as a student" —
  // without this, the trailing "?" makes the token "work?" match nothing.
  return value
    .toLowerCase()
    .replace(/[?!.,;:'"()]/g, "")
    .trim();
}

export default function HelpCentrePage() {
  return (
    <Suspense fallback={null}>
      <HelpCentreContent />
    </Suspense>
  );
}

function HelpCentreContent() {
  const t = useT();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    const items = FAQS.map((faq) => ({
      faq,
      question: t(faq.questionKey),
      answer: t(faq.answerKey),
    }));
    if (tokens.length === 0) return items;
    return items.filter((item) => {
      const haystack = normalize(`${item.question} ${item.answer}`);
      return tokens.every((token) => haystack.includes(token));
    });
  }, [query, t]);

  return (
    <section style={{ backgroundColor: BG, color: NAVY }}>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <span
          className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold"
          style={{ color: NAVY }}
        >
          {t("helpc.badge")}
        </span>

        <h1
          className="mt-8 break-words text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: NAVY }}
        >
          {t("helpc.title")}
        </h1>

        <div className="mt-10 rounded-2xl bg-white p-4 shadow-[0_4px_18px_rgba(9,42,77,0.05)]">
          <label className="flex items-center gap-3 px-3">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("helpc.placeholder")}
              className="w-full bg-transparent py-3 text-base font-medium outline-none placeholder:font-semibold"
              style={{ color: NAVY }}
            />
          </label>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {visible.map(({ faq, question, answer }) => {
            const open = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white shadow-[0_2px_8px_rgba(9,42,77,0.04)] transition-shadow hover:shadow-[0_8px_22px_rgba(9,42,77,0.1)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : faq.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-bold"
                  style={{ color: NAVY }}
                >
                  {question}
                  <ChevronIcon className={open ? "rotate-180 transition-transform" : "transition-transform"} />
                </button>
                {open && (
                  <div className="px-6 pb-6">
                    <p className="text-sm leading-relaxed" style={{ color: `${NAVY}CC` }}>
                      {answer}
                    </p>
                    <Link
                      href={faq.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold hover:underline"
                      style={{ color: ORANGE }}
                    >
                      {t("helpc.readGuide")}
                      <ArrowRightIcon />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
          {visible.length === 0 && (
            <p className="text-sm" style={{ color: `${NAVY}80` }}>
              {t("helpc.noResults")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={`${NAVY}66`}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
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
      className={className}
      style={{ color: `${NAVY}80`, flexShrink: 0 }}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}
