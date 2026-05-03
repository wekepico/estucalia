"use client";

import { useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useIntegralProjectsPage } from "@/api/useIntegralProjectsPage";
import ServiciosIntegralesPage from "../../components/serviciosIntegrales/ServiciosIntegralesPage";

export default function ServiciosClient() {
  const { language } = useLanguage();
  const { data, isLoading, isError } = useIntegralProjectsPage();

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  if (isLoading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-lg">Cargando…</div>
      </div>
    );
  }

  if (isError && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error cargando la página
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <ServiciosIntegralesPage />
    </main>
  );
}
