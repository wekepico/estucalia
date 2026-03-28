"use client";

import React from "react";
import ServicesGrid from "./components/AplicantGrid";
import ProjectHelpSection from "../contacto/ProjectHelpSection";
import ApplicationForm from "./components/AplicationForm";
import { useLanguage } from "@/app/context/LanguageContext";
import { useApplicatorsPage } from "@/api/useApplicatorsPage";

export default function AplicadoresPage() {
  const { language } = useLanguage();
  // const lang = (["es", "en", "fr"].includes(language) ? language : "es") as
  //   | "es"
  //   | "en"
  //   | "fr";

  const { data, isLoading } = useApplicatorsPage();

  const heroTitle = data?.hero?.title ?? "";
  const heroImage = data?.hero?.image?.url ?? null;
  const bannerImage = data?.banner?.image?.url ?? null;

  const columns = data?.columns?.length ? data.columns : [];

  return (
    <section className="bg-white">
      {/* Featured Image */}
      <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-20 py-20 text-5xl font-[600] text-left items-end flex bg-[#ffffff] text-black">
        <h1 className="w-[36rem]">
          <span dangerouslySetInnerHTML={{ __html: heroTitle }} />
        </h1>
      </div>

      <div className="relative h-[500px]">
        <div
          className="absolute inset-0 bg-cover sm:bg-fixed bg-center"
          style={{
            backgroundImage: heroImage ? `url('${heroImage}')` : "none",
          }}
        />
      </div>

      {/* 3 cards */}
      <div className="md:px-15 pt-28 pb-16 md:pb-28 bg-[#F5ECEB] sm:px-10 px-5 lg:px-20">
        {isLoading ? (
          <div className="h-24" />
        ) : (
          <ServicesGrid columns={columns} />
        )}
      </div>

      {/* Banner */}
      <div className="relative h-[250px] md:h-[720px]">
        <div
          className="absolute inset-0 bg-cover sm:bg-fixed bg-center"
          style={{
            backgroundImage: bannerImage ? `url('${bannerImage}')` : "none",
          }}
        />
      </div>

      {/* Final (beneficios + form) */}
      <ApplicationForm
        titleHtml={data?.final?.title ?? null}
        introHtml={data?.final?.description ?? null}
        benefits={data?.final?.benefits ?? []}
        privacyText={data?.final?.form?.privacy ?? null}
        checkbox1Label={data?.final?.form?.checkbox1 ?? null}
        checkbox2Label={data?.final?.form?.checkbox2 ?? null}
      />

      <ProjectHelpSection />
    </section>
  );
}
