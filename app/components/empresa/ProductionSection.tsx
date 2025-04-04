'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function ProductionSection() {
  const { t } = useLanguage();

  return (
    <section className=" text-white">
      {/* Stats Section */}
      <div className=" mx-auto w-full">
        <div className="text-center p-32 max-sm:px-4  bg-black">
          <h2 className="text-4xl font-[600] mb-8">{t('company.production.stats.title')}</h2>
          <p className="text-xl max-w-3xl mx-auto">
            {t('company.production.stats.description')}
          </p>
        </div>

        {/* Video Section */}
        <div className="relative">
          <div className="relative aspect-video object-cover mx-auto overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1590574744313-91d6e3ce9a52?auto=format&fit=crop&q=80"
            >
              <source src="https://uploads.innet.es/videos-estucalia/produccion.mp4" type="video/mp4" />
              {t('common.videoNotSupported')}
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}