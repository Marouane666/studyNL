"use client";

// Priority support. The delivery model (channel, service hours, response time)
// is still to be confirmed with the client, so this routes to the existing
// contact form and says plainly what isn't settled yet rather than promising a
// response time the team hasn't agreed to.

import Link from "next/link";
import { useT } from "../../../i18n/I18nProvider";
import { NAVY, ORANGE, PageIntro, Panel } from "../ui";

export default function DashboardSupportPage() {
  const t = useT();

  return (
    <>
      <PageIntro title={t("hubDash.nav.support")} subtitle={t("hubDash.support.subtitle")} />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel className="flex flex-col p-6 sm:p-8">
          <span
            className="grid size-11 place-items-center rounded-2xl text-lg text-white"
            style={{ background: "linear-gradient(145deg, #0d3a68, #1d5d91)" }}
            aria-hidden="true"
          >
            ?
          </span>
          <h2 className="mt-4 text-[17px] font-extrabold tracking-tight" style={{ color: NAVY }}>
            {t("hubDash.benefit.qa.title")}
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
            {t("hubDash.benefit.qa.body")}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex w-fit items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {t("hubDash.benefit.qa.cta")}
          </Link>
          <p className="mt-4 text-xs leading-relaxed" style={{ color: `${NAVY}80` }}>
            {t("hubDash.benefits.note")}
          </p>
        </Panel>

        <Panel className="flex flex-col p-6 sm:p-8">
          <h2 className="text-[17px] font-extrabold tracking-tight" style={{ color: NAVY }}>
            {t("hubDash.support.selfServe")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
            {t("hubDash.support.selfServeBody")}
          </p>
          <div className="mt-5 grid gap-2">
            <Link
              href="/help-centre"
              className="flex items-center justify-between rounded-2xl bg-[#f6f9fc] px-4 py-3 text-xs font-extrabold transition-colors hover:bg-[#eef4fa]"
              style={{ color: NAVY }}
            >
              {t("hubDash.support.helpCentre")}
              <span style={{ color: ORANGE }} aria-hidden="true">
                →
              </span>
            </Link>
            <Link
              href="/hub-plus/dashboard/community"
              className="flex items-center justify-between rounded-2xl bg-[#f6f9fc] px-4 py-3 text-xs font-extrabold transition-colors hover:bg-[#eef4fa]"
              style={{ color: NAVY }}
            >
              {t("hubDash.nav.community")}
              <span style={{ color: ORANGE }} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </Panel>
      </div>
    </>
  );
}
