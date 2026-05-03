// app/context/LanguageContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useSearchParams } from "next/navigation";
import esTranslations from "../../messages/es.json";
import enTranslations from "../../messages/en.json";
import frTranslations from "../../messages/fr.json";

type Language = "es" | "en" | "fr";

const VALID_LANGS: Language[] = ["es", "en", "fr"];
const isValidLang = (v: unknown): v is Language =>
  typeof v === "string" && (VALID_LANGS as string[]).includes(v);

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const allTranslations = {
  es: esTranslations,
  en: enTranslations,
  fr: frTranslations,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Leemos el lang directamente de ?lang= con useSearchParams. Funciona
  // tanto en SSR (server-render del client component) como en el cliente,
  // así que server y cliente arrancan con EL MISMO idioma desde el primer
  // render — sin flicker, sin desfase.
  // localStorage se usa solo como preferencia para próximas visitas.
  const searchParams = useSearchParams();
  const urlLang = searchParams?.get("lang");
  const initialLang: Language = isValidLang(urlLang) ? urlLang : "es";

  const [language] = useState<Language>(initialLang);
  const translations = allTranslations[language];

  // Si la URL no trae lang pero hay preferencia guardada en localStorage,
  // recargamos con esa preferencia (visita returnista que abre la home limpia).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (urlLang) return; // si la URL manda, no tocamos

    const savedLanguage = localStorage.getItem("language");
    if (
      isValidLang(savedLanguage) &&
      savedLanguage !== "es" &&
      savedLanguage !== language
    ) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", savedLanguage);
      window.location.assign(url.toString());
    }
  }, [urlLang, language]);

  // Persistimos la preferencia y actualizamos <html lang> para accesibilidad.
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback(
    (lang: Language) => {
      if (lang === language) return;
      if (typeof window === "undefined") return;

      // Recarga completa para que generateMetadata se vuelva a ejecutar en el
      // server con el nuevo lang y se actualicen <head> y contenido a la vez.
      localStorage.setItem("language", lang);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.location.assign(url.toString());
    },
    [language],
  );

  const t = useCallback(
    (key: string): string => {
      if (!key) return "";

      const keys = key.split(".");
      let value: any = translations;

      for (const k of keys) {
        if (value === undefined || value === null) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`Translation key not found: ${key}`);
          }
          return key;
        }
        value = value[k];
      }

      if (typeof value === "object") {
        if (process.env.NODE_ENV === "development") {
          console.warn(`Translation key ${key} is an object, not a string`);
        }
        return key;
      }

      return value || key;
    },
    [translations],
  );

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
