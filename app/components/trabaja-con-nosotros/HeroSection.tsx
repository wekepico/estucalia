'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import React from 'react';


export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[45vh] w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
      </div>
      <div className="relative h-full flex justify-center items-center">
        <div className="container mx-auto px-4 items-center justify-center flex">
          <h1 className="text-white text-4xl md:text-5xl font-[600] text-center max-w-2xl leading-tight">
            {t('workWithUs.hero.title')}
          </h1>
        </div>
      </div>
    </section>
  );
}