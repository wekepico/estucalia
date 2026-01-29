"use client";

import { useContactPage } from "@/api/useContactPage";
import ContactForm from "../components/contacto/ContactForm";
import MapSection from "../components/contacto/MapSection";
import ProjectHelpSection from "../components/contacto/ProjectHelpSection";
import { useLanguage } from "@/app/context/LanguageContext";
import type { Lang } from "@/services/contactPageService";

function safeLang(raw: any): Lang {
  const v = (raw?.language ?? raw?.lang ?? "es") as string;
  return (["es", "en", "fr"].includes(v) ? v : "es") as Lang;
}

export default function ContactoPage() {
  const langCtx = useLanguage() as any;
  const lang = safeLang(langCtx);

  const { data } = useContactPage(lang);

  return (
    <main className="min-h-screen bg-white">
      <MapSection embedUrl={data?.map?.embedUrl} />
      <ContactForm pageData={data} />
      {/* Si ProjectHelpSection ya tiene su propio contenido, lo dejamos;
          si quieres que use la CTA del backend, me pasas el componente y te lo adapto sin cambiar el layout */}
      <ProjectHelpSection />
    </main>
  );
}
