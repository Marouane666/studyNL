"use client";

// DESIGN MOCKUP ONLY — Hub Plus easy sign-up + checkout.
// Non-functional: no real account creation, no payment processing.
// Text is hardcoded English for review; i18n + a real payment provider
// (Mollie / Stripe / Adyen) and billing model are wired up after sign-off.

import Link from "next/link";
import { useState } from "react";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

type Method = "applepay" | "wero" | "card";

const INCLUDED = [
  "Verified housing route to lower your rental risk",
  "Priority Q&A with guided support",
  "Ready-made arrival checklists and planning tools",
  "Partner guidance in one place",
];

export default function HubPlusJoinPage() {
  const [method, setMethod] = useState<Method>("applepay");
  const [done, setDone] = useState(false);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-10">
        <Link
          href="/hub-plus"
          className="flex w-fit items-center gap-1.5 text-sm font-bold text-[#092A4D]/60 transition-colors hover:text-[#092A4D]"
        >
          <BackIcon />
          Hub Plus
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
              <span className="mb-1 text-sm text-white/60">/ month · example pricing</span>
            </div>

            <ul className="mt-7 flex flex-col gap-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/85">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-8 text-xs text-white/55">
              <span className="inline-flex items-center gap-1.5"><LockIcon /> Secure checkout</span>
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Sign-up + payment */}
          <div className="rounded-3xl border border-[#092A4D]/10 bg-white p-8 shadow-[0_2px_14px_rgba(9,42,77,0.06)] sm:p-10">
            {done ? (
              <SuccessMock onReset={() => setDone(false)} />
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
              >
                <h2 className="text-lg font-bold" style={{ color: NAVY }}>
                  Your details
                </h2>
                <div className="mt-4 flex flex-col gap-3">
                  <Field label="Name" type="text" placeholder="Your name" autoComplete="name" />
                  <Field label="Email" type="email" placeholder="you@email.com" autoComplete="email" />
                  <Field label="Password" type="password" placeholder="Create a password" autoComplete="new-password" />
                </div>

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
                    You'll confirm with Face ID / Touch ID on your device. No card details to type.
                  </p>
                )}
                {method === "wero" && (
                  <p className="mt-4 rounded-xl bg-[#f6f8fb] px-4 py-3 text-xs leading-relaxed text-[#092A4D]/60">
                    You'll approve the payment in your bank's Wero wallet. No card details to type.
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center rounded-full py-4 text-base font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: ORANGE }}
                >
                  Get instant access
                </button>
                <p className="mt-3 text-center text-xs text-[#092A4D]/50">
                  By continuing you agree to our Terms and Privacy Policy.
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

function SuccessMock({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <span
        className="flex size-14 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: ORANGE }}
      >
        <BigCheckIcon />
      </span>
      <h2 className="mt-5 text-xl font-bold" style={{ color: NAVY }}>
        You're in. Welcome to Hub Plus.
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed" style={{ color: `${NAVY}A6` }}>
        Your premium access is active. (This is a design preview, no account was
        created and no payment was taken.)
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm font-semibold underline"
        style={{ color: ORANGE }}
      >
        Back to the sign-up preview
      </button>
    </div>
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

function BigCheckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
