// app/certificaciones/page.tsx
"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useCertificationsDocumentationPage } from "@/api/useCertificationsDocumentationPage";
import SeoHead from "@/components/SeoHead";
import { useEffect } from "react";
import CertificacionesPageComponent from "../../components/certificaciones/CertificationPage";
import CertificacionesPage from "../../components/certificaciones/CertificationPage";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse text-lg">Cargando certificaciones...</div>
    </div>
  );
}

export default function Certificaciones() {
  const { language, setLanguage } = useLanguage();
  const { data, isPending, isLoading, isError } =
    useCertificationsDocumentationPage();

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
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error cargando la página</p>
          <button
            className="mt-4 px-4 py-2 bg-black text-white rounded"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
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
        fallbackTitle="Grupo Estucalia | Certificaciones y Documentación"
        fallbackDescription="Certificados de calidad, documentación técnica y fichas de productos. Descarga toda la documentación oficial de Grupo Estucalia."
      />

      <main className="min-h-screen">
        <CertificacionesPage />
      </main>
    </>
  );
}
