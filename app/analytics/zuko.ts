"use client";

// Zuko form analytics: which fields people hesitate on, correct or abandon.
//
// Each tracked form gets its own slug in lib/siteConfig.ts. A form opts in with
// useZukoForm(), which starts tracking once the visitor has consented and the
// Zuko script has loaded, and hands back a function to call when the form is
// submitted successfully (Zuko counts that as a completion).
//
// Calls follow Zuko's v2 client: Zuko.trackForm({ target, slug }).trackFormView()
// on view, and .trackEvent(Zuko.COMPLETION_EVENT) on success. If Zuko's install
// page for a form shows a different snippet, that page wins.

import { type RefObject, useCallback, useEffect } from "react";
import { type ZukoForm, zukoSlug } from "@/lib/siteConfig";
import { useConsent } from "./consent";

type ZukoTracker = { trackFormView: () => void; trackEvent: (event: unknown) => void };
type ZukoClient = {
  trackForm: (options: { target?: HTMLElement; slug: string }) => ZukoTracker;
  COMPLETION_EVENT: unknown;
};

declare global {
  interface Window {
    Zuko?: ZukoClient;
  }
}

const READY_EVENT = "zuko-ready";

/** Called by the Zuko <Script> once it has loaded. */
export function markZukoReady() {
  window.dispatchEvent(new Event(READY_EVENT));
}

function whenZukoReady(run: (zuko: ZukoClient) => void) {
  if (window.Zuko) {
    run(window.Zuko);
    return () => {};
  }
  const onReady = () => window.Zuko && run(window.Zuko);
  window.addEventListener(READY_EVENT, onReady, { once: true });
  return () => window.removeEventListener(READY_EVENT, onReady);
}

/**
 * Tracks `formRef` in Zuko as `form`. Returns `trackCompletion`, to call after a
 * successful submit. Does nothing without consent or without a slug.
 *
 * `enabled` is for a form element that serves more than one purpose (the login
 * panel is also the sign-up form), so only the tracked mode is counted.
 */
export function useZukoForm(
  form: ZukoForm,
  formRef: RefObject<HTMLFormElement | null>,
  enabled = true,
) {
  const consent = useConsent();
  const slug = zukoSlug(form);
  const active = enabled && consent === "granted" && slug !== null;

  useEffect(() => {
    if (!active || !slug) return;
    return whenZukoReady((zuko) => {
      if (formRef.current) zuko.trackForm({ target: formRef.current, slug }).trackFormView();
    });
  }, [active, slug, formRef]);

  return useCallback(() => {
    if (!active || !slug || !window.Zuko) return;
    window.Zuko.trackForm({ slug }).trackEvent(window.Zuko.COMPLETION_EVENT);
  }, [active, slug]);
}
