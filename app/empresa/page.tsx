"use client";

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

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-lg">Cargando…</div>
    </div>
  );
}

export default function EmpresaPage() {
  const { t, language } = useLanguage();
  const { data: empresa, isPending, isLoading, isError } = useEmpresa();

  // TanStack Query v5 usa isPending; v4 usa isLoading.
  const loading = (isPending ?? isLoading) && !empresa;

  if (loading) return <PageLoader />;
  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error cargando Empresa
      </div>
    );

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

  // OJO: tu FeaturedCategory trae "name", no "label"
  const solutionItems = (empresa?.solutions?.featured_categories ?? [])
    .filter((c) => c?.slug)
    .map((c) => ({
      slug: c.slug as string,
      label: c.name ?? "",
    }));

  return (
    <main className="min-h-screen">
      <VideoHero />
      <AboutSection />
      <ProductionSection />

      {/* ✅ aquí va EXACTO tu SolutionsSection sin modificarlo */}
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
