"use client";

// Community. The forum is a full page of the public site with its own layout,
// so this introduces it and hands over rather than trying to embed it.

import Link from "next/link";
import { useT } from "../../../i18n/I18nProvider";
import { NAVY, NAVY_DEEP, ORANGE, PageIntro, Panel } from "../ui";

export default function DashboardCommunityPage() {
  const t = useT();

  return (
    <>
      <PageIntro title={t("hubDash.nav.community")} subtitle={t("hubDash.community.subtitle")} />

      <article
        className="overflow-hidden rounded-3xl px-7 py-9 text-white shadow-[0_18px_55px_rgba(6,27,51,0.13)] sm:px-10"
        style={{
          background: `radial-gradient(circle at 88% 20%, rgba(157,230,223,.16), transparent 45%), linear-gradient(115deg, ${NAVY_DEEP} 30%, #0d3a68 100%)`,
        }}
      >
        <h2 className="max-w-lg text-[clamp(1.3rem,2.5vw,1.9rem)] font-extrabold leading-tight tracking-tight">
          {t("forum.title")}
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
          {t("hubDash.community.body")}
        </p>
        <Link
          href="/forum"
          className="mt-6 inline-flex min-h-11 items-center rounded-2xl px-5 text-xs font-extrabold text-white shadow-[0_10px_22px_rgba(255,113,55,0.25)] transition-opacity hover:opacity-90"
          style={{ backgroundColor: ORANGE }}
        >
          {t("hubDash.community.cta")} →
        </Link>
      </article>

      <Panel className="mt-4 p-6 sm:p-8">
        <h2 className="text-[17px] font-extrabold tracking-tight" style={{ color: NAVY }}>
          {t("hubDash.community.associationsTitle")}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
          {t("hubDash.community.associationsBody")}
        </p>
        <Link
          href="/guides/student-associations"
          className="mt-5 inline-flex items-center text-xs font-extrabold hover:underline"
          style={{ color: ORANGE }}
        >
          {t("hubDash.community.associationsCta")} →
        </Link>
      </Panel>
    </>
  );
}
