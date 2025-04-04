'use client';

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative flex items-center">
      <div className=" mx-auto px-4">
          <h1 className="text-3xl text-center md:text-5xl font-[600] lg:mb-6">{t('blog.hero.title')}</h1>
      </div>
    </section>
  );
}