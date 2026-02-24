"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import ru from "./translations/ru.json";
import en from "./translations/en.json";
import uz from "./translations/uz.json";
import ky from "./translations/ky.json";

export type LanguageCode = "ru" | "en" | "uz" | "ky";

const translations: Record<LanguageCode, Record<string, string>> = {
  ru,
  en,
  uz,
  ky,
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("ru");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("sirat_lang") as LanguageCode | null;
    if (stored && translations[stored]) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("sirat_lang", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["ru"][key] || key;
  };

  // Keep hydration stable
  if (!isMounted) {
    return (
      <LanguageContext.Provider value={{ language: "ru", setLanguage, t: (key) => translations["ru"][key] || key }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
