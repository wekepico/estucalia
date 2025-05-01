'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const countries = [
  'Argelia,', 'Marruecos,', 'Kuwait,', 'Arabia Saudí,',
  'Egipto,', 'Qatar,', 'Emiratos,', 'Yemen...'
];

export default function InternationalSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[1100px]  flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
        style={{
          backgroundImage: "url('img/internacionales.jpg')"
        }}
      >

      </div>

      {/* Content */}
      <div className="relative w-full mx-auto  py-40 text-white"
        style={{
          background: "rgba(0, 2, 0, 0.8)", // Fondo negro con opacidad del 80%
        }}
      >
        <div className="max-w-4xl flex flex-col mx-auto  text-center max-sm:px-2">
          <h2 className="text-4xl font-light  mb-4">{t('company.international.title')}</h2>
          <div className='flex flex-col'>
            <p className="text-lg ">
              {t('company.international.description')}
            </p>

            {/* Countries Grid */}
            <div className="flex flex-wrap justify-center  gap-1"
            >
              {countries.map((country, index) => (
                <React.Fragment key={country}>
                  <span className="text-lg font-[600]   transition-colors ">
                    {country}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}