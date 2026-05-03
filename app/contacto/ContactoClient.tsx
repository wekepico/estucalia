"use client";

import { useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useContactPage } from "@/api/useContactPage";

import ContactForm from "../components/contacto/ContactForm";
import MapSection from "../components/contacto/MapSection";
import ProjectHelpSection from "../components/contacto/ProjectHelpSection";

export default function ContactoClient() {
  const { language } = useLanguage();
  const { data: pageData, isLoading, isError } = useContactPage();

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  if (isLoading && !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Cargando…</div>
      </div>
    );
  }

  if (isError && !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error cargando la página de contacto
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <MapSection embedUrl={pageData?.map?.embedUrl} />
      <ContactForm pageData={pageData} />
      <ProjectHelpSection />
    </main>
  );
}
