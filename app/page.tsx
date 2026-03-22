// app/page.tsx (Home page)
"use client";

import { useLanguage } from "./context/LanguageContext";
import { useHome } from "@/api/useHome";
import SeoHead from "@/components/SeoHead";
import { useEffect } from "react";

import HeroSection from "./components/home/HeroSection";
import CompanyInfo from "./components/home/CompanyInfo";
import AplicationSection from "./components/home/AplicationSection";
import FinishesSection from "./components/home/FinishesSection";
import InspirationSection from "./components/home/InspirationSection";
import NewsSection from "./components/home/NewsSection";
import ProjectHelpSection from "./components/contacto/ProjectHelpSection";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-lg">Cargando…</div>
    </div>
  );
}

export default function HomePage() {
  const { language, setLanguage } = useLanguage();
  const { data: home, isPending, isLoading, isError } = useHome();

  // Guardar idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const loading = (isPending ?? isLoading) && !home;

  if (loading) return <PageLoader />;
  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error cargando la página principal
      </div>
    );

  // Obtener URL actual
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      {/* 👇 SEO Dinámico - Se actualiza cuando cambia el idioma */}
      <SeoHead
        seo={home?.seo || null}
        url={currentUrl}
        fallbackTitle="Grupo Estucalia | Morteros de Alta Gama"
        fallbackDescription="Más de 25 años desarrollando y fabricando morteros de alta gama para la construcción. Calidad y experiencia en revestimientos."
      />

      <main className="min-h-screen bg-white">
        <HeroSection />
        <CompanyInfo />
        <ProjectHelpSection />
        <AplicationSection />
        <FinishesSection />
        <InspirationSection />
        <NewsSection />
      </main>
    </>
  );
}
