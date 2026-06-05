"use client";

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";

const NAVY = "#03294f";

const QUICK_TAGS = [
  "help.tag1",
  "help.tag2",
  "help.tag3",
  "help.tag4",
  "help.tag5",
  "help.tag6",
  "help.tag7",
];

export function HelpCentreSearch() {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div
          className="rounded-[2rem] px-6 py-12 sm:px-12 sm:py-14 lg:px-16"
          style={{
            background:
              "linear-gradient(120deg, #fde4d6 0%, #f5ecec 35%, #e6eef9 100%)",
          }}
        >
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <span
                className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-medium ring-1 ring-[#03294f]/10"
                style={{ color: NAVY }}
              >
                {t("help.badge")}
              </span>

              <h2
                className="mt-5 break-words text-[clamp(1.625rem,3.6vw,3rem)] font-extrabold leading-[1.1] tracking-tight"
                style={{ color: NAVY }}
              >
                {t("help.title")}
              </h2>

              <p
                className="mt-5 max-w-lg text-sm leading-relaxed"
                style={{ color: `${NAVY}80` }}
              >
                {t("help.subtitle")}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(3,41,79,0.06)]">
              <form
                action="/help-centre"
                method="GET"
                className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 ring-1 ring-[#03294f]/10"
              >
                <span className="shrink-0 text-[#03294f]/40">
                  <SearchIcon />
                </span>
                <input
                  type="search"
                  name="q"
                  placeholder={t("help.placeholder")}
                  aria-label={t("help.title")}
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[#03294f]/40"
                  style={{ color: NAVY }}
                />
              </form>

              <div className="mt-4 flex flex-wrap gap-2">
                {QUICK_TAGS.map((key) => {
                  const label = t(key);
                  return (
                    <Link
                      key={key}
                      href={`/help-centre?q=${encodeURIComponent(label)}`}
                      className="whitespace-nowrap rounded-xl bg-[#eaf2fa] px-3.5 py-2 text-xs font-bold transition-colors hover:bg-[#dce8f5] sm:text-sm"
                      style={{ color: NAVY }}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
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
      stroke="currentColor"
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
