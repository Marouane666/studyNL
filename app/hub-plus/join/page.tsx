"use client";

// Hub Plus sign-up + checkout.
//
// Payment runs through Stripe Checkout: this form collects the account details
// and the withdrawal consent, then hands off to Stripe's hosted page, which
// collects the card and shows Apple Pay / Google Pay where the device supports
// them. No card details reach this site. Membership is granted by the Stripe
// webhook, never here.
//
// Text comes from the "hubJoin.*" keys in app/i18n/dictionary.ts, with one
// exception: the withdrawal consent sentence stays in English. The checkout
// route stores that exact sentence as the record of consent, and its wording
// is still awaiting legal sign-off (see lib/legal.ts), so it is translated only
// once the wording is final and each translation has been checked.

import Link from "next/link";
import { FormEvent, Fragment, useRef, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useT } from "../../i18n/I18nProvider";
import { useZukoForm } from "../../analytics/zuko";
import { WITHDRAWAL_CONSENT_TEXT } from "@/lib/legal";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

// Every Hub Plus benefit, all shown as included — matching section 1 of the
// Hub Plus Terms (app/legal/policies/hubPlusTerms.ts), as StudyNL requested.
//
// BEFORE LAUNCH: the six templates don't exist in the repo yet, and the Q&A,
// housing, partner, association and ISIC card benefits depend on work and
// partnerships outside this codebase. All of it must be deliverable when this
// page goes live.
const INCLUDED = [
  "hubJoin.inc.discounts",
  "hubJoin.inc.checklist",
  "hubJoin.inc.planning",
  "hubJoin.inc.guides",
  "hubJoin.inc.cv",
  "hubJoin.inc.letters",
  "hubJoin.inc.qa",
  "hubJoin.inc.housing",
  "hubJoin.inc.partners",
  "hubJoin.inc.associations",
  "hubJoin.inc.isic",
];

/**
 * Renders a translated sentence with {placeholders} swapped for elements, so
 * each language can put the links (or the email) wherever its grammar needs.
 */
function fill(text: string, parts: Record<string, React.ReactNode>) {
  return text.split(/\{(\w+)\}/).map((piece, i) =>
    i % 2 === 1 ? <Fragment key={i}>{parts[piece]}</Fragment> : piece,
  );
}

