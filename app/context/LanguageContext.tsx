// app/context/LanguageContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import esTranslations from "../../messages/es.json";
import enTranslations from "../../messages/en.json";
import frTranslations from "../../messages/fr.json";

type Language = "es" | "en" | "fr";

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
  const [language, setLanguageState] = useState<Language>("es");
  const [translations, setTranslations] = useState<Record<string, any>>(
    allTranslations["es"],
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Sincronizar el idioma después del mount (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsHydrated(true);

    // 1. Intentar obtener idioma de localStorage
    const savedLanguage = localStorage.getItem("language") as Language;

    // 2. Intentar obtener idioma de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("lang") as Language;

    // 3. Decidir qué idioma usar (prioridad: localStorage > URL > default)
    let initialLang: Language = "es";

    if (savedLanguage && ["es", "en", "fr"].includes(savedLanguage)) {
      initialLang = savedLanguage;
      console.log("🌐 Idioma cargado de localStorage:", initialLang);
    } else if (urlLang && ["es", "en", "fr"].includes(urlLang)) {
      initialLang = urlLang;
      console.log("🌐 Idioma cargado de URL:", initialLang);
    }

    // Actualizar el estado si es diferente
    if (initialLang !== language) {
      setLanguageState(initialLang);
      setTranslations(allTranslations[initialLang]);
    }

    // Si la URL no tiene el parámetro lang, actualizarla
    if (!urlLang) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("lang", initialLang);
      window.history.replaceState({}, "", newUrl.toString());
    }
  }, []); // Solo ejecutar al montar

  // Función para cambiar idioma
  const setLanguage = useCallback(
    (lang: Language) => {
      if (lang === language) return;

      console.log("🌐 Cambiando idioma a:", lang);

      // Actualizar estado
      setLanguageState(lang);
      setTranslations(allTranslations[lang]);

      // Guardar en localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("language", lang);

        // Actualizar URL sin recargar la página
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        window.history.pushState({}, "", url.toString());
      }

      // Opcional: forzar re-render de componentes que dependen del idioma
      // Esto es útil si tienes componentes que no se actualizan automáticamente
      window.dispatchEvent(new Event("languagechange"));
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

  // Mostrar loader mientras se hidrata (opcional)
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Cargando...</div>
      </div>
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
