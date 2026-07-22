"use client";

import Link from "next/link";
import { useT } from "../i18n/I18nProvider";

const BG = "#EAF6FF";
const NAVY = "#092A4D";
const ORANGE = "#fd7933";
const LAST_UPDATED = "16 July 2026";
const CONTACT_EMAIL = "contact@study-nl.com";

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

        <div className="mt-6 flex flex-wrap gap-2 text-sm font-bold" style={{ color: ORANGE }}>
          <a href="#privacy" className="hover:underline">
            {t("legalPage.nav.privacy")}
          </a>
          <span style={{ color: `${NAVY}40` }}>·</span>
          <a href="#terms" className="hover:underline">
            {t("legalPage.nav.terms")}
          </a>
        </div>

        <p className="mt-4 max-w-2xl text-xs leading-relaxed" style={{ color: `${NAVY}80` }}>
          This page is provided in English only, regardless of your site language setting, and is
          written as a good-faith standard policy reflecting how this website actually works today.
          It is not a substitute for review by qualified legal counsel before commercial launch. Last
          updated {LAST_UPDATED}.
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

        <article id="terms" className="mt-8 scroll-mt-24 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)] sm:p-8">
          <h2 className="text-2xl font-bold" style={{ color: NAVY }}>
            Terms of Service
          </h2>

          <Prose>
            <h3>What StudyNL is, and isn&rsquo;t</h3>
            <p>
              StudyNL publishes general information, guides and a community forum for students
              considering or currently studying in the Netherlands. We are an independent
              information service. We are not a government body, university, immigration authority
              or regulated financial or legal adviser, and nothing on this site is legal,
              immigration, tax or financial advice. Always confirm time-sensitive requirements, 
              deadlines, fees, visa rules, eligibility, with the official source linked in each
              guide, or with a qualified professional.
            </p>

            <h3>Using the forum</h3>
            <p>
              You&rsquo;re responsible for what you post. When you use the community forum, you
              agree not to post content that is illegal, harassing, hateful, sexually explicit, a
              scam, or spam, and not to impersonate another person or organisation. You keep
              ownership of what you write, but by posting you give us a licence to display it on the
              site (and, if you delete a post, we will remove it from public view).
            </p>
            <p>
              Moderators and administrators may hide or remove content, and may suspend or delete
              accounts, where they reasonably believe these terms have been broken. We aim to be
              proportionate, but we do not promise a particular moderation outcome or timeline.
            </p>

            <h3>Accounts</h3>
            <p>
              You&rsquo;re responsible for keeping your password confidential and for activity that
              happens under your account. Tell us if you believe your account has been compromised.
            </p>

            <h3>No guarantee of outcomes</h3>
            <p>
              Guides, checklists and the planning tool on this site are intended to help you
              organise your own research. They do not guarantee admission, a visa or residence
              permit outcome, funding, or housing, and they are not a substitute for your
              institution&rsquo;s or the relevant authority&rsquo;s own instructions.
            </p>

            <h3>Liability</h3>
            <p>
              To the fullest extent permitted by law, StudyNL is not liable for losses arising from
              your reliance on information found on this site, or from content posted by other
              users. Nothing in these terms limits liability that cannot be limited by law.
            </p>

            <h3>Changes and termination</h3>
            <p>
              We may update these terms as the service changes, and we&rsquo;ll update the
              &ldquo;last updated&rdquo; date when we do. We may suspend or discontinue any part of
              the service, including the forum, at our discretion.
            </p>

            <h3>Governing law</h3>
            <p>
              These terms are intended to be governed by the laws of the Netherlands, without
              prejudice to any mandatory consumer-protection rights you may have in your country of
              residence.
            </p>

            <h3>Contact</h3>
            <p>
              Questions about these terms or our privacy practices can be sent to{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
                {CONTACT_EMAIL}
              </a>{" "}
              or via our <Link href="/contact" className="font-semibold underline">contact page</Link>.
            </p>
          </Prose>
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
