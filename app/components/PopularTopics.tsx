import Link from "next/link";

const NAVY = "#03294f";

type Topic = {
  href: string;
  title: string;
  blurb: string;
  icon: React.ReactNode;
};

const TOPICS: Topic[] = [
  {
    href: "/guides/study-route",
    title: "Study in the Netherlands",
    blurb:
      "Understand the Dutch university system, degrees, admissions and timelines.",
    icon: <GraduationCapIcon />,
  },
  {
    href: "/guides/working-while-studying",
    title: "Working While Studying",
    blurb:
      "Work hours, BSN, taxes, contracts and what students should avoid.",
    icon: <BriefcaseIcon />,
  },
  {
    href: "/guides/scholarships",
    title: "Scholarships & Funding",
    blurb:
      "Find grants, tuition support, budgeting routes and scholarship deadlines.",
    icon: <WalletIcon />,
  },
  {
    href: "/guides/arrival-checklist",
    title: "Arrival Checklist",
    blurb: "Step-by-step tasks for your first 30 days after landing.",
    icon: <CalendarCheckIcon />,
  },
  {
    href: "/guides/accommodation",
    title: "Accommodation",
    blurb:
      "Housing platforms, red flags, contracts and verified partner options.",
    icon: <HomeIcon />,
  },
  {
    href: "/guides/open-days",
    title: "Open Days & Enrolling",
    blurb:
      "Visit days, application documents, Studielink and enrolment milestones.",
    icon: <BookIcon />,
  },
];

export function PopularTopics() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <span
              className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-medium ring-1 ring-[#03294f]/10"
              style={{ color: NAVY }}
            >
              Most visited decisions
            </span>
            <h2
              className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl"
              style={{ color: NAVY }}
            >
              Our Most Popular <br/>Topics
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed lg:mt-2"
            style={{ color: `${NAVY}80` }}
          >
            Explore the topics students need most before moving to the
            Netherlands. Each topic opens a direct guide with the steps,
            deadlines and checks students usually search for first.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      className="group relative flex min-h-[210px] flex-col justify-between rounded-2xl bg-[#eef1f6] p-6 transition-colors duration-200 hover:bg-[#03294f] hover:shadow-[0_10px_24px_rgba(3,41,79,0.15)]"
    >
      <div className="flex items-start justify-between">
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white text-[#03294f] transition-colors duration-200 group-hover:bg-[#0e3a63] group-hover:text-white">
          {topic.icon}
        </span>
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-[#03294f] transition-colors duration-200 group-hover:bg-[#fd7933] group-hover:text-white">
          <ArrowRightIcon />
        </span>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-bold text-[#03294f] transition-colors duration-200 group-hover:text-white">
          {topic.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#03294f]/50 transition-colors duration-200 group-hover:text-white/70">
          {topic.blurb}
        </p>
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
function CalendarCheckIcon() {
  return (
    <Svg>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M3 11h18" />
      <path d="m9 16 2 2 4-4" />
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
