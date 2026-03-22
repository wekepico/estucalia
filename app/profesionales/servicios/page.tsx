// app/servicios-integrales/page.tsx
"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useIntegralProjectsPage } from "@/api/useIntegralProjectsPage";
import SeoHead from "@/components/SeoHead";
import { useEffect } from "react";
import ServiciosIntegralesPage from "../../components/serviciosIntegrales/ServiciosIntegralesPage";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse text-lg">Cargando…</div>
    </div>
  );
}

export default function ServiciosIntegrales() {
  const { language, setLanguage } = useLanguage();
  const { data, isPending, isLoading, isError } = useIntegralProjectsPage();

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
        fallbackTitle="Grupo Estucalia | Servicio Integral de Proyectos"
        fallbackDescription="Gestionamos tu proyecto de construcción de principio a fin. Asesoramiento, materiales, ejecución y control de calidad. Soluciones integrales."
      />

      <main className="min-h-screen">
        <ServiciosIntegralesPage />
      </main>
    </>
  );
}
