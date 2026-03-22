// app/trabaja-con-nosotros/page.tsx
"use client";

import { useLanguage } from "../context/LanguageContext";
import { useWorkWithUsPage } from "@/api/useWorkWithUsPage";
import SeoHead from "@/components/SeoHead";
import { useEffect } from "react";

import HeroSection from "../components/trabaja-con-nosotros/HeroSection";
import ApplicationForm from "../components/trabaja-con-nosotros/ApplicationForm";
import BottomSection from "../components/trabaja-con-nosotros/BottomSection";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-lg">Cargando…</div>
    </div>
  );
}

export default function TrabajaConNosotrosPage() {
  const { language, setLanguage } = useLanguage();
  const { data: pageData, isPending, isLoading, isError } = useWorkWithUsPage();

  // Guardar idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const loading = (isPending ?? isLoading) && !pageData;

  if (loading) return <PageLoader />;
  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error cargando la página
      </div>
    );

  // Obtener URL actual
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      {/* 👇 SEO Dinámico - Se actualiza cuando cambia el idioma */}
      <SeoHead
        seo={pageData?.seo || null}
        url={currentUrl}
        fallbackTitle="Grupo Estucalia | Trabaja con Nosotros"
        fallbackDescription="Únete a nuestro equipo. Buscamos talento apasionado por la construcción y los morteros de alta calidad. Envía tu CV y forma parte de Grupo Estucalia."
      />

      <main className="min-h-screen bg-white">
        <HeroSection />
        <ApplicationForm />
        <BottomSection />
      </main>
    </>
  );
}
