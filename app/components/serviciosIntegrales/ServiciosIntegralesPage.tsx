'use client';

import React from 'react';
import ServicesGrid from './components/ServiceGrid';
import ProjectHelpSection from '../contacto/ProjectHelpSection';
import { useLanguage } from '@/app/context/LanguageContext';

export default function Servicios() {
  const { t } = useLanguage();

  return (
    <section className="bg-white">
      {/* Imagen destacada */}
      <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-20 py-20 text-5xl font-[600] text-left items-end flex bg-[#C7C5C5] text-black">
        <h1 className="w-96">{t('services.title')}</h1>
      </div>

      <div className="relative h-[350px] mb-28">
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center"
          style={{ backgroundImage: "url('/img/bg-up.png')" }}
        />
      </div>

      {/* Sección del grid de servicios */}
      <div className="md:px-15 sm:px-10 px-5 lg:px-20">
        <ServicesGrid />
      </div>

      {/* Imagen inferior */}
      <div className="relative h-[250px] md:h-[470px] mt-16 md:mt-28">
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center"
          style={{ backgroundImage: "url('/img/bg-down.png')" }}
        />
      </div>

      <ProjectHelpSection />
    </section>
  );
}
