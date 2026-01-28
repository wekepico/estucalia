"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getFinishes, FinishUI } from "@/services/finishesService";

import {
  HeroSection,
  type HeroViewItem,
} from "../components/acabados/HeroSection";
import InspirationFinishedSection from "../components/acabados/InspirationFinishedSection";
import ProjectHelpSection from "../components/contacto/ProjectHelpSection";
import NewsSection from "../components/home/NewsSection";

import { Loader } from "lucide-react";

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

export default function Acabados() {
  const { language } = useLanguage() as any;
  const lang: Lang = language || "es";

  const [finishes, setFinishes] = useState<FinishUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getFinishes();
        if (mounted) setFinishes(data);
      } catch (e) {
        console.error("Error loading finishes:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // ✅ lo que antes hacías en HeroSection, ahora lo haces aquí
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
        iconUrl: c.icon_url,
      })),
    }));
  }, [finishes, lang]);

  // ✅ Loader global (mismo estilo que usas en aplicaciones)
  if (loading) {
    return (
      <main className="min-h-screen gap-4 flex justify-center items-center bg-white md:pt-28 pt-16 lg:pt-32">
        <Loader className="animate-spin" width={50} height={50} /> Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32">
      <HeroSection data={heroData} />
      <InspirationFinishedSection />
      <NewsSection />
      <ProjectHelpSection />
    </main>
  );
}
