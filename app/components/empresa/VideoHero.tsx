'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useEmpresa } from '@/api/useEmpresa';
import { stripHtmlTags } from '@/lib/utils';

export default function VideoHero() {
  const { t, language } = useLanguage();
  const { data: empresaData } = useEmpresa();

  // Obtener título del API según idioma, o usar traducción estática como fallback
  const getTitle = () => {
    if (!empresaData) return t('company.hero.title');

    switch (language) {
      case 'es':
        return empresaData.hero_title_es || t('company.hero.title');
      case 'en':
        return empresaData.hero_title_en || t('company.hero.title');
      case 'fr':
        return empresaData.hero_title_fr || t('company.hero.title');
      default:
        return empresaData.hero_title_es || t('company.hero.title');
    }
  };

  const title = getTitle();

  return (
    <section className="relative h-[700px] w-full">
      {/* Video Background */}
      <div className="absolute inset-0 z-0" style={{ height: '100vh' }}>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1590574744313-91d6e3ce9a52?auto=format&fit=crop&q=80"
        >
          <source src="https://uploads.innet.es/videos-estucalia/exterior.mp4" type="video/mp4" />
          {t('common.videoNotSupported')}
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="mx-auto px-4">
          <div>{stripHtmlTags(title)}</div>
        </div>
      </div>
    </section>
  );
}