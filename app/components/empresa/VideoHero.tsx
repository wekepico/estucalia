'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function VideoHero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[700px] w-full">
      {/* Video Background */}
      <div className="absolute inset-0 z-0" style={{ height: '100vh' }}>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1590574744313-91d6e3ce9a52?auto=format&fit=crop&q=80"
        >
          <source src="https://uploads.innet.es/videos-estucalia/exterior.mp4" type="video/mp4" />
          {t('common.videoNotSupported')}
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="mx-auto px-4">
          <h1 className="text-white text-2xl md:text-5xl font-[600] max-w-6xl mx-auto leading-tight">
            {t('company.hero.title')}
          </h1>
        </div>
      </div>
    </section>
  );
}