import Link from "next/link";

const NAVY = "#03294f";
const ORANGE = "#fd7933";
const TAG_BG = "#d9f0f4";
const TAG_TEXT = "#0a6b7b";
const ICON_TINT = "#ffe7d6";

type Guide = {
  href: string;
  tag: string;
  title: string;
  blurb: string;
  icon: React.ReactNode;
  wide?: boolean;
};

const GUIDES: Guide[] = [
  {
    href: "/guides/dutch-enrolment",
    tag: "Enrolment",
    title: "Dutch enrolment explained",
    blurb: "Studielink, deadlines and what each step really means.",
    icon: <GraduationCapIcon />,
    wide: true,
  },
  {
    href: "/guides/housing-scams",
    tag: "Safety",
    title: "Housing scam checks",
    blurb: "Spot fake landlords before you send a deposit.",
    icon: <ShieldCheckIcon />,
  },
  {
    href: "/guides/arrival-plan",
    tag: "Arrival",
    title: "30-day arrival plan",
    blurb: "BSN, bank, insurance and registration in order.",
    icon: <ClockIcon />,
  },
  {
    href: "/guides/cities",
    tag: "Cities",
    title: "City guides",
    blurb: "Amsterdam, Rotterdam, Utrecht, Groningen and more.",
    icon: <MapPinIcon />,
  },
  {
    href: "/guides/scholarships",
    tag: "Money",
    title: "Scholarship deadlines",
    blurb: "Stay ahead of the funding windows that matter.",
    icon: <WalletIcon />,
  },
];

export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #ffe7ce 0%, #ffd4c9 35%, #f0c7f9 100%)",
      }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium ring-1 ring-black/5 backdrop-blur"
            style={{ color: NAVY }}
          >
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: ORANGE }}
            />
            For international students &middot; 2025/26 intake
          </span>

          <h1
            className="mt-6 text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight"
            style={{ color: NAVY }}
          >
            Your clear route to studying in the Netherlands.
          </h1>

          <p
            className="mt-6 max-w-xl text-base leading-relaxed"
            style={{ color: `${NAVY}b3` }}
          >
            Make the big decisions in the right order: study route, enrolment,
            housing, money, work rules and arrival tasks. No vague articles.
            Just a guided move plan.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: NAVY }}
            >
              Start your move
              <ArrowRightIcon />
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/80"
              style={{ color: NAVY, boxShadow: `inset 0 0 0 1px ${NAVY}26` }}
            >
              Browse guides
            </Link>
          </div>

          <div
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium"
            style={{ color: ORANGE }}
          >
            <span className="inline-flex items-center gap-1.5">
              <CheckBadgeIcon />
              Written for internationals
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldAlertIcon />
              Scam-aware advice
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {GUIDES.map((g) => (
            <GuideCard key={g.href} guide={g} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={guide.href}
      className={`group relative flex flex-col rounded-3xl bg-white/90 p-5 ring-1 ring-black/5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] backdrop-blur-sm transition hover:bg-white hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] ${
        guide.wide ? "sm:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex size-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: ICON_TINT, color: ORANGE }}
        >
          {guide.icon}
        </span>
        <span
          className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{ backgroundColor: TAG_BG, color: TAG_TEXT }}
        >
          {guide.tag}
        </span>
      </div>
      <h3
        className="mt-6 text-base font-semibold"
        style={{ color: NAVY }}
      >
        {guide.title}
      </h3>
      <p
        className="mt-1 text-sm leading-relaxed"
        style={{ color: `${NAVY}99` }}
      >
        {guide.blurb}
      </p>
      <span
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium"
        style={{ color: ORANGE }}
      >
        Open guide
        <ArrowUpRightIcon />
      </span>
    </Link>
  );
}

function Svg(props: React.SVGProps<SVGSVGElement>) {
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
      {...props}
    />
  );
}

function GraduationCapIcon() {
  return (
    <Svg>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5a6 6 0 0 0 12 0v-5" />
    </Svg>
  );
}
function ShieldCheckIcon() {
  return (
    <Svg>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
}
function ClockIcon() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Svg>
  );
}
function MapPinIcon() {
  return (
    <Svg>
      <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </Svg>
  );
}
function WalletIcon() {
  return (
    <Svg>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M16 15h2" />
    </Svg>
  );
}
function ArrowRightIcon() {
  return (
    <Svg width={16} height={16}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </Svg>
  );
}
function ArrowUpRightIcon() {
  return (
    <Svg width={14} height={14}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Svg>
  );
}
function CheckBadgeIcon() {
  return (
    <Svg width={14} height={14}>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
}
function ShieldAlertIcon() {
  return (
    <Svg width={14} height={14}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </Svg>
  );
}
