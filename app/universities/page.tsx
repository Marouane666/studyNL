"use client";

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";

const BG = "#EAF6FF";
const NAVY = "#092A4D";
const ORANGE = "#fd7933";

type Institution = { name: string; href: string };

const WO_INSTITUTIONS: Institution[] = [
  { name: "University of Amsterdam", href: "https://www.uva.nl/en" },
  { name: "Vrije Universiteit Amsterdam", href: "https://vu.nl/en" },
  { name: "Erasmus University Rotterdam", href: "https://www.eur.nl/en" },
  { name: "Utrecht University", href: "https://www.uu.nl/en" },
  { name: "Leiden University", href: "https://www.universiteitleiden.nl/en" },
  { name: "Delft University of Technology", href: "https://www.tudelft.nl/en" },
  { name: "Eindhoven University of Technology", href: "https://www.tue.nl/en" },
  { name: "University of Groningen", href: "https://www.rug.nl/" },
  { name: "Maastricht University", href: "https://www.maastrichtuniversity.nl/" },
  { name: "Radboud University", href: "https://www.ru.nl/en" },
  { name: "Wageningen University & Research", href: "https://www.wur.nl/en.htm" },
  { name: "Tilburg University", href: "https://www.tilburguniversity.edu/" },
];

const HBO_INSTITUTIONS: Institution[] = [
  { name: "Amsterdam University of Applied Sciences", href: "https://www.amsterdamuas.com/" },
  { name: "The Hague University of Applied Sciences", href: "https://www.thehagueuniversity.com/" },
  { name: "Rotterdam University of Applied Sciences", href: "https://www.rotterdamuas.com/" },
  { name: "Fontys University of Applied Sciences", href: "https://fontys.edu/" },
  { name: "Hanze University of Applied Sciences", href: "https://www.hanze.nl/en" },
  { name: "Saxion University of Applied Sciences", href: "https://www.saxion.edu/" },
  { name: "HAN University of Applied Sciences", href: "https://www.han.nl/en/" },
];

export default function UniversitiesPage() {
  const t = useT();

  return (
    <section style={{ backgroundColor: BG, color: NAVY }}>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <span
          className="inline-flex w-fit items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold"
          style={{ color: NAVY }}
        >
          {t("universities.badge")}
        </span>

        <h1
          className="mt-8 max-w-3xl break-words text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: NAVY }}
        >
          {t("universities.title")}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed" style={{ color: `${NAVY}B3` }}>
          {t("universities.subtitle")}
        </p>

        <div className="mt-8 rounded-2xl border-l-4 bg-white p-6 shadow-[0_2px_10px_rgba(9,42,77,0.05)] sm:p-7" style={{ borderColor: ORANGE }}>
          <h2 className="text-lg font-bold" style={{ color: NAVY }}>
            {t("universities.explainer.title")}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: `${NAVY}CC` }}>
            {t("universities.explainer.body")}
          </p>
          <Link
            href="/guides/study-route"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold hover:underline"
            style={{ color: ORANGE }}
          >
            {t("universities.explainer.link")}
            <ArrowRightIcon />
          </Link>
        </div>

        <InstitutionGroup
          heading={t("universities.wo.heading")}
          note={t("universities.wo.note")}
          items={WO_INSTITUTIONS}
        />

        <InstitutionGroup
          heading={t("universities.hbo.heading")}
          note={t("universities.hbo.note")}
          items={HBO_INSTITUTIONS}
        />

        <p className="mt-10 max-w-2xl text-xs leading-relaxed" style={{ color: `${NAVY}80` }}>
          {t("universities.disclaimer")}
        </p>

        <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-[0_1px_2px_rgba(9,42,77,0.04)] sm:p-10">
          <h2 className="text-xl font-bold" style={{ color: NAVY }}>
            {t("universities.cta.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
            {t("universities.cta.subtitle")}
          </p>
          <Link
            href="/start"
            className="mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {t("universities.cta.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function InstitutionGroup({
  heading,
  note,
  items,
}: {
  heading: string;
  note: string;
  items: Institution[];
}) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold" style={{ color: NAVY }}>
        {heading}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
        {note}
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((inst) => (
          <li key={inst.name}>
            <a
              href={inst.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-semibold shadow-[0_1px_2px_rgba(9,42,77,0.04)] transition-shadow hover:shadow-[0_8px_22px_rgba(9,42,77,0.1)]"
              style={{ color: NAVY }}
            >
              {inst.name}
              <ExternalIcon />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 opacity-50">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
