"use client";

import { useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useCertificationsDocumentationPage } from "@/api/useCertificationsDocumentationPage";
import CertificacionesPage from "../../components/certificaciones/CertificationPage";

export default function CertificacionesClient() {
  const { language } = useLanguage();
  const { data, isLoading, isError } = useCertificationsDocumentationPage();

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  if (isLoading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-lg">
          Cargando certificaciones...
        </div>
      </div>
    );
  }

  if (isError && !data) {
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
  }

  return (
    <main className="min-h-screen">
      <CertificacionesPage />
    </main>
  );
}
