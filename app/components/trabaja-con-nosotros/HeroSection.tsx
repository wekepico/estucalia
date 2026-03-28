"use client";

import React, { useMemo } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import type { Lang } from "@/services/contactPageService";
import { useWorkWithUsPage } from "@/api/useWorkWithUsPage";
import { isHtml, sanitizeBasicHtml } from "./html";

export default function HeroSection() {
  const langCtx = useLanguage() as any;
  const t = langCtx?.t;

  const candidate = langCtx?.lang ?? langCtx?.language ?? "es";
  const lang: Lang = ["es", "en", "fr"].includes(candidate) ? candidate : "es";

  const { data } = useWorkWithUsPage();

  const fallbackBg =
    "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80";

  const rawTitle =
    data?.hero?.title ??
    (t ? t("workWithUs.hero.title") : "Trabaja con nosotros");

  const titleHtml = useMemo(() => {
    if (!isHtml(rawTitle)) return null;
    return sanitizeBasicHtml(rawTitle); // respeta <h1 class="...">
  }, [rawTitle]);

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
          {titleHtml ? (
            <div dangerouslySetInnerHTML={{ __html: titleHtml }} />
          ) : (
            <h1 className="text-white text-4xl md:text-5xl font-[600] text-center max-w-2xl leading-tight">
              {rawTitle}
            </h1>
          )}
        </div>
      </div>
    </section>
  );
}
