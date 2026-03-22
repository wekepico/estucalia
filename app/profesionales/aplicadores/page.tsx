// app/aplicadores/page.tsx
"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useApplicatorsPage } from "@/api/useApplicatorsPage";
import SeoHead from "@/components/SeoHead";
import { useEffect } from "react";
import AplicadoresPage from "../../components/aplicadores/AplicadoresPage";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse text-lg">Cargando…</div>
    </div>
  );
}

export default function Aplicadores() {
  const { language, setLanguage } = useLanguage();
  const { data, isPending, isLoading, isError } = useApplicatorsPage();

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
        fallbackTitle="Grupo Estucalia | Aplicadores"
        fallbackDescription="Formación y soporte técnico para aplicadores profesionales. Conviértete en aplicador certificado de morteros de alta calidad."
      />

      <main className="min-h-screen">
        <AplicadoresPage/>
      </main>
    </>
  );
}
