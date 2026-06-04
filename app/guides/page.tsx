"use client";

import Link from "next/link";
import { useState } from "react";

const BG = "#EAF6FF";
const TEXT = "#092A4D";

type Guide = {
  href: string;
  category: string;
  tab: string;
  title: string;
  blurb: string;
};

const TABS = [
  "Before applying",
  "Money",
  "Housing",
  "Legal",
  "Arrival",
  "Student life",
] as const;

const GUIDES: Guide[] = [
  {
    href: "/guides/study-route",
    category: "Start",
    tab: "Before applying",
    title: "Study in the Netherlands",
    blurb: "Dutch university system, degrees, admissions and timelines.",
  },
  {
    href: "/guides/scholarships",
    category: "Money",
    tab: "Money",
    title: "Scholarships & Funding",
    blurb: "Funding routes, tuition support and deadlines.",
  },
  {
    href: "/guides/cost-of-living",
    category: "Budget",
    tab: "Money",
    title: "Cost of living",
    blurb: "Monthly costs by city, tuition and transport planning.",
  },
  {
    href: "/guides/working-while-studying",
    category: "Work",
    tab: "Student life",
    title: "Working while studying",
    blurb: "Contracts, taxes, BSN and permitted student work.",
  },
  {
    href: "/guides/arrival-checklist",
    category: "Arrival",
    tab: "Arrival",
    title: "Arrival checklist",
    blurb: "Tasks for your first month in the Netherlands.",
  },
  {
    href: "/guides/enrolment",
    category: "Admissions",
    tab: "Before applying",
    title: "Enrolment",
    blurb: "Documents, Studielink and enrolment milestones.",
  },
  {
    href: "/guides/accommodation",
    category: "Housing",
    tab: "Housing",
    title: "Accommodation",
    blurb: "Find housing and avoid unsafe rental situations.",
  },
  {
    href: "/guides/visa-residency",
    category: "Legal",
    tab: "Legal",
    title: "Visa & residency",
    blurb: "Residence permits, MVV basics and document order.",
  },
  {
    href: "/guides/avoid-scams",
    category: "Safety",
    tab: "Housing",
    title: "Avoid scams",
    blurb: "Spot rental scams and unsafe payment requests.",
  },
];

export default function GuidesPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const visibleGuides = activeTab
    ? GUIDES.filter((g) => g.tab === activeTab)
    : GUIDES;

  return (
    <section style={{ backgroundColor: BG, color: TEXT }}>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col gap-2">
          <span
            className="inline-flex w-fit items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold"
            style={{ color: TEXT }}
          >
            Guides Page
          </span>
          <span
            className="inline-flex w-fit items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold"
            style={{ color: TEXT }}
          >
            Guides
          </span>
        </div>

        <h1
          className="mt-8 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
          style={{ color: TEXT }}
        >
          Everything students look for before moving.
        </h1>

        <p
          className="mt-6 max-w-xl text-base leading-relaxed"
          style={{ color: `${TEXT}B3` }}
        >
          Searchable guide library for applications, money, housing, legal
          tasks, arrival and student life.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(isActive ? null : tab)}
                className="text-sm font-bold transition-opacity"
                style={{
                  color: TEXT,
                  opacity: isActive || activeTab === null ? 1 : 0.45,
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleGuides.map((guide) => (
            <GuideCard key={guide.href} guide={guide} />
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
      className="group flex min-h-[180px] flex-col rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)] transition-shadow duration-200 hover:shadow-[0_10px_28px_rgba(9,42,77,0.12)]"
    >
      <span
        className="inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ring-[#092A4D]/10"
        style={{ color: TEXT }}
      >
        {guide.category}
      </span>

      <h3
        className="mt-5 text-lg font-bold leading-snug"
        style={{ color: TEXT }}
      >
        {guide.title}
      </h3>

      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: `${TEXT}99` }}
      >
        {guide.blurb}
      </p>
    </Link>
  );
}
