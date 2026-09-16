"use client";

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";
import { CONTACT_EMAIL, PRIVACY_LAST_UPDATED as LAST_UPDATED } from "@/lib/legal";
import { POLICIES } from "./policies";

const BG = "#EAF6FF";
const NAVY = "#092A4D";
const ORANGE = "#fd7933";

export default function LegalPage() {
  const t = useT();

  return (
    <section style={{ backgroundColor: BG, color: NAVY }}>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <span
          className="inline-flex w-fit items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold"
          style={{ color: NAVY }}
        >
          {t("legalPage.badge")}
        </span>

        <h1
          className="mt-8 max-w-2xl break-words text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: NAVY }}
        >
          {t("legalPage.title")}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: `${NAVY}B3` }}>
          {t("legalPage.subtitle")}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {POLICIES.map((policy) => (
            <Link
              key={policy.slug}
              href={`/legal/${policy.slug}`}
              className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(9,42,77,0.04)] transition-shadow hover:shadow-[0_10px_28px_rgba(9,42,77,0.12)]"
            >
              <h2 className="text-sm font-bold leading-snug" style={{ color: NAVY }}>
                {policy.title}
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed" style={{ color: `${NAVY}99` }}>
                {policy.summary}
              </p>
              <span className="mt-3 text-xs font-bold" style={{ color: ORANGE }}>
                Read →
              </span>
            </Link>
          ))}

          <a
            href="#privacy"
            className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(9,42,77,0.04)] transition-shadow hover:shadow-[0_10px_28px_rgba(9,42,77,0.12)]"
          >
            <h2 className="text-sm font-bold leading-snug" style={{ color: NAVY }}>
              {t("legalPage.nav.privacy")}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed" style={{ color: `${NAVY}99` }}>
              What personal data this website collects, why, and the choices you have.
            </p>
            <span className="mt-3 text-xs font-bold" style={{ color: ORANGE }}>
              Read →
            </span>
          </a>
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed" style={{ color: `${NAVY}80` }}>
          These documents are provided in English only, regardless of your site language setting.
          The Privacy Policy below is written as a good-faith standard policy reflecting how this
          website actually works today, and is not a substitute for review by qualified legal
          counsel before commercial launch. Privacy Policy last updated {LAST_UPDATED}.
        </p>

        <article id="privacy" className="mt-12 scroll-mt-24 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)] sm:p-8">
          <h2 className="text-2xl font-bold" style={{ color: NAVY }}>
            Privacy Policy
          </h2>

          <Prose>
            <p>
              StudyNL (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides guides, a community forum and
              planning tools for students moving to and studying in the Netherlands. This policy
              explains what personal data we collect through this website, why, and what choices
              you have.
            </p>

            <h3>What we collect</h3>
            <ul>
              <li>
                <strong>Account details:</strong> if you sign up for the community forum, we store
                your email address, a hashed password, and the display name you choose.
              </li>
              <li>
                <strong>Content you post:</strong> forum posts, comments and likes are stored
                against your account and are visible to other visitors unless a moderator hides
                them.
              </li>
              <li>
                <strong>Contact form submissions:</strong> if you use our contact form, we store the
                name, email address and message you submit so we can reply to you.
              </li>
              <li>
                <strong>Session cookies:</strong> if you log in, we set two httpOnly cookies to keep
                you signed in. These aren&rsquo;t used for advertising or cross-site tracking.
              </li>
              <li>
                <strong>Language preference:</strong> your chosen site language is saved in your
                browser&rsquo;s local storage so we can remember it on your next visit.
              </li>
            </ul>
            <p>
              We do not currently use third-party advertising trackers, analytics pixels or
              marketing cookies on this website.
            </p>

            <h3>Why we process this data</h3>
            <p>
              We process account and content data to operate the forum (performing our contract
              with you as a registered member), and contact form data to respond to your enquiry
              (our legitimate interest in providing support, or steps taken at your request before
              entering into a relationship with you).
            </p>

            <h3>Who can see it</h3>
            <p>
              Forum posts and comments are visible to other visitors by default. Site moderators and
              administrators can additionally view hidden content and basic account details (display
              name, email, role) in order to moderate the community. We do not sell personal data to
              third parties.
            </p>

            <h3>How long we keep it</h3>
            <p>
              We keep account and content data for as long as your account exists. Contact form
              submissions are kept only as long as needed to handle your enquiry and for a
              reasonable period afterwards for our own records.
            </p>

            <h3>Your rights and choices</h3>
            <ul>
              <li>You can log out at any time from the forum.</li>
              <li>
                You can request a copy of your data, ask us to correct it, or ask us to delete your
                account and associated content by emailing{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </li>
              <li>
                Site administrators can also suspend or delete accounts directly, for example in
                response to a breach of our Terms.
              </li>
            </ul>

            <h3>Changes to this policy</h3>
            <p>
              If we change what we collect or why, for example if we introduce analytics, paid
              services or new integrations, we will update this page and the &ldquo;last
              updated&rdquo; date above.
            </p>
          </Prose>
        </article>

        {/* The short in-page Terms of Service that used to live here has been
            superseded by the full StudyNL Terms & Conditions supplied in
            September 2026 (app/legal/policies/studynlTerms.ts). Two differently
            worded terms documents live on the same site is worse than one, so
            this is now a pointer — the id is kept so existing /legal#terms
            links still land somewhere sensible. */}
        <article id="terms" className="mt-8 scroll-mt-24 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)] sm:p-8">
          <h2 className="text-2xl font-bold" style={{ color: NAVY }}>
            Terms &amp; Conditions
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: `${NAVY}CC` }}>
            Our full terms are published as their own documents, so the version covering your
            situation is easy to find.
          </p>
          <div className="mt-5 flex flex-col gap-2.5">
            {POLICIES.map((policy) => (
              <Link
                key={policy.slug}
                href={`/legal/${policy.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl bg-[#f6f8fb] px-4 py-3 text-sm font-bold transition-colors hover:bg-[#eaf1f8]"
                style={{ color: NAVY }}
              >
                {policy.title}
                <span aria-hidden="true" style={{ color: ORANGE }}>
                  →
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed" style={{ color: `${NAVY}CC` }}>
            Questions about these terms or our privacy practices can be sent to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
              {CONTACT_EMAIL}
            </a>{" "}
            or via our{" "}
            <Link href="/contact" className="font-semibold underline">
              contact page
            </Link>
            .
          </p>
        </article>

      </div>
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="prose-legal mt-4 flex flex-col gap-3 text-sm leading-relaxed [&_h3]:mt-4 [&_h3]:text-base [&_h3]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2"
      style={{ color: `${NAVY}CC` }}
    >
      {children}
    </div>
  );
}
