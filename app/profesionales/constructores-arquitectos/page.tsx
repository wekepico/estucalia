// app/constructores-arquitectos/page.tsx
"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useBuildersArchitectsPage } from "@/api/useBuildersArchitectsPage";
import SeoHead from "@/components/SeoHead";
import { useEffect } from "react";
import ConstructoresArquitectosPage from "@/app/components/constructoresArquitectos/ConstructoresArquitectosPage";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse text-lg">Cargando…</div>
    </div>
  );
}

export default function ConstructoresArquitectos() {
  const { language, setLanguage } = useLanguage();
  const { data, isPending, isLoading, isError } = useBuildersArchitectsPage();

  // Guardar idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const loading = (isPending ?? isLoading) && !data;

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
        seo={data?.seo || null}
        url={currentUrl}
        fallbackTitle="Grupo Estucalia | Constructores y Arquitectos"
        fallbackDescription="Soluciones constructivas para profesionales. Morteros de alta calidad para constructores y arquitectos. Asesoramiento técnico especializado."
      />

      <main className="min-h-screen">
        <ConstructoresArquitectosPage />
      </main>
    </>
  );
}
