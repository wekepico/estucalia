'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import esTranslations from '../../messages/es.json';
import enTranslations from '../../messages/en.json';
import frTranslations from '../../messages/fr.json';

type Language = 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Objeto con todas las traducciones
const allTranslations = {
  es: esTranslations,
  en: enTranslations,
  fr: frTranslations
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Inicializar el estado con el valor del localStorage o 'es' como predeterminado
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      return savedLanguage || 'es';
    }
    return 'es';
  });
  
  const [translations, setTranslations] = useState<Record<string, any>>(allTranslations[language]);

  // Función para cambiar el idioma y guardarlo en localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setTranslations(allTranslations[lang]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string => {
    if (!key) return '';
    
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value === undefined || value === null) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      value = value[k];
    }

    if (typeof value === 'object') {
      console.warn(`Translation key ${key} is an object, not a string`);
      return key;
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 