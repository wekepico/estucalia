'use client';

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useHome } from '@/api/useHome';
import { stripHtmlTags } from '@/lib/utils';

export default function CompanyInfo() {
  const { t, language } = useLanguage();
  const { data: homeData } = useHome();

  // Obtener título del API según idioma, o usar traducción estática como fallback
  const getTitle = () => {
    if (!homeData) return t('home.company.title');

    switch (language) {
      case 'es':
        return homeData.second_title_es || t('home.company.title');
      case 'en':
        return homeData.second_title_en || t('home.company.title');
      case 'fr':
        return homeData.second_title_fr || t('home.company.title');
      default:
        return homeData.second_title_es || t('home.company.title');
    }
  };

  // Obtener descripción del API según idioma, o usar traducción estática como fallback
  const getDescription = () => {
    if (!homeData) return t('home.company.description');

    switch (language) {
      case 'es':
        return homeData.second_description_es || t('home.company.description');
      case 'en':
        return homeData.second_description_en || t('home.company.description');
      case 'fr':
        return homeData.second_description_fr || t('home.company.description');
      default:
        return homeData.second_description_es || t('home.company.description');
    }
  };

  const title = getTitle();
  const description = getDescription();

  return (
    <section className="min-h-[300px] flex items-center bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <div>{stripHtmlTags(title)}</div>
        </div>
        <div>{stripHtmlTags(description)}</div>
      </div>
    </section>
  );
}