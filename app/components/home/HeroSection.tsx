'use client';

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

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
          <h1 className="text-white text-3xl text-center font-[600] md:text-4xl xl:text-5xl max-w-3xl leading-tight mt-8 md:mt-0">
            {t('home.hero.title')}
          </h1>
        </div>
      </div>
    </section>
  );
}