"use client";

// Hub Plus sign-up + checkout.
//
// Payment runs through Stripe Checkout: this form collects the account details
// and the withdrawal consent, then hands off to Stripe's hosted page, which
// collects the card and shows Apple Pay / Google Pay where the device supports
// them. No card details reach this site. Membership is granted by the Stripe
// webhook, never here.
//
// Text is hardcoded English for review; i18n follows with the final copy.

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { WITHDRAWAL_CONSENT_TEXT } from "@/lib/legal";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

type Method = "applepay" | "wero" | "card";

// What the member can actually use the moment checkout finishes. Everything on
// this list is either already live in the dashboard or a file that ships with
// it — nothing here waits on a partner agreement.
//
// Advertising a benefit that isn't ready is the expensive kind of mistake: it's
// what a refund request, and a misleading-advertising complaint, is built on.
// So anything not yet deliverable belongs in COMING_SOON below, never here.
//
// BEFORE LAUNCH: the six templates are the only entries whose files don't exist
// in the repo yet. They must be in place before this page goes live, or they
// move down to COMING_SOON.
const INCLUDED = [
  "Over 150,000 student discounts through the ISIC network",
  "Ready-made arrival checklist",
  "Planning tools that follow you across devices",
  "Downloadable guides",
  "3 ready-made CV templates",
  "3 application and motivation letter templates",
];

// Named honestly as not-yet-available, so the offer still shows where the
// membership is going without promising it for today. Q&A is out at launch by
// choice; the housing, partner and association benefits depend on partnerships
// that aren't signed, and the free ISIC card isn't confirmed with ISIC yet.
const COMING_SOON = [
  "Priority Q&A with guided support",
  "Verified housing route and premium property listings",
  "Partner guidance in one place",
  "Early application and introductions to student associations",
  "Your own ISIC card, included",
];

