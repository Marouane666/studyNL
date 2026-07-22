"use client";

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";

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

        <p
          className="mt-14 text-xs"
          style={{ color: `${NAVY}A6` }}
        >
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
