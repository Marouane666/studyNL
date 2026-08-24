// The supported language set, on its own so server code can validate a
// language code without importing app/i18n/dictionary.ts — that file carries
// every translated string for all ten languages, which a route handler that
// only needs to check "is this a real code" has no business pulling in.
//
// dictionary.ts re-exports everything here, so existing
// `from "./i18n/dictionary"` imports keep working and there is still one
// canonical list rather than two that can drift apart.

export type LangCode =
  | "en"
  | "es"
  | "de"
  | "fr"
  | "it"
  | "nl"
  | "ro"
  | "tr"
  | "zh"
  | "ar";

export type Language = { code: LangCode; label: string; short: string };

export const LANGUAGES: Language[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "it", label: "Italiano", short: "IT" },
  { code: "nl", label: "Nederlands", short: "NL" },
  { code: "ro", label: "Română", short: "RO" },
  { code: "tr", label: "Türkçe", short: "TR" },
  { code: "zh", label: "中文", short: "ZH" },
  { code: "ar", label: "العربية", short: "AR" },
];

export const RTL_LANGS: LangCode[] = ["ar"];

export const DEFAULT_LANG: LangCode = "en";

export function isLangCode(value: unknown): value is LangCode {
  return typeof value === "string" && LANGUAGES.some((l) => l.code === value);
}
