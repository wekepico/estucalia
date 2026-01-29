"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useEmpresa } from "@/api/useEmpresa";

export default function VideoHero() {
  const { t, language } = useLanguage();

  // Obtener título del API según idioma, o usar traducción estática como fallback
  const { data: empresa } = useEmpresa();

  const title = empresa?.hero.title || t("company.hero.title");
  const videoUrl =
    empresa?.hero.video_url ||
    "https://uploads.innet.es/videos-estucalia/exterior.mp4";
  const poster =
    empresa?.hero.image ||
    "https://images.unsplash.com/photo-1590574744313-91d6e3ce9a52?auto=format&fit=crop&q=80";

  return (
    <section className="relative h-[700px] w-full">
      {/* Video Background */}
      <div className="absolute inset-0 z-0" style={{ height: "100vh" }}>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
        >
          <source src={videoUrl} type="video/mp4" />
          {t("common.videoNotSupported")}
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="mx-auto px-4">
          <div dangerouslySetInnerHTML={{ __html: title }} />
        </div>
      </div>
    </section>
  );
}
