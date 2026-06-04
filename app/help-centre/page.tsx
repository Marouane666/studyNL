"use client";

import { useMemo, useState } from "react";

const BG = "#EAF6FF";
const NAVY = "#092A4D";

const QUESTIONS = [
  "I need help with Studielink",
  "I found a rental, is it safe?",
  "Can I work as a student?",
  "What should I do after arrival?",
  "How much money do I need per month?",
  "What documents do I need before arrival?",
];

export default function HelpCentrePage() {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return QUESTIONS;
    return QUESTIONS.filter((item) => item.toLowerCase().includes(q));
  }, [query]);

  return (
    <section style={{ backgroundColor: BG, color: NAVY }}>
      <div className="mx-auto max-w-5xl px-6 py-20">
        <span
          className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold"
          style={{ color: NAVY }}
        >
          Help Centre
        </span>

        <h1
          className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
          style={{ color: NAVY }}
        >
          How can we help?
        </h1>

        <div className="mt-10 rounded-2xl bg-white p-4 shadow-[0_4px_18px_rgba(9,42,77,0.05)]">
          <label className="flex items-center gap-3 px-3">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search enrolment, housing, visa, work, money..."
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
              key={item}
              type="button"
              className="rounded-2xl bg-white px-6 py-5 text-left text-sm font-bold shadow-[0_2px_8px_rgba(9,42,77,0.04)] transition-shadow hover:shadow-[0_8px_22px_rgba(9,42,77,0.1)]"
              style={{ color: NAVY }}
            >
              {item}
            </button>
          ))}
          {visible.length === 0 && (
            <p
              className="col-span-full text-sm"
              style={{ color: `${NAVY}80` }}
            >
              No results. Try a different keyword.
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
