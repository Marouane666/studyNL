"use client";

import { useMemo, useState } from "react";
import { useT } from "../i18n/I18nProvider";

const BG = "#EAF6FF";
const NAVY = "#092A4D";

const QUESTION_KEYS = [
  "helpc.q1",
  "helpc.q2",
  "helpc.q3",
  "helpc.q4",
  "helpc.q5",
  "helpc.q6",
];

export default function HelpCentrePage() {
  const t = useT();
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const questions = QUESTION_KEYS.map((key) => ({ key, label: t(key) }));
    if (!q) return questions;
    return questions.filter((item) => item.label.toLowerCase().includes(q));
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
              style={{
                color: NAVY,
              }}
            />
          </label>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visible.map((item) => (
            <button
              key={item.key}
              type="button"
              className="rounded-2xl bg-white px-6 py-5 text-left text-sm font-bold shadow-[0_2px_8px_rgba(9,42,77,0.04)] transition-shadow hover:shadow-[0_8px_22px_rgba(9,42,77,0.1)]"
              style={{ color: NAVY }}
            >
              {item.label}
            </button>
          ))}
          {visible.length === 0 && (
            <p
              className="col-span-full text-sm"
              style={{ color: `${NAVY}80` }}
            >
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