export default function HubPlusJoinPage() {
  const { user, loading } = useAuth();
  const [method, setMethod] = useState<Method>("applepay");
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
      setError(data?.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    // Hand off to Stripe's hosted checkout. `submitting` is intentionally left
    // true: the redirect takes a moment, and re-enabling the button would let
    // an impatient click start a second checkout session.
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
              Go premium in under a minute.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Instant access after checkout. No long forms, just the essentials.
            </p>

            <div className="mt-7 flex items-end gap-2">
              <span className="text-4xl font-extrabold">€9,99</span>
              <span className="mb-1 text-sm text-white/60">/ month · VAT included</span>
            </div>

            <ul className="mt-7 flex flex-col gap-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/85">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-7 text-[11px] font-bold uppercase tracking-wide text-white/45">
              Coming soon
            </p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {COMING_SOON.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/50">
                  <SoonIcon />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-8 text-xs text-white/55">
              <span className="inline-flex items-center gap-1.5"><LockIcon /> Secure checkout</span>
              {/* Matches the Cancellation & Refund Policy (September 2026):
                  cancel whenever you like, keep access to the end of the month
                  already paid for, and nothing further is charged. */}
              <span>Monthly · cancel anytime</span>
            </div>
          </div>

          {/* Sign-up + payment */}
          <div className="rounded-3xl border border-[#092A4D]/10 bg-white p-8 shadow-[0_2px_14px_rgba(9,42,77,0.06)] sm:p-10">
            {loading ? null : (
              <form onSubmit={onSubmit}>
                <h2 className="text-lg font-bold" style={{ color: NAVY }}>
                  Your details
                </h2>
                {user ? (
                  <p className="mt-4 rounded-xl bg-[#f6f8fb] px-4 py-3 text-sm" style={{ color: `${NAVY}A6` }}>
                    Signed in as <span className="font-bold" style={{ color: NAVY }}>{user.email}</span>. Hub Plus is
                    added to this account.
                  </p>
                ) : (
                  <div className="mt-4 flex flex-col gap-3">
                    <Field
                      label="Name"
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Field
                      label="Email"
                      type="email"
                      placeholder="you@email.com"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Field
                      label="Password"
                      type="password"
                      placeholder="Create a password"
                      autoComplete="new-password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                )}

                <h2 className="mt-8 text-lg font-bold" style={{ color: NAVY }}>
                  Payment method
                </h2>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <MethodButton selected={method === "applepay"} onClick={() => setMethod("applepay")}>
                    <ApplePayMark />
                  </MethodButton>
                  <MethodButton selected={method === "wero"} onClick={() => setMethod("wero")}>
                    <WeroMark />
                  </MethodButton>
                  <MethodButton selected={method === "card"} onClick={() => setMethod("card")}>
                    <span className="flex items-center gap-1.5 text-sm font-bold" style={{ color: NAVY }}>
                      <CardIcon /> Card
                    </span>
                  </MethodButton>
                </div>

                {method === "card" && (
                  <div className="mt-4 flex flex-col gap-3">
                    <Field label="Card number" type="text" placeholder="1234 1234 1234 1234" inputMode="numeric" />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Expiry" type="text" placeholder="MM / YY" inputMode="numeric" />
                      <Field label="CVC" type="text" placeholder="123" inputMode="numeric" />
                    </div>
                  </div>
                )}

                {method === "applepay" && (
                  <p className="mt-4 rounded-xl bg-[#f6f8fb] px-4 py-3 text-xs leading-relaxed text-[#092A4D]/60">
                    You&rsquo;ll confirm with Face ID / Touch ID on your device. No card details to type.
                  </p>
                )}
                {method === "wero" && (
                  <p className="mt-4 rounded-xl bg-[#f6f8fb] px-4 py-3 text-xs leading-relaxed text-[#092A4D]/60">
                    You&rsquo;ll approve the payment in your bank&rsquo;s Wero wallet. No card details to type.
                  </p>
                )}

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
                  {submitting ? "Setting up your access…" : "Get instant access"}
                </button>
                {/* Pre-contract information: EU rules expect the cancellation
                    and withdrawal terms to be reachable before paying, not only
                    afterwards, so the refund policy is linked here too. */}
                <p className="mt-3 text-center text-xs leading-relaxed text-[#092A4D]/50">
                  By continuing you agree to the{" "}
                  <Link href="/legal/hub-plus-terms" className="underline">
                    Hub Plus Terms
                  </Link>
                  ,{" "}
                  <Link href="/legal/hub-plus-cancellation" className="underline">
                    Cancellation &amp; Refund Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/legal#privacy" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <p className="mt-2 text-center text-xs font-semibold text-[#092A4D]/40">
                  Preview: no payment is taken.
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

function MethodButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-14 items-center justify-center rounded-xl border-2 bg-white transition-colors ${
        selected ? "border-[#fd7933] bg-[#fff4ec]" : "border-[#092A4D]/12 hover:border-[#092A4D]/25"
      }`}
    >
      {children}
    </button>
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

/** Deliberately not a tick: a clock reads as "later", a tick reads as "yours". */
function SoonIcon() {
  return (
    <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
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

function CardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

function ApplePayMark() {
  return (
    <span className="flex items-center gap-1 text-sm font-bold" style={{ color: NAVY }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.4 12.9c0-2 1.6-2.9 1.7-3-.9-1.4-2.4-1.5-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.4 2 2.4 2 1 0 1.3-.6 2.5-.6 1.1 0 1.5.6 2.5.6 1 0 1.7-.9 2.3-1.9.7-1.1 1-2.1 1-2.2 0 0-2-.8-2.1-3.3zM14.6 6.9c.5-.7.9-1.6.8-2.6-.8 0-1.8.5-2.4 1.2-.5.6-1 1.5-.8 2.5.9.1 1.8-.5 2.4-1.1z" />
      </svg>
      Pay
    </span>
  );
}

function WeroMark() {
  return (
    <span className="text-base font-extrabold lowercase tracking-tight" style={{ color: "#e5007d" }}>
      wero
    </span>
  );
}
