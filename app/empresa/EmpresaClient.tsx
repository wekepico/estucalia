// app/empresa/EmpresaClient.tsx
"use client";

import { useLanguage } from "../context/LanguageContext";
import { EmpresaPageResponse } from "@/services/empresaService";
import VideoHero from "../components/empresa/VideoHero";
import AboutSection from "../components/empresa/AboutSection";
import ProductionSection from "../components/empresa/ProductionSection";
import SolutionsSection from "../components/empresa/SolutionsSection";
import InternationalSection from "../components/empresa/InternationalSection";
import CertificationsSection from "../components/empresa/CertificationsSection";
import ConsultingSection from "../components/empresa/ConsultingSection";
import NewsSection from "../components/home/NewsSection";
import { useEffect, useRef } from "react";

export default function EmpresaClient({
  initialData,
  lang,
}: {
  initialData: EmpresaPageResponse;
  lang: string;
}) {
  const { language, setLanguage } = useLanguage();
  const hasInitialized = useRef(false); // 👈 Prevenir múltiples actualizaciones

  // Sincronizar idioma con la URL SOLO UNA VEZ al inicio
  useEffect(() => {
    if (!hasInitialized.current && lang !== language) {
      hasInitialized.current = true;
      setLanguage(lang);
    }
  }, [lang, language, setLanguage]);

  const empresa = initialData;

  // 👇 Obtener la función t del contexto
  const { t } = useLanguage();

  const pick = (
    es?: string | null,
    en?: string | null,
    fr?: string | null,
    fallback?: string,
  ) => {
    if (language === "en") return en || es || fallback || "";
    if (language === "fr") return fr || es || fallback || "";
    return es || fallback || "";
  };

  const solutionsTitle =
    empresa?.solutions?.title || t("company.solutions.title");
  const solutionsIntro =
    empresa?.solutions?.intro || t("company.solutions.description");
  const solutionItems = (empresa?.solutions?.featured_categories ?? [])
    .filter((c) => c?.slug)
    .map((c) => ({
      slug: c.slug as string,
      label: c.label ?? "",
    }));

  return (
    <main className="min-h-screen">
      <VideoHero />
      <AboutSection />
      <ProductionSection />
      <SolutionsSection
        titleHtml={solutionsTitle}
        introHtml={solutionsIntro}
        items={solutionItems}
      />
      <InternationalSection />
      <CertificationsSection />
      <ConsultingSection />
      <NewsSection />
    </main>
  );
}
