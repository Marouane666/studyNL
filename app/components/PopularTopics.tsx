import Link from "next/link";

const NAVY = "#03294f";
const ORANGE = "#fd7933";
const ICON_BG = "#e8eafb";
const TAG_BG = "#ffe7d6";

type Topic = {
  href: string;
  tag: string;
  title: string;
  blurb: string;
  icon: React.ReactNode;
};

const TOPICS: Topic[] = [
  {
    href: "/guides/study-route",
    tag: "Study Route",
    title: "Study in the Netherlands",
    blurb:
      "Bachelor, master, applied vs research universities — pick the path that fits.",
    icon: <GraduationCapIcon />,
  },
  {
    href: "/guides/working-while-studying",
    tag: "Work Rules",
    title: "Working While Studying",
    blurb:
      "Hour limits, contracts, taxes and what EU vs non-EU students can do.",
    icon: <BriefcaseIcon />,
  },
  {
    href: "/guides/scholarships",
    tag: "Money",
    title: "Scholarships & Funding",
    blurb:
      "Holland Scholarship, Erasmus+, DUO loans and uni-specific awards.",
    icon: <WalletIcon />,
  },
  {
    href: "/guides/arrival-checklist",
    tag: "Arrival",
    title: "Arrival Checklist",
    blurb: "30 days to BSN, bank, insurance, registration and a working SIM.",
    icon: <ClockIcon />,
  },
  {
    href: "/guides/accommodation",
    tag: "Housing",
    title: "Accommodation",
    blurb: "How to find a room without losing your deposit to a scam.",
    icon: <HomeIcon />,
  },
  {
    href: "/guides/open-days",
    tag: "Enrolment",
    title: "Open Days & Enrolling",
    blurb:
      "Studielink, numerus fixus deadlines and what to bring to matching.",
    icon: <BookIcon />,
  },
];

export function PopularTopics() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: ORANGE }}
            >
              Popular topics
            </p>
            <h2
              className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
              style={{ color: NAVY }}
            >
              Start where most students get stuck.
            </h2>
          </div>
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-80"
            style={{ color: NAVY }}
          >
            All guides
            <ArrowRightIcon />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => (
            <TopicCard key={t.href} topic={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      href={topic.href}
      className="group flex flex-col rounded-2xl bg-white p-5 ring-1 ring-black/[0.06] shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)] hover:ring-black/10"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex size-10 items-center justify-center rounded-full"
          style={{ backgroundColor: ICON_BG, color: NAVY }}
        >
          {topic.icon}
        </span>
        <span
          className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{ backgroundColor: TAG_BG, color: ORANGE }}
        >
          {topic.tag}
        </span>
      </div>

      <h3 className="mt-6 text-lg font-bold" style={{ color: NAVY }}>
        {topic.title}
      </h3>
      <p
        className="mt-1.5 text-sm leading-relaxed"
        style={{ color: `${NAVY}99` }}
      >
        {topic.blurb}
      </p>

      <div
        className="mt-5 flex items-center justify-between border-t pt-3"
        style={{ borderColor: `${NAVY}14` }}
      >
        <span
          className="text-sm font-semibold"
          style={{ color: NAVY }}
        >
          Open guide
        </span>
        <span style={{ color: ORANGE }}>
          <ArrowUpRightIcon />
        </span>
      </div>
    </Link>
  );
}

function Svg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
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
function BriefcaseIcon() {
  return (
    <Svg>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
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
function ClockIcon() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Svg>
  );
}
function HomeIcon() {
  return (
    <Svg>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </Svg>
  );
}
function BookIcon() {
  return (
    <Svg>
      <path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4Z" />
      <path d="M4 17a3 3 0 0 1 3-3h12" />
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
    <Svg width={16} height={16}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Svg>
  );
}
