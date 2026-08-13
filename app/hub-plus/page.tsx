"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { IconType } from "react-icons";
import {
  FaBed,
  FaBook,
  FaCar,
  FaDumbbell,
  FaGraduationCap,
  FaLandmark,
  FaLaptop,
  FaMobileAlt,
  FaPlane,
  FaShieldAlt,
  FaShoppingBag,
  FaSpa,
  FaTicketAlt,
  FaTrain,
  FaUtensils,
} from "react-icons/fa";
import { useT } from "../i18n/I18nProvider";
import { useAuth } from "../auth/AuthProvider";
import { isPremium } from "@/lib/plan";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

const ISIC_DISCOUNTS_URL = "https://www.isic.org/discounts/";

type Feature = {
  titleKey: string;
  blurbKey: string;
};

const FEATURES: Feature[] = [
  { titleKey: "hubplus.f1.title", blurbKey: "hubplus.f1.blurb" },
  { titleKey: "hubplus.f2.title", blurbKey: "hubplus.f2.blurb" },
  { titleKey: "hubplus.f3.title", blurbKey: "hubplus.f3.blurb" },
];

// The ISIC network's discount categories rather than individual partner offers:
// the live offers rotate per country and per partner, so naming a brand and a
// percentage here would go stale (and be wrong for most visitors) the moment it
// shipped. Each tile deep-links to ISIC, which is authoritative for live deals.
const ISIC_CATEGORIES: { key: string; Icon: IconType }[] = [
  { key: "hubplus.isic.d.travel", Icon: FaPlane },
  { key: "hubplus.isic.d.transport", Icon: FaTrain },
  { key: "hubplus.isic.d.accommodation", Icon: FaBed },
  { key: "hubplus.isic.d.carRental", Icon: FaCar },
  { key: "hubplus.isic.d.shopping", Icon: FaShoppingBag },
  { key: "hubplus.isic.d.food", Icon: FaUtensils },
  { key: "hubplus.isic.d.entertainment", Icon: FaTicketAlt },
  { key: "hubplus.isic.d.technology", Icon: FaLaptop },
  { key: "hubplus.isic.d.mobile", Icon: FaMobileAlt },
  { key: "hubplus.isic.d.culture", Icon: FaLandmark },
  { key: "hubplus.isic.d.sport", Icon: FaDumbbell },
  { key: "hubplus.isic.d.books", Icon: FaBook },
  { key: "hubplus.isic.d.courses", Icon: FaGraduationCap },
  { key: "hubplus.isic.d.insurance", Icon: FaShieldAlt },
  { key: "hubplus.isic.d.wellbeing", Icon: FaSpa },
];

export default function HubPlusPage() {
  const t = useT();
  const router = useRouter();
  const { user, loading } = useAuth();
  const premium = isPremium(user);

  // Hub Plus is the members' page. Anyone without a live membership is sent to
  // checkout rather than shown the member content, so the nav item is a direct
  // route to the offer for everyone who hasn't joined yet.
  useEffect(() => {
    if (!loading && !premium) router.replace("/hub-plus/join");
  }, [loading, premium, router]);

  if (loading || !premium) return null;

  const firstName = user?.displayName?.trim().split(/\s+/)[0] ?? "";

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <span
          className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold ring-1 ring-[#092A4D]/10"
          style={{ color: NAVY }}
        >
          {t("hubplus.badge")}
        </span>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              className="break-words text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold leading-tight tracking-tight"
              style={{ color: NAVY }}
            >
              {t("hubplus.hi")} {firstName} 👋
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
              {t("hubplus.memberSubtitle")}
            </p>
          </div>
          <Link
            href="/hub-plus/dashboard"
            className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {t("hubplus.openDashboard")}
          </Link>
        </div>

        <div
          className="mt-8 rounded-3xl px-10 py-10 sm:px-16 sm:py-12"
          style={{ backgroundColor: NAVY }}
        >
          <h1 className="max-w-3xl break-words text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-white">
            {t("hubplus.title")}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">
            {t("hubplus.subtitle")}
          </p>

          <Link
            href="/hub-plus/dashboard"
            className="mt-8 inline-flex items-center rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {t("hubplus.openDashboard")}
          </Link>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <FeatureCard key={f.titleKey} feature={f} />
            ))}
          </div>
        </div>

        <div className="mt-12 max-w-3xl">
          <h2
            className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-tight tracking-tight"
            style={{ color: NAVY }}
          >
            {t("hubplus.everything.title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: `${NAVY}B3` }}>
            {t("hubplus.everything.p1")}
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: `${NAVY}B3` }}>
            {t("hubplus.everything.p2")}
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-[#f6f8fb] p-8 sm:p-10">
          <Eyebrow>{t("hubplus.frat.eyebrow")}</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl" style={{ color: NAVY }}>
            {t("hubplus.frat.title")}
          </h2>
          <div className="mt-5 flex max-w-3xl flex-col gap-4 text-sm leading-relaxed sm:text-base" style={{ color: `${NAVY}B3` }}>
            <p>{t("hubplus.frat.p1")}</p>
            <p>{t("hubplus.frat.p2")}</p>
            <p>{t("hubplus.frat.p3")}</p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-[#f6f8fb] p-8 sm:p-10">
          <Eyebrow>{t("hubplus.isic.eyebrow")}</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl" style={{ color: NAVY }}>
            {t("hubplus.isic.title")}
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed sm:text-base" style={{ color: `${NAVY}B3` }}>
            {t("hubplus.isic.p1")}
          </p>

          <h3 className="mt-8 text-sm font-bold uppercase tracking-wide" style={{ color: NAVY }}>
            {t("hubplus.isic.discountsTitle")}
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {ISIC_CATEGORIES.map(({ key, Icon }) => (
              <li key={key}>
                <a
                  href={ISIC_DISCOUNTS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs font-semibold ring-1 ring-[#092A4D]/8 transition-shadow hover:ring-[#fd7933]/40 hover:shadow-[0_2px_10px_rgba(9,42,77,0.08)]"
                  style={{ color: NAVY }}
                >
                  <Icon size={14} className="shrink-0" style={{ color: ORANGE }} aria-hidden="true" />
                  <span className="leading-snug">{t(key)}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed" style={{ color: `${NAVY}80` }}>
            {t("hubplus.isic.discountsNote")}
          </p>
          <a
            href={ISIC_DISCOUNTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold underline decoration-2 underline-offset-4"
            style={{ color: ORANGE }}
          >
            {t("hubplus.isic.browse")}
            <ExternalIcon />
          </a>
        </div>

        <div className="mt-8 rounded-2xl bg-[#f6f8fb] p-8 text-center sm:p-10">
          <h2 className="text-xl font-bold" style={{ color: NAVY }}>
            {t("hubplus.cta.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
            {t("hubplus.cta.subtitle")}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            {t("hubplus.cta.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ring-[#092A4D]/10"
      style={{ color: ORANGE }}
    >
      {children}
    </span>
  );
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const t = useT();
  return (
    <div className="flex min-h-[130px] flex-col justify-start rounded-2xl bg-white px-6 py-6">
      <h3
        className="text-lg font-bold leading-snug"
        style={{ color: NAVY }}
      >
        {t(feature.titleKey)}
      </h3>
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: `${NAVY}99` }}
      >
        {t(feature.blurbKey)}
      </p>
    </div>
  );
}
