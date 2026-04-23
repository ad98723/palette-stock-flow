import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, Language, productNameMap, userNameMap, movementTypeMap, statusMap } from "@/i18n/translations";

type T = {
  [K in keyof (typeof translations)["ar"]]: (typeof translations)["ar"][K];
};

interface LanguageContextType {
  lang: Language;
  dir: "rtl" | "ltr";
  setLang: (l: Language) => void;
  toggle: () => void;
  t: T;
  // helpers translating dynamic Arabic data values
  tCategory: (v: string) => string;
  tWarehouse: (v: string) => string;
  tProduct: (v: string) => string;
  tUser: (v: string) => string;
  tType: (v: string) => string;
  tStatus: (v: string) => string;
  tRelTime: (v: string) => string;
  tMonth: (arMonth: string) => string;
  tDay: (arDay: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("wms_lang") as Language | null;
    return saved === "en" || saved === "ar" ? saved : "ar";
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem("wms_lang", lang);
  }, [lang, dir]);

  const setLang = (l: Language) => setLangState(l);
  const toggle = () => setLangState((p) => (p === "ar" ? "en" : "ar"));

  const t = translations[lang];

  const tCategory = (v: string) => translations[lang].categories[v] ?? v;
  const tWarehouse = (v: string) => translations[lang].warehouses[v] ?? v;
  const tProduct = (v: string) => (lang === "en" ? productNameMap[v] ?? v : v);
  const tUser = (v: string) => (lang === "en" ? userNameMap[v] ?? v : v);
  const tType = (v: string) => movementTypeMap[v]?.[lang] ?? v;
  const tStatus = (v: string) => statusMap[v]?.[lang] ?? v;
  const tRelTime = (v: string) => translations[lang].relativeTimes[v] ?? v;

  const arMonths = translations.ar.months;
  const enMonths = translations.en.months;
  const arDays = translations.ar.days;
  const enDays = translations.en.days;
  const tMonth = (arMonth: string) => {
    const idx = arMonths.indexOf(arMonth);
    if (idx === -1) return arMonth;
    return lang === "en" ? enMonths[idx] : arMonth;
  };
  const tDay = (arDay: string) => {
    const idx = arDays.indexOf(arDay);
    if (idx === -1) return arDay;
    return lang === "en" ? enDays[idx] : arDay;
  };

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, toggle, t, tCategory, tWarehouse, tProduct, tUser, tType, tStatus, tRelTime, tMonth, tDay }}>
      {children}
    </LanguageContext.Provider>
  );
}