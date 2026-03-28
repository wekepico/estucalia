"use client";

import React from "react";
import ServicesGrid from "./components/ServiceGrid";
import ProjectHelpSection from "../contacto/ProjectHelpSection";
import { useLanguage } from "@/app/context/LanguageContext";
import { useIntegralProjectsPage } from "@/api/useIntegralProjectsPage";

export default function ServiciosIntegralesPage() {
  const { language } = useLanguage();
  const lang = (["es", "en", "fr"].includes(language) ? language : "es") as
    | "es"
    | "en"
    | "fr";

  const { data, isLoading } = useIntegralProjectsPage();

  const heroTitle = data?.hero?.title ?? "";
  const heroImage = data?.hero?.image?.url ?? null;
  const bannerImage = data?.banner?.image?.url ?? null;

  return (
    <section className="bg-white">
      {/* Imagen destacada (MISMO ESTILO) */}
      <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-20 py-20 text-5xl font-[600] text-left items-end flex bg-[#C7C5C5] text-black">
        <h1 className="w-[28rem] line-clamp-2">
          <span dangerouslySetInnerHTML={{ __html: heroTitle }} />
        </h1>
      </div>

      {/* HERO IMAGE (antes era bg-up.png) */}
      <div className="relative h-[350px] mb-28">
        <div
          className="absolute inset-0 bg-cover sm:bg-fixed bg-center"
          style={{
            backgroundImage: heroImage ? `url('${heroImage}')` : "none",
          }}
        />
      </div>

      {/* Sección del grid de servicios (MISMO ESTILO) */}
      <div className="md:px-15 sm:px-10 px-5 lg:px-20">
        {isLoading ? (
          <div className="h-24" />
        ) : (
          <ServicesGrid cards={data?.cards ?? []} />
        )}
      </div>

      {/* Imagen inferior (antes era bg-down.png) */}
      <div className="relative h-[250px] md:h-[470px] mt-16 md:mt-28">
        <div
          className="absolute inset-0 bg-cover sm:bg-fixed bg-center"
          style={{
            backgroundImage: bannerImage ? `url('${bannerImage}')` : "none",
          }}
        />
      </div>

      <ProjectHelpSection />
    </section>
  );
}
