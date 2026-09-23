// Public site configuration: IDs that end up in the browser anyway, so they
// live in code rather than in .env files.
//
// Nothing here is a secret. A Google Analytics measurement ID, a Clarity
// project ID and a Zuko form slug are all printed into every page that loads
// the tool, so anyone can read them with "view source". Secret keys (Stripe,
// Supabase) stay in the environment and never belong in this file.
//
// Leave a value empty ("") to switch that tool off. When every value is empty,
// no tracking script loads and the cookie banner doesn't appear at all.
//
// BEFORE FILLING THESE IN: the Privacy Policy (app/legal/page.tsx) says the
// site uses no analytics. It has to describe these tools, and the cookies they
// set, before they go live.

export const ANALYTICS = {
  /** Google Analytics 4 measurement ID, e.g. "G-ABC123XYZ9" (Admin → Data streams). */
  googleAnalyticsId: "",

  /** Microsoft Clarity project ID, e.g. "abcd1234ef" (Settings → Overview). */
  clarityProjectId: "",

  /**
   * Zuko form slugs, one per tracked form (Zuko → form settings → "Slug").
   * Each form is created separately in Zuko; an empty slug skips that form.
   */
  zukoForms: {
    /** Hub Plus sign-up + checkout (app/hub-plus/join). */
    hubPlusCheckout: "",
    /** Account sign-up in the login panel (app/forum/components/AuthPanel). */
    signup: "",
    /** Contact form (app/contact). */
    contact: "",
  },
};

export type ZukoForm = keyof typeof ANALYTICS.zukoForms;

// The IDs are written into inline scripts, so each one is checked against its
// tool's format first; a typo turns that tool off instead of breaking pages.
const GA_ID = /^G-[A-Z0-9]{4,20}$/;
const CLARITY_ID = /^[a-z0-9]{6,20}$/i;
const ZUKO_SLUG = /^[a-z0-9]{4,40}$/i;

export function googleAnalyticsId(): string | null {
  return GA_ID.test(ANALYTICS.googleAnalyticsId) ? ANALYTICS.googleAnalyticsId : null;
}

export function clarityProjectId(): string | null {
  return CLARITY_ID.test(ANALYTICS.clarityProjectId) ? ANALYTICS.clarityProjectId : null;
}

export function zukoSlug(form: ZukoForm): string | null {
  const slug = ANALYTICS.zukoForms[form];
  return ZUKO_SLUG.test(slug) ? slug : null;
}

export function hasZuko(): boolean {
  return (Object.keys(ANALYTICS.zukoForms) as ZukoForm[]).some((f) => zukoSlug(f));
}

/** Whether any tracking tool is configured, i.e. whether consent is needed. */
export function hasAnalytics(): boolean {
  return Boolean(googleAnalyticsId() || clarityProjectId() || hasZuko());
}
