"use client";

// Membership — status, end date, and the way in to billing.
//
// "Manage billing" opens Stripe's billing portal, which is where a member
// cancels, updates their card and downloads invoices. Cancelling there takes
// effect at the end of the paid period, matching the Cancellation & Refund
// Policy; the change reaches us through the Stripe webhook, not from this page.

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../../auth/AuthProvider";
import { useT } from "../../../i18n/I18nProvider";
import { formatDate } from "@/lib/format";
import { GOLD_LIGHT, NAVY, NAVY_DEEP, PageIntro, Panel } from "../ui";

export default function DashboardMembershipPage() {
  const t = useT();
  const { user } = useAuth();
  const [opening, setOpening] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  async function openBilling() {
    setPortalError(null);
    setOpening(true);

    const res = await fetch("/api/hub-plus/portal", { method: "POST" });
    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.url) {
      setPortalError(data?.error ?? "Could not open billing. Please try again.");
      setOpening(false);
      return;
    }

    // Left disabled through the redirect so a second click can't open a
    // second portal session.
    window.location.assign(data.url);
  }

  const rows: { labelKey: string; value: string }[] = [
    { labelKey: "hubDash.membership.planLabel", value: "Hub Plus" },
    { labelKey: "hubDash.membership.status", value: t("hubDash.membership.active") },
    {
      labelKey: "hubDash.membership.until",
      value: user?.planExpiresAt
        ? formatDate(user.planExpiresAt)
        : t("hubDash.membership.openEnded"),
    },
    { labelKey: "auth.field.email", value: user?.email ?? "" },
  ];

  const links = [
    { href: "/legal", labelKey: "hubDash.membership.legal" },
    { href: "/help-centre", labelKey: "hubDash.membership.support" },
  ];

  return (
    <>
      <PageIntro title={t("hubDash.membership.title")} subtitle={t("hubDash.membership.body")} />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel className="p-6 sm:p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e9faf6] px-3 py-2 text-[11px] font-extrabold text-[#1a6b5e]">
            <span className="size-[7px] rounded-full bg-[#2caa91]" aria-hidden="true" />
            {t("hubDash.status.active")}
          </span>

          <dl className="mt-5 divide-y divide-[#0a2847]/8">
            {rows.map((row) => (
              <div key={row.labelKey} className="flex items-center justify-between gap-4 py-3">
                <dt className="text-xs font-semibold" style={{ color: `${NAVY}99` }}>
                  {t(row.labelKey)}
                </dt>
                <dd className="truncate text-xs font-extrabold" style={{ color: NAVY }}>
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </Panel>

        <article
          className="rounded-3xl p-6 text-white shadow-[0_10px_30px_rgba(6,27,51,0.05)] sm:p-8"
          style={{ background: `linear-gradient(155deg, ${NAVY_DEEP}, #114879)` }}
        >
          <h2 className="text-[17px] font-extrabold tracking-tight">
            {t("hubDash.membership.manage")}
          </h2>
          <p className="mt-2 text-[11px] leading-relaxed text-white/60">
            {t("hubDash.membership.manageBody")}
          </p>
          <div className="mt-5 grid gap-2">
            <button
              type="button"
              onClick={openBilling}
              disabled={opening}
              className="flex items-center justify-between rounded-xl border border-white/12 bg-white/8 px-3.5 py-3 text-[10px] font-semibold transition-colors hover:bg-white/15 disabled:opacity-60"
            >
              <span>{opening ? "…" : t("hubDash.membership.billing")}</span>
              <span aria-hidden="true">→</span>
            </button>

            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center justify-between rounded-xl border border-white/12 bg-white/8 px-3.5 py-3 text-[10px] font-semibold transition-colors hover:bg-white/15"
              >
                <span>{t(l.labelKey)}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
          {portalError && (
            <p className="mt-3 text-[11px] font-semibold text-red-300" role="alert">
              {portalError}
            </p>
          )}

          <Link
            href="/hub-plus"
            className="mt-4 inline-flex items-center text-[11px] font-extrabold"
            style={{ color: GOLD_LIGHT }}
          >
            {t("hubDash.benefits.viewAll")} →
          </Link>
        </article>
      </div>
    </>
  );
}
