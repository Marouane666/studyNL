import Image from "next/image";
import Link from "next/link";

const ORANGE = "#fd7933";

type LinkItem = { href: string; label: string };
type Column = { title: string; items: LinkItem[] };

const COLUMNS: Column[] = [
  {
    title: "Study & Money",
    items: [
      { href: "/guides/study-route", label: "Study in the Netherlands" },
      { href: "/guides/scholarships", label: "Scholarships & Funding" },
      { href: "/guides/cost-of-living", label: "Cost of living" },
      {
        href: "/guides/working-while-studying",
        label: "Working while studying",
      },
    ],
  },
  {
    title: "Arrival",
    items: [
      { href: "/guides/arrival-checklist", label: "Arrival checklist" },
      { href: "/guides/dutch-enrolment", label: "Enrolment" },
      { href: "/hub-plus", label: "Hub Plus" },
      { href: "/forum", label: "Forum" },
    ],
  },
  {
    title: "Essentials",
    items: [
      { href: "/universities", label: "Universities" },
      { href: "/fraternities", label: "Fraternities" },
      { href: "/guides/visa-residency", label: "Visa & residency" },
      { href: "/guides/housing-scams", label: "Avoid scams" },
    ],
  },
  {
    title: "Life in NL",
    items: [
      { href: "/guides/cities", label: "City guides" },
      { href: "/guides/finance", label: "Finance & loans" },
      { href: "/guides/accommodation", label: "Accommodation" },
      { href: "/partners", label: "Partner with us" },
    ],
  },
];

const BOTTOM_LINKS: LinkItem[] = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/legal", label: "Legal" },
  { href: "/help-centre", label: "Help centre" },
];

export function Footer() {
  return (
    <footer
      className="text-white/80"
      style={{
        background: "linear-gradient(90deg, #001b3a 0%, #1b194b 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="StudyNL"
                width={32}
                height={32}
              />
              <span className="text-xl font-semibold tracking-tight">
                <span className="text-white">Study</span>
                <span style={{ color: ORANGE }}>NL</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              A trusted starting point for international students moving to
              the Netherlands. Clear, practical and written around real
              student problems.
            </p>

            <form
              action="/help-centre"
              method="GET"
              className="mt-6 flex items-center gap-2 rounded-full p-1.5"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <span className="pl-3 pr-1 text-white/50">
                <SearchIcon />
              </span>
              <input
                type="search"
                name="q"
                placeholder="Search guides…"
                aria-label="Search guides"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: ORANGE }}
              >
                Search
              </button>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/75 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/55">
            © 2026 StudyNL. Independent student guidance.
          </p>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {BOTTOM_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-white/70 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
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
