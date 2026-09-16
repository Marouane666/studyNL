// Legal constants shared by the policy pages, the checkout consent tick and the
// server-side record of that consent. No server-only imports: the join form
// renders WITHDRAWAL_CONSENT_TEXT in the browser and the checkout route stores
// that same string, and they must be the same string — a stored consent is only
// evidence if it reproduces the exact sentence the member was shown.

/**
 * Revision of the Hub Plus policy set in force at checkout (Membership Terms +
 * Cancellation & Refund Policy, both supplied September 2026). Stamped onto
 * every consent record. Bump it whenever the wording of either document
 * changes, so consents taken before and after stay distinguishable.
 */
export const POLICY_VERSION = "2026-09";

/**
 * Separate from POLICY_VERSION on purpose: the Privacy Policy is still the
 * July text and hasn't been revised, so dating it "September 2026" alongside
 * the new documents would be a false claim about when it was last reviewed.
 */
export const PRIVACY_LAST_UPDATED = "16 July 2026";

/**
 * The withdrawal-right waiver, worded so the consent is "express" as the
 * Consumer Rights Directive requires. Shown as an unticked, required checkbox
 * at checkout — never pre-ticked, and never bundled with anything else, or the
 * consent isn't separate and specific and the waiver doesn't hold.
 *
 * UNRESOLVED — NEEDS COUNSEL BEFORE LAUNCH: this sentence says the member
 * LOSES the 14-day withdrawal right once delivery begins (the digital-content
 * position). The Cancellation & Refund Policy supplied in September 2026 says
 * the member KEEPS that right and that a refund "may be reduced to reflect
 * services already provided" (the services position). Both cannot be true of
 * the same purchase, and a member reading the two would be told different
 * things. Left as supplied rather than silently reworded, because which
 * position applies is a legal call, not a code one.
 */
export const WITHDRAWAL_CONSENT_TEXT =
  "I expressly consent to the immediate delivery of the digital content and " +
  "acknowledge that, once delivery begins, I lose my 14-day right of withdrawal " +
  "in respect of that digital content.";

export const CONTACT_EMAIL = "contact@study-nl.com";

/** Shown where a company detail hasn't been supplied yet. */
export const DETAIL_PENDING = "[to be confirmed]";

/**
 * Identity of the company operating StudyNL, rendered into section 31 of the
 * StudyNL Terms & Conditions.
 *
 * Kept here rather than inline in the policy text so there is exactly one place
 * to fill in, and so an unfilled field is visible as a null in code instead of
 * hiding as prose inside a long document.
 *
 * OUTSTANDING: every field below except the email is still null. EU e-commerce
 * rules require a trader to identify itself before selling to consumers, so all
 * of them must be supplied before the checkout takes real money. They are
 * deliberately NOT guessed — a registration number or registered address
 * invented to fill a gap would be false trader information on a document that
 * forms part of a consumer contract.
 */
export const COMPANY = {
  legalName: "StudyNL" as string | null,
  /** KVK (Dutch Chamber of Commerce) number. */
  registrationNumber: "42001739" as string | null,
  registeredAddress: "Cereskade 33, 9503 GC Stadskanaal" as string | null,
  countryOfRegistration: "Netherlands" as string | null,
  /**
   * Deliberately its own address rather than CONTACT_EMAIL: this is where
   * withdrawal notices and legal correspondence go, and it is the address
   * published as the trader's contact point.
   */
  email: "study.nl@outlook.com" as string,
};

/** True once the company identity is complete enough to publish. */
export function hasCompanyDetails(): boolean {
  return Boolean(
    COMPANY.legalName &&
      COMPANY.registrationNumber &&
      COMPANY.registeredAddress &&
      COMPANY.countryOfRegistration,
  );
}
