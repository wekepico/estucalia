// app/components/certificaciones/CertificationPage.tsx
"use client";

import React from "react";
import ServicesGrid from "./components/certificationGrid";
import ProjectHelpSection from "../contacto/ProjectHelpSection";
import SolutionsSection from "../empresa/SolutionsSection";
import { useLanguage } from "@/app/context/LanguageContext";
import { useCertificationsDocumentationPage } from "@/api/useCertificationsDocumentationPage";

export default function CertificacionesPage() {
  const { language } = useLanguage();
  const { data, isLoading } = useCertificationsDocumentationPage(); // ✅ Sin parámetro

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-lg">Cargando documentos...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-yellow-500 text-lg">No hay datos disponibles</div>
      </div>
    );
  }

  return (
    <section className="bg-white">
      {/* Title */}
      <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-20 py-20 text-5xl font-[600] text-left items-end flex bg-[#C7C5C5] text-black">
        <div dangerouslySetInnerHTML={{ __html: data.title ?? "" }} />
      </div>

      {/* Grid documentos */}
      <div className="md:px-15 sm:px-10 px-5 lg:px-20 my-28">
        <ServicesGrid documents={data.documents ?? []} />
      </div>

      {/* Solutions Section */}
      <SolutionsSection
        titleHtml={data.solutions?.title ?? null}
        introHtml={data.solutions?.description ?? null}
        items={data.solutions?.items ?? []}
      />

      <ProjectHelpSection />
    </section>
  );
}
