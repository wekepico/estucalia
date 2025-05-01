'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../../context/LanguageContext';
import Link from 'next/link';

export default function ConsultingSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
        style={{
          backgroundImage: `url(/img/asesoramiento.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-[600] mb-8">
            {t('company.consulting.title')}
          </h2>

          <p className="text-xl mb-12 leading-relaxed">
            {t('company.consulting.description')}
          </p>

          <Link href="/contacto">
            <Button variant="outline" className="border-gray-200 pl-5  pr-0  md:py-6 bg-transparent hover:text-black border-solid rounded-none">
              <span>{t('company.consulting.button')}</span>
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