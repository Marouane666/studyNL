// The published policy set, source of truth for the legal index
// (app/legal/page.tsx) and the policy route (app/legal/[slug]/page.tsx).

import { hubPlusCancellation } from "./hubPlusCancellation";
import { hubPlusTerms } from "./hubPlusTerms";
import { studynlTerms } from "./studynlTerms";
import type { Policy } from "./types";

export type { Policy, PolicyBlock, PolicySection } from "./types";
export { isParagraph } from "./types";

/** Order shown on the index: general terms first, then the paid membership. */
export const POLICIES: Policy[] = [studynlTerms, hubPlusTerms, hubPlusCancellation];

export function getPolicy(slug: string): Policy | undefined {
  return POLICIES.find((p) => p.slug === slug);
}
