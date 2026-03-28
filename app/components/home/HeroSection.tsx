"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useHome } from "@/api/useHome";

export default function HeroSection() {
  const { t, language } = useLanguage();
  const { data: home } = useHome();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const heroTitle = home?.hero?.title ?? t("home.hero.title");
  const heroDescription = home?.hero?.description ?? null;

  const imageUrl = home?.hero?.image?.url || "/img/Home.jpg";
  const imageAlt = home?.hero?.image?.alt ?? t("home.hero.imageAlt");
  const imageTitle = home?.hero?.image?.title ?? undefined;

  const Content = (
    <div className="container flex flex-col items-center justify-center px-4">
      {/* Título (igual a tu estructura visual: H1 centrado) */}
      <h1
        className="text-white text-3xl text-center font-[600] md:text-4xl xl:text-5xl max-w-3xl leading-tight mt-8 md:mt-0"
        dangerouslySetInnerHTML={{ __html: heroTitle }}
      />

      {/* Si algún día usas description debajo del título */}
      {heroDescription ? (
        <div
          className="mt-4 text-white/90 text-center max-w-3xl"
          dangerouslySetInnerHTML={{ __html: heroDescription }}
        />
      ) : null}
    </div>
  );

  // Mantengo tu lógica mounted para evitar mismatches
  if (!mounted) {
    return (
      <section className="relative h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
          style={{ backgroundImage: `url('${imageUrl}')` }}
          role="img"
          aria-label={imageAlt}
          title={imageTitle}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex justify-center items-center">
          {Content}
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[60vh] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
        style={{ backgroundImage: `url('${imageUrl}')` }}
        role="img"
        aria-label={imageAlt}
        title={imageTitle}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative h-full flex justify-center items-center">
        {Content}
      </div>
    </section>
  );
}
