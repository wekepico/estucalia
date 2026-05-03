"use client";

import { useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useApplicatorsPage } from "@/api/useApplicatorsPage";
import AplicadoresPage from "../../components/aplicadores/AplicadoresPage";

export default function AplicadoresClient() {
  const { language } = useLanguage();
  const { data, isLoading, isError } = useApplicatorsPage();

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  // Solo mostramos loader si no tenemos datos del cache prefetched.
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
      <AplicadoresPage />
    </main>
  );
}
