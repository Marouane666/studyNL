"use client";

// Resources — the full guide catalogue as the member's library. It reads from
// the same GUIDES source as /guides, so a new guide appears here automatically.

import Link from "next/link";
import { useT } from "../../../i18n/I18nProvider";
import { GUIDES } from "../../../guides/guides";
import { NAVY, ORANGE, PageIntro, Panel } from "../ui";

export default function DashboardResourcesPage() {
  const t = useT();

  return (
    <>
      <PageIntro title={t("hubDash.nav.resources")} subtitle={t("hubDash.resources.subtitle")} />

      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {GUIDES.map((guide) => (
          <li key={guide.slug}>
            <Link href={`/guides/${guide.slug}`} className="block h-full">
              <Panel className="flex h-full flex-col p-5 transition-shadow hover:shadow-[0_14px_36px_rgba(6,27,51,0.10)]">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="grid size-9 place-items-center rounded-xl text-[10px] font-extrabold"
                    style={{ color: ORANGE, backgroundColor: "#ffe6da" }}
                    aria-hidden="true"
                  >
                    {t("hubDash.library.tag")}
                  </span>
                  <span className="rounded-full bg-[#eef5fb] px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-wide text-[#54718c]">
                    {t(guide.catKey)}
                  </span>
                </div>
                <h2 className="mt-4 text-[15px] font-extrabold" style={{ color: NAVY }}>
                  {t(guide.titleKey)}
                </h2>
                <p className="mt-1.5 text-[11px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                  {t(guide.blurbKey)}
                </p>
                <span
                  className="mt-auto flex items-center justify-between pt-4 text-[11px] font-extrabold"
                  style={{ color: NAVY }}
                >
                  {t("hubDash.library.open")}
                  <span style={{ color: ORANGE }} aria-hidden="true">
                    →
                  </span>
                </span>
              </Panel>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
