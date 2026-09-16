"use client";

// Renders one policy document from app/legal/policies.
//
// English only, deliberately, and the page says so: these are the operative
// legal texts and an unreviewed translation would amount to a second contract
// with different wording. Same position the /legal index already takes.

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { POLICIES, getPolicy, isParagraph } from "../policies";
import type { PolicySection } from "../policies";

const BG = "#EAF6FF";
const NAVY = "#092A4D";
const ORANGE = "#fd7933";

export default function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const policy = getPolicy(slug);
  if (!policy) notFound();

  const others = POLICIES.filter((p) => p.slug !== policy.slug);

  return (
    <section style={{ backgroundColor: BG, color: NAVY }}>
      <div className="mx-auto max-w-3xl px-6 pb-16 pt-10">
        <Link
          href="/legal"
          className="flex w-fit items-center gap-1.5 text-sm font-bold text-[#092A4D]/60 transition-colors hover:text-[#092A4D]"
        >
          <BackIcon />
          Legal
        </Link>

        <h1
          className="mt-8 break-words text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold leading-[1.07] tracking-tight"
          style={{ color: NAVY }}
        >
          {policy.title}
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed" style={{ color: `${NAVY}B3` }}>
          {policy.summary}
        </p>

        <p className="mt-4 text-xs font-bold uppercase tracking-wide" style={{ color: `${NAVY}80` }}>
          Last updated: {policy.lastUpdated}
        </p>

        <p className="mt-4 max-w-2xl text-xs leading-relaxed" style={{ color: `${NAVY}80` }}>
          This document is provided in English only, regardless of your site language setting.
        </p>

        <article className="mt-9 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)] sm:p-8">
          <Blocks blocks={policy.intro} />

          {policy.sections.map((section) => (
            <SectionBlock key={section.heading ?? section.blocks.length} section={section} />
          ))}
        </article>

        {others.length > 0 && (
          <>
            <h2 className="mt-12 text-lg font-bold" style={{ color: NAVY }}>
              Related documents
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/legal/${p.slug}`}
                  className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(9,42,77,0.04)] transition-shadow hover:shadow-[0_10px_28px_rgba(9,42,77,0.12)]"
                >
                  <h3 className="text-sm font-bold leading-snug" style={{ color: NAVY }}>
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed" style={{ color: `${NAVY}99` }}>
                    {p.summary}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function SectionBlock({ section }: { section: PolicySection }) {
  return (
    <div className="mt-7">
      {section.heading && (
        <h2 className="text-base font-bold" style={{ color: NAVY }}>
          {section.heading}
        </h2>
      )}
      <Blocks blocks={section.blocks} className={section.heading ? "mt-3" : undefined} />
    </div>
  );
}

function Blocks({
  blocks,
  className = "",
}: {
  blocks: PolicySection["blocks"];
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-3 text-sm leading-relaxed ${className}`}
      style={{ color: `${NAVY}CC` }}
    >
      {blocks.map((block, i) =>
        isParagraph(block) ? (
          <p key={i}>{block.p}</p>
        ) : (
          <ul key={i} className="flex flex-col gap-2">
            {block.ul.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: ORANGE }}
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

function BackIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
