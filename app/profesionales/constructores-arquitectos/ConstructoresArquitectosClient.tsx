"use client";

import { useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useBuildersArchitectsPage } from "@/api/useBuildersArchitectsPage";
import ConstructoresArquitectosPage from "@/app/components/constructoresArquitectos/ConstructoresArquitectosPage";

export default function ConstructoresArquitectosClient() {
  const { language } = useLanguage();
  const { data, isLoading, isError } = useBuildersArchitectsPage();

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
      <ConstructoresArquitectosPage />
    </main>
  );
}
