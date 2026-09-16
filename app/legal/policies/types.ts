// Shape of a published policy document.
//
// Policy text is held as data rather than JSX for two reasons: the wording is
// supplied by the business (and reviewed by counsel) rather than written here,
// so it should be editable without touching markup, and every document then
// renders through one component and cannot drift in presentation.
//
// Deliberately NOT translated through app/i18n. These are the operative legal
// texts; a machine or unreviewed translation of them would create a second,
// differently-worded contract. The renderer says plainly that they are English
// only — same position the existing /legal page already takes.

export type PolicyBlock = { p: string } | { ul: string[] };

export type PolicySection = {
  /** Includes the source document's own numbering, e.g. "3. Membership Price". */
  heading?: string;
  blocks: PolicyBlock[];
};

export type Policy = {
  /** URL slug under /legal. */
  slug: string;
  title: string;
  /** One line for the index card and the page intro. */
  summary: string;
  lastUpdated: string;
  /** Unheaded opening paragraphs, before the first numbered section. */
  intro: PolicyBlock[];
  sections: PolicySection[];
};

export function isParagraph(block: PolicyBlock): block is { p: string } {
  return "p" in block;
}
