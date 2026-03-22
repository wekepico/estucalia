// app/politica-cookies/page.tsx
"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useCookiesPolicyPage } from "@/api/useCookiesPolicyPage";
import SeoHead from "@/components/SeoHead";
import { useEffect } from "react";
import CookiesPolicyComponent from "../components/legal/CookiesPolicy";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse text-lg">
        Cargando política de cookies...
      </div>
    </div>
  );
}

export default function CookiesPolicyPage() {
  const { language, setLanguage } = useLanguage();
  const { data, isPending, isLoading, isError, error } = useCookiesPolicyPage();

  console.log("📄 [COOKIES PAGE] data:", data);
  console.log("📄 [COOKIES PAGE] isLoading:", isLoading);
  console.log("📄 [COOKIES PAGE] isError:", isError);

  // Guardar idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const loading = (isPending ?? isLoading) && !data;

  if (loading) return <PageLoader />;

  if (isError) {
    console.error("📄 [COOKIES PAGE] error:", error);
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
        fallbackTitle="Grupo Estucalia | Política de Cookies"
        fallbackDescription="Información sobre el uso de cookies en nuestro sitio web, tipos de cookies, cómo gestionarlas y tu consentimiento."
      />

      <main className="min-h-screen">
        <CookiesPolicyComponent /> {/* ← Usar el componente importado */}
      </main>
    </>
  );
}
