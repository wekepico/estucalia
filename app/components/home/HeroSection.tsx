'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useHome } from '@/api/useHome';

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

  if (!mounted) {
    // Renderizar contenido estático durante SSR
    return (
      <section className="relative h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
          style={{
            backgroundImage: "url('/img/Home.jpg')"
          }}
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
          backgroundImage: "url('/img/Home.jpg')"
        }}
      />
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30" />
      {/* Contenido centrado */}
      <div className="relative h-full flex justify-center items-center">
        <div className="container flex flex-col items-center justify-center px-4">
          {/* Renderizar HTML desde el API o texto estático */}
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    </section>
  );
}