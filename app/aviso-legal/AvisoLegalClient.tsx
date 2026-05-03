"use client";

import { useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLegal } from "@/api/useLegal";
import LegalNotice from "../components/legal/LegalNotice";

export default function AvisoLegalClient() {
  const { language } = useLanguage();
  const { data, isLoading, isError, error } = useLegal();

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  // Solo bloqueamos si NO tenemos datos del cache prefetched.
  if (isLoading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-lg">Cargando aviso legal...</div>
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
      <LegalNotice />
    </main>
  );
}
