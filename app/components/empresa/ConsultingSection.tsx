'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../../context/LanguageContext';
import { useEmpresa } from '@/api/useEmpresa';
import Link from 'next/link';

export default function ConsultingSection() {
  const { t, language } = useLanguage();
  const { data: empresaData } = useEmpresa();

  // Obtener título Consulting del API según idioma
  const getConsultingTitle = () => {
    if (!empresaData) return t('company.consulting.title');

    switch (language) {
      case 'es':
        return empresaData.consulting_title_es || t('company.consulting.title');
      case 'en':
        return empresaData.consulting_title_en || t('company.consulting.title');
      case 'fr':
        return empresaData.consulting_title_fr || t('company.consulting.title');
      default:
        return empresaData.consulting_title_es || t('company.consulting.title');
    }
  };

  // Obtener texto Consulting del API según idioma
  const getConsultingText = () => {
    if (!empresaData) return t('company.consulting.description');

    switch (language) {
      case 'es':
        return empresaData.consulting_text_es || t('company.consulting.description');
      case 'en':
        return empresaData.consulting_text_en || t('company.consulting.description');
      case 'fr':
        return empresaData.consulting_text_fr || t('company.consulting.description');
      default:
        return empresaData.consulting_text_es || t('company.consulting.description');
    }
  };

  // Obtener texto botón CTA del API según idioma
  const getConsultingCTA = () => {
    if (!empresaData) return t('company.consulting.button');

    switch (language) {
      case 'es':
        return empresaData.consulting_cta_text_es || t('company.consulting.button');
      case 'en':
        return empresaData.consulting_cta_text_en || t('company.consulting.button');
      case 'fr':
        return empresaData.consulting_cta_text_fr || t('company.consulting.button');
      default:
        return empresaData.consulting_cta_text_es || t('company.consulting.button');
    }
  };

  const consultingTitle = getConsultingTitle();
  const consultingText = getConsultingText();
  const consultingCTA = getConsultingCTA();

  // Obtener imagen del backend o usar fallback local
  const consultingBgImage = empresaData?.consulting_bg_image || "/img/asesoramiento.jpg";
  const consultingBgImageAlt = empresaData?.consulting_bg_image_alt || t('company.consulting.title');
  const consultingBgImageTitle = empresaData?.consulting_bg_image_title || undefined;

  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
        style={{
          backgroundImage: `url(${consultingBgImage})`,
        }}
        role="img"
        aria-label={consultingBgImageAlt}
        title={consultingBgImageTitle}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div dangerouslySetInnerHTML={{ __html: consultingTitle }} />

          <div dangerouslySetInnerHTML={{ __html: consultingText }} />

          <Link href="/contacto">
            <Button variant="outline" className="border-gray-200 pl-5  pr-0  md:py-6 bg-transparent hover:text-black border-solid rounded-none">
              <span dangerouslySetInnerHTML={{ __html: consultingCTA }} />
              <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>

        </div>
      </div>
    </section>
  );
}