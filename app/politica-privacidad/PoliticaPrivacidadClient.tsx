"use client";

import { useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { usePrivacyPolicyPage } from "@/api/usePrivacyPolicyPage";
import PrivacyPolicy from "../components/legal/PrivacyPolicy";

export default function PoliticaPrivacidadClient() {
  const { language } = useLanguage();
  const { data, isLoading, isError, error } = usePrivacyPolicyPage();

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  if (isLoading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-lg">
          Cargando política de privacidad...
        </div>
      </div>
    );
  }

  if (isError && !data) {
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

  return (
    <main className="min-h-screen">
      <PrivacyPolicy />
    </main>
  );
}
