// Legal constants shared by the policy page, the checkout consent tick and the
// server-side record of that consent. No server-only imports: the join form
// renders WITHDRAWAL_CONSENT_TEXT in the browser and the checkout route stores
// that same string, and they must be the same string — a stored consent is only
// evidence if it reproduces the exact sentence the member was shown.

/**
 * Revision of the Terms / Privacy / Refund / Cancellation set currently in
 * force. Bump this whenever the wording of any of them changes, so consents
 * recorded before and after the change stay distinguishable.
 */
export const POLICY_VERSION = "2026-07-16";

/** Human-readable form of POLICY_VERSION, shown on the policy page. */
export const POLICY_LAST_UPDATED = "16 July 2026";

/**
 * The withdrawal-right waiver, worded so the consent is "express" as the
 * Consumer Rights Directive requires. Shown as an unticked, required checkbox
 * at checkout — never pre-ticked, and never bundled with anything else, or the
 * consent isn't separate and specific and the waiver doesn't hold.
 */
export const WITHDRAWAL_CONSENT_TEXT =
  "I expressly consent to the immediate delivery of the digital content and " +
  "acknowledge that, once delivery begins, I lose my 14-day right of withdrawal " +
  "in respect of that digital content.";

export const CONTACT_EMAIL = "contact@study-nl.com";
