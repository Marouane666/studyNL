"use client";

// Where Stripe returns a member after a successful payment.
//
// The payment is done by the time anyone lands here, but the membership may not
// be: access is granted by the Stripe webhook, which is a separate request that
// can arrive a second or two after the browser does. So this page waits for the
// account to actually turn premium rather than assuming it has — and never
// grants anything itself, because a success_url can be opened by anyone who
// knows the address.

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../auth/AuthProvider";
import { isPremium } from "@/lib/plan";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

// Roughly 30 seconds of waiting. Long enough to cover a slow webhook, short
// enough that a genuinely stuck payment doesn't leave someone staring at a
// spinner with no way forward.
const POLL_INTERVAL_MS = 2000;
const GIVE_UP_AFTER_MS = 30000;
const REDIRECT_DELAY_MS = 1200;

type State = "waiting" | "ready" | "slow" | "signedOut";

export default function HubPlusWelcomePage() {
  const router = useRouter();
  const { user, loading, refresh } = useAuth();
  const [gaveUp, setGaveUp] = useState(false);

  const premium = isPremium(user);
  const settled = !loading && user !== null && !premium;

  // Derived while rendering rather than pushed into state from an effect:
  // every input is already reactive, so mirroring them into a second state
  // would only add a render and a chance for the two to disagree.
  const state: State = loading
    ? "waiting"
    : !user
      ? "signedOut"
      : premium
        ? "ready"
        : gaveUp
          ? "slow"
          : "waiting";

  // Ask the server again periodically until the webhook has landed.
  useEffect(() => {
    if (!settled || gaveUp) return;
    const id = setInterval(() => refresh(), POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [settled, gaveUp, refresh]);

  // Stop waiting eventually and offer a way out.
  useEffect(() => {
    if (!settled) return;
    const id = setTimeout(() => setGaveUp(true), GIVE_UP_AFTER_MS);
    return () => clearTimeout(id);
  }, [settled]);

  // Straight through to the dashboard once access is real; the short pause is
  // only so the confirmation reads as a confirmation rather than a flicker.
  useEffect(() => {
    if (state !== "ready") return;
    const id = setTimeout(() => router.replace("/hub-plus/dashboard"), REDIRECT_DELAY_MS);
    return () => clearTimeout(id);
  }, [state, router]);

  return (
    <section className="bg-white">
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
        {state === "ready" ? (
          <Ready />
        ) : state === "signedOut" ? (
          <SignedOut />
        ) : state === "slow" ? (
          <Slow />
        ) : (
          <Waiting />
        )}
      </div>
    </section>
  );
}

function Waiting() {
  return (
    <>
      <Spinner />
      <h1 className="mt-6 text-2xl font-extrabold tracking-tight" style={{ color: NAVY }}>
        Payment received
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed" style={{ color: `${NAVY}A6` }}>
        Setting up your Hub Plus access. This usually takes a couple of seconds.
      </p>
    </>
  );
}

function Ready() {
  return (
    <>
      <span
        className="flex size-14 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: ORANGE }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5 12 5 5L20 7" />
        </svg>
      </span>
      <h1 className="mt-6 text-2xl font-extrabold tracking-tight" style={{ color: NAVY }}>
        You&rsquo;re in. Welcome to Hub Plus.
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed" style={{ color: `${NAVY}A6` }}>
        Taking you to your dashboard&hellip;
      </p>
      <Link
        href="/hub-plus/dashboard"
        className="mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        style={{ backgroundColor: ORANGE }}
      >
        Go to my dashboard
      </Link>
    </>
  );
}

function Slow() {
  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: NAVY }}>
        Your payment went through
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed" style={{ color: `${NAVY}A6` }}>
        Your membership is taking longer than usual to activate. Nothing is lost and you have not
        been charged twice &mdash; refreshing in a minute usually does it.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/hub-plus/dashboard"
          className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: ORANGE }}
        >
          Try my dashboard
        </Link>
        <Link href="/contact" className="text-sm font-bold underline" style={{ color: NAVY }}>
          Contact support
        </Link>
      </div>
    </>
  );
}

function SignedOut() {
  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: NAVY }}>
        Almost there &mdash; please log in
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed" style={{ color: `${NAVY}A6` }}>
        Your payment went through and your membership is attached to your account. Log in with the
        email and password you just used and you&rsquo;ll find Hub Plus waiting.
      </p>
      <Link
        href="/forum"
        className="mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        style={{ backgroundColor: ORANGE }}
      >
        Log in
      </Link>
    </>
  );
}

function Spinner() {
  return (
    <span
      className="size-10 animate-spin rounded-full border-[3px] border-[#092A4D]/12 motion-reduce:animate-none"
      style={{ borderTopColor: ORANGE }}
      role="status"
      aria-label="Setting up your access"
    />
  );
}
