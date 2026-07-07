"use client";

import { useMemo } from "react";
import { useI18n } from "../i18n/I18nProvider";
import { SEARCH_INDEX, SearchEntry } from "./searchIndex";

export type SearchResult = {
  entry: SearchEntry;
  /** Translated title for the current language. */
  title: string;
  /** Translated section/page label for the current language. */
  section: string;
};

/** Lowercase and strip diacritics so "cafe" matches "café". Safe for CJK/Arabic. */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

type IndexedEntry = {
  entry: SearchEntry;
  title: string;
  section: string;
  titleNorm: string;
  bodyNorm: string;
};

const MAX_RESULTS = 8;

export function useSiteSearch(query: string): SearchResult[] {
  const { lang, t } = useI18n();

  // Rebuild the searchable corpus whenever the language changes.
  const indexed = useMemo<IndexedEntry[]>(() => {
    return SEARCH_INDEX.map((entry) => {
      const title = t(entry.titleKey);
      const bodyText = (entry.bodyKeys ?? [])
        .map((key) => t(key))
        .join(" ");
      return {
        entry,
        title,
        section: t(entry.sectionKey),
        titleNorm: normalize(title),
        bodyNorm: normalize(`${title} ${bodyText}`),
      };
    });
    // `t` is stable per language; keying on `lang` keeps this honest.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return useMemo<SearchResult[]>(() => {
    const q = normalize(query);
    if (!q) return [];

    const tokens = q.split(/\s+/).filter(Boolean);

    const scored = indexed
      .map((item) => {
        // Every token must appear somewhere in the entry's text.
        if (!tokens.every((token) => item.bodyNorm.includes(token))) {
          return null;
        }

        let score = 0;
        for (const token of tokens) {
          if (item.titleNorm === token) score += 100;
          else if (item.titleNorm.startsWith(token)) score += 60;
          else if (item.titleNorm.includes(token)) score += 40;
          else score += 10; // matched only in body
        }
        // Whole-query phrase match in the title is a strong signal.
        if (item.titleNorm.includes(q)) score += 30;

        return { item, score };
      })
      .filter((r): r is { item: IndexedEntry; score: number } => r !== null)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));

    return scored.slice(0, MAX_RESULTS).map(({ item }) => ({
      entry: item.entry,
      title: item.title,
      section: item.section,
    }));
  }, [indexed, query]);
}
