"use client";

import React from "react";
import ConstructorGrid from "./components/ConstructorGrid";
import SolutionsSection from "../empresa/SolutionsSection";
import { useLanguage } from "@/app/context/LanguageContext";
import { useBuildersArchitectsPage } from "@/api/useBuildersArchitectsPage";
import ProjectHelpSection from "../contacto/ProjectHelpSection";

export default function ConstructoresArquitectosPage() {
  const { language } = useLanguage();
  const lang = (["es", "en", "fr"].includes(language) ? language : "es") as
    | "es"
    | "en"
    | "fr";

  const { data, isLoading } = useBuildersArchitectsPage(lang);

  const heroTitle = data?.hero?.title ?? "";
  const heroImage = data?.hero?.image?.url ?? null;
  const bannerImage = data?.banner?.image?.url ?? null;

  const columns = data?.columns?.length ? data.columns : [];

  return (
    <section className="bg-white">
      {/* Title */}
      <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-10 py-10 text-5xl font-[600] text-left items-end flex bg-[#ffffff] text-black">
        <h1 className="w-[37rem]">
          <span dangerouslySetInnerHTML={{ __html: heroTitle }} />
        </h1>
      </div>

      {/* Hero image */}
      <div className="relative h-[500px]">
        <div
          className="absolute inset-0 bg-cover sm:bg-fixed bg-center"
          style={{
            backgroundImage: heroImage ? `url('${heroImage}')` : "none",
          }}
        />
      </div>

      {/* 3 columnas */}
      <div className="md:px-15 pt-28 pb-16 md:pb-28 bg-[#F5ECEB] sm:px-10 px-5 lg:px-20">
        {isLoading ? (
          <div className="h-24" />
        ) : (
          <ConstructorGrid columns={columns} />
        )}
      </div>

      {/* Banner middle */}
      <div className="relative h-[250px] md:h-[720px]">
        <div
          className="absolute inset-0 bg-cover sm:bg-fixed bg-center"
          style={{
            backgroundImage: bannerImage ? `url('${bannerImage}')` : "none",
          }}
        />
      </div>

      {/* ✅ CATEGORÍAS con el MISMO VISUAL */}
      <SolutionsSection
        titleHtml={data?.final?.title ?? null}
        introHtml={data?.final?.description ?? null}
        items={data?.final?.items ?? []}
      />
      <ProjectHelpSection />
    </section>
  );
}
