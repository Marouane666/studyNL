"use client";

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";

const NAVY = "#03294f";

type Topic = {
  href: string;
  titleKey: string;
  blurbKey: string;
  icon: React.ReactNode;
};

const TOPICS: Topic[] = [
  {
    href: "/guides/study-route",
    titleKey: "popular.t1.title",
    blurbKey: "popular.t1.blurb",
    icon: <GraduationCapIcon />,
  },
  {
    href: "/guides/working-while-studying",
    titleKey: "popular.t2.title",
    blurbKey: "popular.t2.blurb",
    icon: <BriefcaseIcon />,
  },
  {
    href: "/guides/scholarships",
    titleKey: "popular.t3.title",
    blurbKey: "popular.t3.blurb",
    icon: <WalletIcon />,
  },
  {
    href: "/guides/arrival-checklist",
    titleKey: "popular.t4.title",
    blurbKey: "popular.t4.blurb",
    icon: <CalendarCheckIcon />,
  },
  {
    href: "/guides/accommodation",
    titleKey: "popular.t5.title",
    blurbKey: "popular.t5.blurb",
    icon: <HomeIcon />,
  },
  {
    href: "/guides/open-days",
    titleKey: "popular.t6.title",
    blurbKey: "popular.t6.blurb",
    icon: <BookIcon />,
  },
];

export function PopularTopics() {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <span
              className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-medium ring-1 ring-[#03294f]/10"
              style={{ color: NAVY }}
            >
              {t("popular.badge")}
            </span>
            <h2
              className="mt-5 break-words text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight"
              style={{ color: NAVY }}
            >
              {t("popular.title_line1")} {t("popular.title_line2")}
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed lg:mt-2"
            style={{ color: `${NAVY}A6` }}
          >
            {t("popular.subtitle")}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => (
            <TopicCard key={topic.href} topic={topic} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TopicCard({ topic }: { topic: Topic }) {
  const t = useT();
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
        <h3 className="break-words text-lg font-bold leading-snug text-[#03294f] transition-colors duration-200 group-hover:text-white">
          {t(topic.titleKey)}
        </h3>
        <p className="mt-2 break-words text-sm leading-relaxed text-[#03294f]/50 transition-colors duration-200 group-hover:text-white/70">
          {t(topic.blurbKey)}
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
