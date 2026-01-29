'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useEmpresa } from '@/api/useEmpresa';

const countries = [
  'Argelia,', 'Marruecos,', 'Kuwait,', 'Arabia Saudí,',
  'Egipto,', 'Qatar,', 'Emiratos,', 'Yemen...'
];

export default function InternationalSection() {
  const { t, language } = useLanguage();
const { data: empresa } = useEmpresa();

const internationalTitle =
  empresa?.international.title || t("company.international.title");
const internationalText =
  empresa?.international.text || t("company.international.description");

const internationalImage =
  empresa?.international.image || "/img/internacionales.jpg";

const internationalImageAlt =
  empresa?.international.image_alt || t("company.international.title");

const internationalImageTitle = empresa?.international.image_title || undefined;


  return (
    <section className="relative min-h-[1100px]  flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
        style={{
          backgroundImage: `url('${internationalImage}')`
        }}
        role="img"
        aria-label={internationalImageAlt}
        title={internationalImageTitle}
      >

      </div>

      {/* Content */}
      <div className="relative w-full mx-auto  py-40 text-white"
        style={{
          background: "rgba(0, 2, 0, 0.8)", // Fondo negro con opacidad del 80%
        }}
      >
        <div className="max-w-4xl flex flex-col mx-auto  text-center max-sm:px-2">
          <div dangerouslySetInnerHTML={{ __html: internationalTitle }} />
          <div className='flex flex-col'>
            <div dangerouslySetInnerHTML={{ __html: internationalText }} />

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