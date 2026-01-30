"use client";

import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import type { Lang } from "@/services/contactPageService";
import { useWorkWithUsPage } from "@/api/useWorkWithUsPage";

export default function BottomSection() {
  const langCtx = useLanguage() as any;

  const candidate = langCtx?.lang ?? langCtx?.language ?? "es";
  const lang: Lang = ["es", "en", "fr"].includes(candidate) ? candidate : "es";

  const { data } = useWorkWithUsPage(lang);

  const fallbackBg =
    "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80";

  const bgUrl = data?.hero?.bgImage?.url ?? fallbackBg;

  return (
    <section className="relative h-[60vh] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4"></div>
      </div>
    </section>
  );
}
