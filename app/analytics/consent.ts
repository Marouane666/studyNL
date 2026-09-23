"use client";

// The visitor's analytics-cookie choice, kept in localStorage.
//
// Google Analytics, Clarity and Zuko all set non-essential cookies, which EU
// rules (GDPR + ePrivacy) only allow after the visitor agrees. So nothing loads
// until the choice is "granted", and "no choice yet" counts as a no.

import { useSyncExternalStore } from "react";

export type Consent = "granted" | "denied" | null;

// Bump the version if the tools or their purpose change, so everyone is asked
// again rather than having an old "yes" stretched over something new.
const STORAGE_KEY = "analytics-consent-v1";
const CHANGE_EVENT = "analytics-consent-change";
const OPEN_EVENT = "analytics-consent-open";

function read(): Consent {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * The current choice. `undefined` while server rendering, so the banner isn't
 * flashed at people who already answered.
 */
export function useConsent(): Consent | undefined {
  return useSyncExternalStore(subscribe, read, () => undefined);
}

export function setConsent(value: "granted" | "denied") {
  const previous = read();
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage blocked: the choice holds for this page view only.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));

  // Scripts that already ran can't be unloaded, so withdrawing consent clears
  // their cookies and reloads the page without them.
  if (previous === "granted" && value === "denied") {
    clearAnalyticsCookies();
    window.location.reload();
  }
}

/** Reopens the banner, e.g. from the footer's "Cookie settings" link. */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentSettingsOpen(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

// Google Analytics (_ga, _ga_<id>), Clarity (_clck, _clsk, CLID, MUID) and Zuko
// (zuko*) first-party cookies. Third-party cookies on the tools' own domains
// can't be removed from here; those expire on their own.
const COOKIE_PREFIXES = ["_ga", "_gid", "_gat", "_clck", "_clsk", "CLID", "MUID", "zuko"];

function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!COOKIE_PREFIXES.some((p) => name.startsWith(p))) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
