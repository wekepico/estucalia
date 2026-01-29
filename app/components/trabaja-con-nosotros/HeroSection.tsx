"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import React from "react";
import type { Lang } from "@/services/contactPageService";
import { useWorkWithUsPage } from "@/api/useWorkWithUsPage";

export default function HeroSection() {
  const langCtx = useLanguage() as any;
  const t = langCtx?.t;
  const lang = (langCtx?.lang ?? langCtx?.language ?? "es") as Lang;

  const { data } = useWorkWithUsPage(lang);

  const fallbackBg =
    "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80";

  const title =
    data?.hero?.title ??
    (t ? t("workWithUs.hero.title") : "Trabaja con nosotros");
  const bgUrl = data?.hero?.bgImage?.url ?? fallbackBg;

  return (
    <section className="relative h-[45vh] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
      </div>

      <div className="relative h-full flex justify-center items-center">
        <div className="container mx-auto px-4 items-center justify-center flex">
          <h1 className="text-white text-4xl md:text-5xl font-[600] text-center max-w-2xl leading-tight">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
