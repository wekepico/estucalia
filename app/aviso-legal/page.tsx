// app/aviso-legal/page.tsx
"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useLegal } from "@/api/useLegal";
import SeoHead from "@/components/SeoHead";
import { useEffect } from "react";
import LegalNotice from "../components/legal/LegalNotice";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse text-lg">Cargando aviso legal...</div>
    </div>
  );
}

export default function AvisoLegalPage() {
  const { language, setLanguage } = useLanguage();
  const { data, isPending, isLoading, isError, error } = useLegal();

  // Guardar idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const loading = (isPending ?? isLoading) && !data;

  if (loading) return <PageLoader />;

  if (isError) {
    console.error("Error loading legal page:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error cargando la página</p>
          <p className="text-sm mt-2 text-gray-600">
            {error?.message || "Error desconocido"}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <SeoHead
        seo={data?.seo || null}
        url={currentUrl}
        fallbackTitle="Grupo Estucalia | Aviso Legal"
        fallbackDescription="Información legal, condiciones de uso, propiedad intelectual y política de privacidad de Grupo Estucalia."
      />

      <main className="min-h-screen">
        <LegalNotice />
      </main>
    </>
  );
}
