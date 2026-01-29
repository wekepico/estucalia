'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useEmpresa } from '@/api/useEmpresa';

export default function ProductionSection() {
  const { t, language } = useLanguage();
  const { data: empresa } = useEmpresa();

  const productionTitle =
    empresa?.production.title || t("company.production.stats.title");
  const productionText =
    empresa?.production.text || t("company.production.stats.description");

  const midVideo =
    empresa?.solutions_video_url ||
    "https://uploads.innet.es/videos-estucalia/produccion.mp4";


  return (
    <section className=" text-white">
      {/* Stats Section */}
      <div className=" mx-auto w-full">
        <div className="text-center p-32 max-sm:px-4  bg-black">
          <div dangerouslySetInnerHTML={{ __html: productionTitle }} />
          <div dangerouslySetInnerHTML={{ __html: productionText }} />
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
              <source src={midVideo} type="video/mp4" />
              {t("common.videoNotSupported")}
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}