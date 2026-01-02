'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useHome } from '@/api/useHome';
import { stripHtmlTags } from '@/lib/utils';

export default function HeroSection() {
  const { t, language } = useLanguage();
  const { data: homeData } = useHome();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Obtener descripción del API según idioma, o usar traducción estática como fallback
  const getDescription = () => {
    if (!homeData) return t('home.hero.title');

    switch (language) {
      case 'es':
        return homeData.first_description_es || t('home.hero.title');
      case 'en':
        return homeData.first_description_en || t('home.hero.title');
      case 'fr':
        return homeData.first_description_fr || t('home.hero.title');
      default:
        return homeData.first_description_es || t('home.hero.title');
    }
  };

  const description = getDescription();

  // Obtener imagen del backend o usar fallback local
  // Nota: first_image_url es un string simple (sin localización)
  const imageUrl = homeData?.first_image_url || '/img/Home.jpg';

  const getImageAlt = () => {
    if (!homeData) return t('home.hero.imageAlt');
    
    switch (language) {
      case 'es':
        return homeData.first_image_alt_es || t('home.hero.imageAlt');
      case 'en':
        return homeData.first_image_alt_en || t('home.hero.imageAlt');
      case 'fr':
        return homeData.first_image_alt_fr || t('home.hero.imageAlt');
      default:
        return homeData.first_image_alt_es || t('home.hero.imageAlt');
    }
  };

  const getImageTitle = () => {
    if (!homeData) return undefined;
    
    switch (language) {
      case 'es':
        return homeData.first_image_title_es || undefined;
      case 'en':
        return homeData.first_image_title_en || undefined;
      case 'fr':
        return homeData.first_image_title_fr || undefined;
      default:
        return homeData.first_image_title_es || undefined;
    }
  };

  const imageAlt = getImageAlt();
  const imageTitle = getImageTitle();

  if (!mounted) {
    // Renderizar contenido estático durante SSR
    return (
      <section className="relative h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
          style={{
            backgroundImage: `url('${imageUrl}')`
          }}
          role="img"
          aria-label={imageAlt}
          title={imageTitle}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex justify-center items-center">
          <div className="container flex flex-col items-center justify-center px-4">
            <h1 className="text-white text-3xl text-center font-[600] md:text-4xl xl:text-5xl max-w-3xl leading-tight mt-8 md:mt-0">
              {t('home.hero.title')}
            </h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[60vh] w-full">
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
        style={{
          backgroundImage: `url('${imageUrl}')`
        }}
        role="img"
        aria-label={imageAlt}
        title={imageTitle}
      />
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30" />
      {/* Contenido centrado */}
      <div className="relative h-full flex justify-center items-center">
        <div className="container flex flex-col items-center justify-center px-4">
          {/* Renderizar solo el texto, eliminando etiquetas HTML del backend */}
          <h1 className="text-white text-3xl text-center font-[600] md:text-4xl xl:text-5xl max-w-3xl leading-tight mt-8 md:mt-0">
            {stripHtmlTags(description)}
          </h1>
        </div>
      </div>
    </section>
  );
}