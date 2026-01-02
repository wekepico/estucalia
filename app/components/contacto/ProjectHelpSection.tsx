'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/app/context/LanguageContext';
import { useHome } from '@/api/useHome';
import { stripHtmlTags } from '@/lib/utils';

export default function ProjectHelpSection() {
  const { t, language } = useLanguage();
  const { data: homeData } = useHome();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Obtener título del API según idioma, o usar traducción estática como fallback
  const getTitle = () => {
    if (!homeData) return t('contact.projectHelp.title');

    switch (language) {
      case 'es':
        return homeData.cta_help_title_es || t('contact.projectHelp.title');
      case 'en':
        return homeData.cta_help_title_en || t('contact.projectHelp.title');
      case 'fr':
        return homeData.cta_help_title_fr || t('contact.projectHelp.title');
      default:
        return homeData.cta_help_title_es || t('contact.projectHelp.title');
    }
  };

  // Obtener descripción del API según idioma, o usar traducción estática como fallback
  const getDescription = () => {
    if (!homeData) return t('contact.projectHelp.description');

    switch (language) {
      case 'es':
        return homeData.cta_help_text_es || t('contact.projectHelp.description');
      case 'en':
        return homeData.cta_help_text_en || t('contact.projectHelp.description');
      case 'fr':
        return homeData.cta_help_text_fr || t('contact.projectHelp.description');
      default:
        return homeData.cta_help_text_es || t('contact.projectHelp.description');
    }
  };

  // Obtener texto del botón del API según idioma, o usar traducción estática como fallback
  const getButtonText = () => {
    if (!homeData) return t('contact.projectHelp.button');

    switch (language) {
      case 'es':
        return homeData.cta_help_button_es || t('contact.projectHelp.button');
      case 'en':
        return homeData.cta_help_button_en || t('contact.projectHelp.button');
      case 'fr':
        return homeData.cta_help_button_fr || t('contact.projectHelp.button');
      default:
        return homeData.cta_help_button_es || t('contact.projectHelp.button');
    }
  };

  if (!mounted) {
    return null;
  }

  const title = getTitle();
  const description = getDescription();
  const buttonText = getButtonText();

  // Obtener imagen del backend o usar fallback local
  // Nota: cta_help_image_url, cta_help_image_alt y cta_help_image_title son strings simples (sin localización)
  const imageUrl = homeData?.cta_help_image_url || '/img/helper.jpg';
  const imageAlt = homeData?.cta_help_image_alt || t('contact.projectHelp.imageAlt');
  const imageTitle = homeData?.cta_help_image_title || undefined;

  return (
    <section className="relative min-h-[500px] flex items-center">
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 bg-cover bg-top "
        style={{
          backgroundImage: `url('${imageUrl}')`
        }}
        role="img"
        aria-label={imageAlt}
        title={imageTitle}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Contenido */}
      <div className="relative md:px-15 sm:px-10 px-5 lg:px-20">
        <div className="max-w-[27rem]  mx-auto bg-slate-100" style={{ backgroundColor: "rgba(255, 255, 250, 0.8)" }}>
          <div className="p-6 md:p-12">
            {/* Título */}
            <div>{stripHtmlTags(title)}</div>
            {/* Descripción */}
            <div>{stripHtmlTags(description)}</div>
            {/* Botón */}
            <div className="flex w-full justify-end items-center">
              <Button
                variant="outline"
                onClick={() => window.location.href = "/contacto"}
                className=" border-gray-500 border-solid relative pl-5 pr-10 py-4 md:py-5  rounded-none"
              >
                <div>{stripHtmlTags(buttonText)}</div>
                <div className='absolute right-0'>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}