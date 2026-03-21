// app/empresa/page.tsx (Client Component - VERSIÓN CORREGIDA)
"use client";

import { useLanguage } from "../context/LanguageContext";
import { useEmpresa } from "@/api/useEmpresa";
import SeoHead from "@/components/SeoHead"; // 👈 Importar componente SEO
import { useEffect } from "react";

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
  const { t, language, setLanguage } = useLanguage();
  const { data: empresa, isPending, isLoading, isError } = useEmpresa();

  // 👇 Guardar idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

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
  const solutionItems = (empresa?.solutions?.featured_categories ?? [])
    .filter((c) => c?.slug)
    .map((c) => ({
      slug: c.slug as string,
      label: c.label ?? "",
    }));

  // 👇 Obtener URL actual
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      {/* 👇 SEO Dinámico - Se actualiza cuando cambia el idioma */}
      <SeoHead
        seo={empresa?.seo || null}
        url={currentUrl}
        fallbackTitle="Grupo Estucalia | Empresa"
        fallbackDescription="Conoce nuestra historia, misión y valores. Más de 25 años de experiencia en morteros de alta gama."
      />

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
    </>
  );
}