export default function HubPlusJoinPage() {
  const { user, loading } = useAuth();
  const t = useT();
  const formRef = useRef<HTMLFormElement>(null);
  const trackCompletion = useZukoForm("hubPlusCheckout", formRef);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consented, setConsented] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/hub-plus/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // A signed-in visitor is upgraded in place, so the details are only sent
      // when the form actually collected them. `consent` always goes, because
      // the waiver is per purchase — the route records it and refuses without it.
      body: JSON.stringify(
        user ? { consent: consented } : { name, email, password, consent: consented },
      ),
    });
    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.url) {
      setError(data?.error ?? t("hubJoin.error"));
      setSubmitting(false);
      return;
    }

    // Hand off to Stripe's hosted checkout. `submitting` is intentionally left
    // true: the redirect takes a moment, and re-enabling the button would let
    // an impatient click start a second checkout session.
    trackCompletion();
    window.location.assign(data.url);
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-10">
        {/* Home, not /hub-plus: that page belongs to members and would bounce a
            visitor straight back here. */}
        <Link
          href="/"
          className="flex w-fit items-center gap-1.5 text-sm font-bold text-[#092A4D]/60 transition-colors hover:text-[#092A4D]"
        >
          <BackIcon />
          StudyNL
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Plan summary */}
          <div
            className="flex flex-col rounded-3xl p-8 text-white sm:p-10"
            style={{ backgroundColor: NAVY }}
          >
            <span className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
              Hub Plus
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {t("hubJoin.title")}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {t("hubJoin.subtitle")}
            </p>

            <div className="mt-7 flex items-end gap-2">
              <span className="text-4xl font-extrabold">€9,99</span>
              <span className="mb-1 text-sm text-white/60">{t("hubJoin.perMonth")}</span>
            </div>

            <ul className="mt-7 flex flex-col gap-3">
              {INCLUDED.map((key) => (
                <li key={key} className="flex items-start gap-2.5 text-sm text-white/85">
                  <CheckIcon />
                  {t(key)}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-8 text-xs text-white/55">
              <span className="inline-flex items-center gap-1.5"><LockIcon /> {t("hubJoin.secure")}</span>
              {/* Matches the Cancellation & Refund Policy (September 2026):
                  cancel whenever you like, keep access to the end of the month
                  already paid for, and nothing further is charged. */}
              <span>{t("hubJoin.monthly")}</span>
            </div>
          </div>

          {/* Sign-up + payment */}
          <div className="rounded-3xl border border-[#092A4D]/10 bg-white p-8 shadow-[0_2px_14px_rgba(9,42,77,0.06)] sm:p-10">
            {loading ? null : (
              <form ref={formRef} onSubmit={onSubmit}>
                <h2 className="text-lg font-bold" style={{ color: NAVY }}>
                  {t("hubJoin.details")}
                </h2>
                {user ? (
                  <p className="mt-4 rounded-xl bg-[#f6f8fb] px-4 py-3 text-sm" style={{ color: `${NAVY}A6` }}>
                    {fill(t("hubJoin.signedIn"), {
                      email: (
                        <span className="font-bold" style={{ color: NAVY }}>
                          {user.email}
                        </span>
                      ),
                    })}
                  </p>
                ) : (
                  <div className="mt-4 flex flex-col gap-3">
                    <Field
                      label={t("hubJoin.name")}
                      type="text"
                      placeholder={t("hubJoin.namePh")}
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Field
                      label={t("hubJoin.email")}
                      type="email"
                      placeholder="you@email.com"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Field
                      label={t("hubJoin.password")}
                      type="password"
                      placeholder={t("hubJoin.passwordPh")}
                      autoComplete="new-password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                )}

                <h2 className="mt-8 text-lg font-bold" style={{ color: NAVY }}>
                  {t("hubJoin.payment")}
                </h2>

                {/* No card fields and no payment-method picker here on purpose.
                    Stripe's hosted page collects the payment, which is what
                    keeps card details off this server entirely — and it decides
                    which wallets to offer based on the visitor's device, so a
                    picker on this page could only ever disagree with it. */}
                <div className="mt-4 rounded-xl bg-[#f6f8fb] px-4 py-3.5">
                  <p className="text-sm font-semibold" style={{ color: NAVY }}>
                    {t("hubJoin.payMethods")}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed" style={{ color: `${NAVY}99` }}>
                    {t("hubJoin.payNote")}
                  </p>
                </div>

                {/* Unticked by default and required to submit: the withdrawal
                    waiver only holds if the member actively gave it. Kept on its
                    own, separate from agreeing to the terms below, so the
                    consent is specific to immediate delivery. */}
                <label className="mt-8 flex cursor-pointer items-start gap-3 rounded-xl bg-[#f6f8fb] px-4 py-3.5">
                  <input
                    type="checkbox"
                    required
                    checked={consented}
                    onChange={(e) => setConsented(e.target.checked)}
                    className="mt-0.5 size-4 shrink-0 accent-[#fd7933]"
                  />
                  <span className="text-xs leading-relaxed" style={{ color: `${NAVY}A6` }}>
                    {WITHDRAWAL_CONSENT_TEXT}
                  </span>
                </label>

                {error && (
                  <p className="mt-4 text-sm font-semibold text-red-600" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting || !consented}
                  className="mt-6 flex w-full items-center justify-center rounded-full py-4 text-base font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: ORANGE }}
                >
                  {submitting ? t("hubJoin.submitting") : t("hubJoin.submit")}
                </button>
                {/* Pre-contract information: EU rules expect the cancellation
                    and withdrawal terms to be reachable before paying, not only
                    afterwards, so the refund policy is linked here too. */}
                <p className="mt-3 text-center text-xs leading-relaxed text-[#092A4D]/50">
                  {fill(t("hubJoin.agree"), {
                    terms: (
                      <Link href="/legal/hub-plus-terms" className="underline">
                        {t("hubJoin.terms")}
                      </Link>
                    ),
                    refund: (
                      <Link href="/legal/hub-plus-cancellation" className="underline">
                        {t("hubJoin.refund")}
                      </Link>
                    ),
                    privacy: (
                      <Link href="/legal#privacy" className="underline">
                        {t("hubJoin.privacy")}
                      </Link>
                    ),
                  })}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold" style={{ color: `${NAVY}A6` }}>
        {label}
      </span>
      <input
        {...props}
        className="rounded-xl border border-[#092A4D]/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#fd7933] focus:ring-2 focus:ring-[#fd7933]/20"
      />
    </label>
  );
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

