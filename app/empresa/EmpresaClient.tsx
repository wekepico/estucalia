"use client";

import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useEmpresa } from "@/api/useEmpresa";

import VideoHero from "../components/empresa/VideoHero";
import AboutSection from "../components/empresa/AboutSection";
import ProductionSection from "../components/empresa/ProductionSection";
import SolutionsSection from "../components/empresa/SolutionsSection";
import InternationalSection from "../components/empresa/InternationalSection";
import CertificationsSection from "../components/empresa/CertificationsSection";
import ConsultingSection from "../components/empresa/ConsultingSection";
import NewsSection from "../components/home/NewsSection";

export default function EmpresaClient() {
  const { t, language } = useLanguage();
  const { data: empresa, isLoading, isError } = useEmpresa();

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  if (isLoading && !empresa) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Cargando…</div>
      </div>
    );
  }

  if (isError && !empresa) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error cargando Empresa
      </div>
    );
  }

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
