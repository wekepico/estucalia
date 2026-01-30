"use client";

import React from "react";
import ServicesGrid from "./components/certificationGrid";
import ProjectHelpSection from "../contacto/ProjectHelpSection";
import SolutionsSection from "../empresa/SolutionsSection";
import { useLanguage } from "@/app/context/LanguageContext";
import { useCertificationsDocumentationPage } from "@/api/useCertificationsDocumentationPage";
import type { Lang } from "@/services/certificationsDocumentationPageService";

export default function CertificacionesPage() {
  const ctx: any = useLanguage();
  const t = ctx?.t;

  // Intentamos sacar el idioma del context sin asumir el nombre exacto:
  const langCandidate = ctx?.lang ?? ctx?.language ?? ctx?.currentLanguage;
  const lang: Lang = ["es", "en", "fr"].includes(langCandidate)
    ? langCandidate
    : "es";

  const { data } = useCertificationsDocumentationPage(lang);

  return (
    <section className="bg-white">
      {/* Featured Image */}
      <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-20 py-20 text-5xl font-[600] text-left items-end flex bg-[#C7C5C5] text-black">
        <div dangerouslySetInnerHTML={{ __html: data?.title ?? "" }} />
      </div>

      {/* Grid documentos */}
      <div className="md:px-15 sm:px-10 px-5 lg:px-20 my-28 ">
        <ServicesGrid documents={data?.documents ?? []} />
      </div>

      {/* Solutions (NO lo modificamos, solo le pasamos props) */}
      <SolutionsSection
        titleHtml={data?.solutions?.title ?? null}
        introHtml={data?.solutions?.description ?? null}
        items={data?.solutions?.items ?? []}
      />

      <ProjectHelpSection />
    </section>
  );
}
