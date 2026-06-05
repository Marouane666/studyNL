"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LANGUAGES, LangCode, RTL_LANGS, translate } from "./dictionary";

type Ctx = {
  lang: LangCode;
  setLang: (c: LangCode) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "lang";
const DEFAULT_LANG: LangCode = "en";

function isValidLang(value: string | null): value is LangCode {
  return !!value && LANGUAGES.some((l) => l.code === value);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(DEFAULT_LANG);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isValidLang(stored)) setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((next: LangCode) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback((key: string) => translate(lang, key), [lang]);

  const value = useMemo<Ctx>(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}
