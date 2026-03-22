// app/contacto/page.tsx
"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useContactPage } from "@/api/useContactPage";
import SeoHead from "@/components/SeoHead";
import { useEffect } from "react";

import ContactForm from "../components/contacto/ContactForm";
import MapSection from "../components/contacto/MapSection";
import ProjectHelpSection from "../components/contacto/ProjectHelpSection";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-lg">Cargando…</div>
    </div>
  );
}

export default function ContactoPage() {
  const { language, setLanguage } = useLanguage();
  const { data: pageData, isPending, isLoading, isError } = useContactPage();

  // Guardar idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const loading = (isPending ?? isLoading) && !pageData;

  if (loading) return <PageLoader />;
  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error cargando la página de contacto
      </div>
    );

  // Obtener URL actual
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      {/* 👇 SEO Dinámico - Se actualiza cuando cambia el idioma */}
      <SeoHead
        seo={pageData?.seo || null}
        url={currentUrl}
        fallbackTitle="Grupo Estucalia | Contacto"
        fallbackDescription="Contacta con nosotros para consultas, proyectos o solicitar información sobre nuestros morteros y revestimientos. Estamos en Murcia, España."
      />

      <main className="min-h-screen bg-white">
        <MapSection embedUrl={pageData?.map?.embedUrl} />
        <ContactForm pageData={pageData} />
        <ProjectHelpSection />
      </main>
    </>
  );
}
