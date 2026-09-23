"use client";

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";
import { COMPANY } from "@/lib/legal";
import { hasAnalytics } from "@/lib/siteConfig";
import { openConsentSettings } from "../analytics/consent";

const NAVY = "#03294f";

type LinkItem = { href: string; tKey: string };

const COLUMNS: LinkItem[][] = [
  [
    { href: "/guides/study-route", tKey: "footer.l.studyNL" },
    { href: "/guides/scholarships", tKey: "footer.l.scholarships" },
    { href: "/guides/cost-of-living", tKey: "footer.l.cost" },
    { href: "/guides/working-while-studying", tKey: "footer.l.work" },
  ],
  [
    { href: "/guides/arrival-checklist", tKey: "footer.l.arrival" },
    { href: "/guides/enrolment", tKey: "footer.l.enrolment" },
    { href: "/hub-plus", tKey: "footer.l.hubPlus" },
    { href: "/forum", tKey: "footer.l.forum" },
  ],
  [
    { href: "/universities", tKey: "footer.l.universities" },
    { href: "/guides/student-associations", tKey: "footer.l.fraternities" },
    { href: "/guides/visa-residency", tKey: "footer.l.visa" },
    { href: "/guides/avoid-scams", tKey: "footer.l.scams" },
  ],
  [
    { href: "/cities", tKey: "footer.l.cities" },
    { href: "/guides/student-finance", tKey: "footer.l.finance" },
    { href: "/guides/accommodation", tKey: "footer.l.accommodation" },
    { href: "/partners", tKey: "footer.l.partners" },
  ],
  [
    { href: "/about", tKey: "footer.l.about" },
    { href: "/contact", tKey: "footer.l.contact" },
    { href: "/legal", tKey: "footer.l.legal" },
    { href: "/help-centre", tKey: "footer.l.help" },
  ],
];

// Kept out of the columns above and given their own row beside the copyright:
// that's where people look for policies, it stays reachable from every page as
// consumer rules expect, and it leaves the five topic columns evenly balanced.
const LEGAL_LINKS: LinkItem[] = [
  { href: "/legal/terms", tKey: "footer.legal.terms" },
  { href: "/legal/hub-plus-terms", tKey: "footer.legal.hubPlusTerms" },
  { href: "/legal/hub-plus-cancellation", tKey: "footer.legal.cancellation" },
  { href: "/legal#privacy", tKey: "footer.legal.privacy" },
];

export function Footer() {
  const t = useT();
  return (
    <footer
      style={{
        background: "linear-gradient(90deg, #F8BBA4 0%, #EAF6FF 100%)",
        color: NAVY,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_repeat(5,minmax(0,1fr))]">
          <div>
            <Link href="/" className="flex flex-col leading-none">
              <span className="text-2xl font-bold tracking-tight">
                <span style={{ color: NAVY }}>Study</span>
                <span className="text-[#fd7933]">NL</span>
              </span>
              <span
                className="mt-1.5 text-[10px] font-medium tracking-[0.15em]"
                style={{ color: `${NAVY}A6` }}
              >
                POWERED BY GRADUATES <span className="font-bold">FOR STUDENTS</span>
              </span>
            </Link>
          </div>

          {COLUMNS.map((col, i) => (
            <ul key={i} className="space-y-3">
              {col.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-bold transition-opacity hover:opacity-70"
                    style={{ color: NAVY }}
                  >
                    {t(item.tKey)}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div
          className="mt-14 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: `${NAVY}1f` }}
        >
          {/* Not translated, and deliberately so: a company name, a KVK number
              and a year read the same in every language, and this doubles as the
              trader identification EU rules expect a seller to publish.
              The year is computed rather than written down — the old string said
              2035, which is the failure mode of hardcoding it. */}
          <p className="text-xs" style={{ color: `${NAVY}A6` }} suppressHydrationWarning>
            © {new Date().getFullYear()} {COMPANY.legalName} · KVK{" "}
            {COMPANY.registrationNumber} · {COMPANY.registeredAddress}
          </p>

          <nav aria-label={t("footer.l.legal")}>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs font-semibold transition-opacity hover:opacity-70"
                    style={{ color: `${NAVY}CC` }}
                  >
                    {t(item.tKey)}
                  </Link>
                </li>
              ))}
              {/* Withdrawing consent has to be as easy as giving it. */}
              {hasAnalytics() && (
                <li>
                  <button
                    type="button"
                    onClick={openConsentSettings}
                    className="text-xs font-semibold transition-opacity hover:opacity-70"
                    style={{ color: `${NAVY}CC` }}
                  >
                    {t("cookies.settings")}
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
