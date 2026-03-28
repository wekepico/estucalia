"use client";

import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useHome } from "@/api/useHome";

export default function CompanyInfo() {
  const { t, language } = useLanguage();
  const { data: home } = useHome();

  const title = home?.about?.title ?? t("home.company.title");
  const description = home?.about?.description ?? t("home.company.description");

  return (
    <section className="min-h-[300px] flex items-center bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <div dangerouslySetInnerHTML={{ __html: title }} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </section>
  );
}
