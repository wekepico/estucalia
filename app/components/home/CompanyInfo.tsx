'use client';

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function CompanyInfo() {
  const { t } = useLanguage();

  return (
    <section className="min-h-[300px] flex items-center bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-medium mb-4">{t('home.company.title')}</h2>
        </div>
        <p className="text-3xl font-[600] text-gray-800 max-w-2xl mx-auto">
          {t('home.company.description')}
        </p>
      </div>
    </section>
  );
}