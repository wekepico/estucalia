'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useEmpresa } from '@/api/useEmpresa';

export default function ProductionSection() {
  const { t, language } = useLanguage();
  const { data: empresaData } = useEmpresa();

  // Obtener título Production del API según idioma
  const getProductionTitle = () => {
    if (!empresaData) return t('company.production.stats.title');

    switch (language) {
      case 'es':
        return empresaData.production_title_es || t('company.production.stats.title');
      case 'en':
        return empresaData.production_title_en || t('company.production.stats.title');
      case 'fr':
        return empresaData.production_title_fr || t('company.production.stats.title');
      default:
        return empresaData.production_title_es || t('company.production.stats.title');
    }
  };

  // Obtener texto Production del API según idioma
  const getProductionText = () => {
    if (!empresaData) return t('company.production.stats.description');

    switch (language) {
      case 'es':
        return empresaData.production_text_es || t('company.production.stats.description');
      case 'en':
        return empresaData.production_text_en || t('company.production.stats.description');
      case 'fr':
        return empresaData.production_text_fr || t('company.production.stats.description');
      default:
        return empresaData.production_text_es || t('company.production.stats.description');
    }
  };

  const productionTitle = getProductionTitle();
  const productionText = getProductionText();

  return (
    <section className=" text-white">
      {/* Stats Section */}
      <div className=" mx-auto w-full">
        <div className="text-center p-32 max-sm:px-4  bg-black">
          <div dangerouslySetInnerHTML={{ __html: productionTitle }} />
          <div dangerouslySetInnerHTML={{ __html: productionText }} />
        </div>

        {/* Video Section */}
        <div className="relative">
          <div className="relative aspect-video object-cover mx-auto overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1590574744313-91d6e3ce9a52?auto=format&fit=crop&q=80"
            >
              <source src="https://uploads.innet.es/videos-estucalia/produccion.mp4" type="video/mp4" />
              {t('common.videoNotSupported')}
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}