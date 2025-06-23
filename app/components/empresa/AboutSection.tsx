'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';

import Creatividad from '../../../public/img/creatividad-img.png'


export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Top Section */}
      <section className="relative md:px-15 sm:px-10 px-5 lg:px-20 bg-white">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 max-sm:gap-y-8 items-center">
            {/* Text Content */}
            <div className=''>
              <h2 className="text-3xl font-[600] mb-2">{t('company.about.title')}</h2>
              <p className="text-lg leading-relaxed">
                {t('company.about.description')}
              </p>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="relative  aspect-square">
                <Image
                  src={Creatividad}
                  alt={t('company.about.imageAlt')}
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
          <h3 className="text-3xl font-[600] mb-6">
            {t('company.about.mission.title')}
          </h3>
          <p className="text-lg max-w-2xl mx-auto">
            {t('company.about.mission.description')}
          </p>
        </div>
      </section>
    </div>
  );
}