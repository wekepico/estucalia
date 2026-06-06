"use client";

import React, { useMemo } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useCategories } from "@/api/useCategories";
import type { FinishUI } from "@/services/finishesService";

import {
  HeroSection,
  type HeroViewItem,
} from "../components/acabados/HeroSection";
import InspirationFinishedSection from "../components/acabados/InspirationFinishedSection";
import ProjectHelpSection from "../components/contacto/ProjectHelpSection";
import NewsSection from "../components/home/NewsSection";

type Lang = "es" | "en" | "fr";

function pickLang(
  lang: Lang,
  es: string | null,
  en: string | null,
  fr: string | null,
) {
  if (lang === "es") return es || en || fr || "";
  if (lang === "fr") return fr || en || es || "";
  return en || es || fr || "";
}

interface Props {
  finishes: FinishUI[];
}

export default function AcabadosClient({ finishes }: Props) {
  const { language } = useLanguage() as any;
  const lang: Lang = language || "es";

  // Iconos por slug desde el backend (misma fuente que el menú: cat.image_url)
  const { data: categoriesData } = useCategories();
  const iconBySlug = useMemo(() => {
    const map = new Map<string, string>();
    for (const cat of categoriesData?.data ?? []) {
      if (!cat.image_url) continue;
      for (const s of [cat.slug, cat.slug_es, cat.slug_en, cat.slug_fr]) {
        if (s) map.set(s, cat.image_url);
      }
    }
    return map;
  }, [categoriesData]);

  const heroData: HeroViewItem[] = useMemo(() => {
    return finishes.map((f) => ({
      id: f.id,
      title: pickLang(lang, f.name_es, f.name_en, f.name_fr),
      description: pickLang(
        lang,
        f.description_es,
        f.description_en,
        f.description_fr,
      ),
      image: f.image_url,
      categories: (f.categories || []).map((c) => ({
        slug: c.slug,
        name: pickLang(lang, c.name_es, c.name_en, c.name_fr),
        iconUrl: iconBySlug.get(c.slug) ?? c.icon_url,
      })),
    }));
  }, [finishes, lang, iconBySlug]);

  return (
    <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32">
      <HeroSection data={heroData} />
      <InspirationFinishedSection />
      <NewsSection />
      <ProjectHelpSection />
    </main>
  );
}
