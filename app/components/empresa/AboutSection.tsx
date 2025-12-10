'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';
import { useEmpresa } from '@/api/useEmpresa';

import Creatividad from '../../../public/img/creatividad-img.png'


export default function AboutSection() {
  const { t, language } = useLanguage();
  const { data: empresaData } = useEmpresa();

  // Obtener título About del API según idioma
  const getAboutTitle = () => {
    if (!empresaData) return t('company.about.title');

    switch (language) {
      case 'es':
        return empresaData.about_title_es || t('company.about.title');
      case 'en':
        return empresaData.about_title_en || t('company.about.title');
      case 'fr':
        return empresaData.about_title_fr || t('company.about.title');
      default:
        return empresaData.about_title_es || t('company.about.title');
    }
  };

  // Obtener texto About del API según idioma
  const getAboutText = () => {
    if (!empresaData) return t('company.about.description');

    switch (language) {
      case 'es':
        return empresaData.about_text_es || t('company.about.description');
      case 'en':
        return empresaData.about_text_en || t('company.about.description');
      case 'fr':
        return empresaData.about_text_fr || t('company.about.description');
      default:
        return empresaData.about_text_es || t('company.about.description');
    }
  };

  // Obtener título Mission del API según idioma
  const getMissionTitle = () => {
    if (!empresaData) return t('company.about.mission.title');

    switch (language) {
      case 'es':
        return empresaData.mission_title_es || t('company.about.mission.title');
      case 'en':
        return empresaData.mission_title_en || t('company.about.mission.title');
      case 'fr':
        return empresaData.mission_title_fr || t('company.about.mission.title');
      default:
        return empresaData.mission_title_es || t('company.about.mission.title');
    }
  };

  // Obtener texto Mission del API según idioma
  const getMissionText = () => {
    if (!empresaData) return t('company.about.mission.description');

    switch (language) {
      case 'es':
        return empresaData.mission_text_es || t('company.about.mission.description');
      case 'en':
        return empresaData.mission_text_en || t('company.about.mission.description');
      case 'fr':
        return empresaData.mission_text_fr || t('company.about.mission.description');
      default:
        return empresaData.mission_text_es || t('company.about.mission.description');
    }
  };

  const aboutTitle = getAboutTitle();
  const aboutText = getAboutText();
  const missionTitle = getMissionTitle();
  const missionText = getMissionText();

  return (
    <div>
      {/* Top Section */}
      <section className="relative md:px-15 sm:px-10 px-5 lg:px-20 bg-white">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 max-sm:gap-y-8 items-center">
            {/* Text Content */}
            <div className=''>
              <div dangerouslySetInnerHTML={{ __html: aboutTitle }} />
              <div dangerouslySetInnerHTML={{ __html: aboutText }} />
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="relative  aspect-square">
                <Image
                  src={empresaData?.about_illustration || Creatividad}
                  alt={empresaData?.about_illustration_alt || t('company.about.imageAlt')}
                  title={empresaData?.about_illustration_title || undefined}
                  fill
                  className="object-contain"
                  priority
                />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-36 px-5 bg-[#f1e9e9]">
        <div className="mx-auto  max-sm:px-0 text-center">
          <div dangerouslySetInnerHTML={{ __html: missionTitle }} />
          <div dangerouslySetInnerHTML={{ __html: missionText }} />
        </div>
      </section>
    </div>
  );
}