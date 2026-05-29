import Link from "next/link";

const NAVY = "#03294f";
const ORANGE = "#fd7933";
const PANEL_BG = "#e5f9ff";

const QUICK_TAGS = [
  "Visa deadline",
  "Cheap housing",
  "Can I work?",
  "Monthly budget",
  "Studielink",
  "BSN",
  "Rent deposit",
];

export function HelpCentreSearch() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div
          className="rounded-3xl px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16"
          style={{ backgroundColor: PANEL_BG }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: ORANGE }}
          >
            Help Centre
          </p>

          <h2
            className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: NAVY }}
          >
            Search by problem, deadline or city.
          </h2>

          <p
            className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base"
            style={{ color: `${NAVY}99` }}
          >
            Students don&apos;t only browse categories. They search things like
            BSN, rent deposit, DUO, visa, September intake and city names. Type
            what&apos;s actually on your mind.
          </p>

          <form
            action="/help-centre"
            method="GET"
            className="mt-8 flex items-center gap-2 rounded-full bg-white p-2 shadow-[0_4px_14px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04]"
          >
            <span
              className="pl-3 pr-1 shrink-0"
              style={{ color: `${NAVY}80` }}
            >
              <SearchIcon />
            </span>
            <input
              type="search"
              name="q"
              placeholder="Try: housing contract before arrival"
              aria-label="Search the help centre"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-[#03294f]/40"
              style={{ color: NAVY }}
            />
            <button
              type="submit"
              className="shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: NAVY }}
            >
              Search
            </button>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {QUICK_TAGS.map((tag) => (
              <Link
                key={tag}
                href={`/help-centre?q=${encodeURIComponent(tag)}`}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold ring-1 ring-black/[0.04] transition hover:bg-white/80 hover:ring-black/10 sm:text-sm"
                style={{ color: NAVY }}
              >
                {tag}
              </Link>
            ))}
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
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
