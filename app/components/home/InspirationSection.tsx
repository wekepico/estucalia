"use client";

import React from "react";
import InspirationGrid from "@/app/components/shared/InspirationGrid";
import { useLanguage } from "@/app/context/LanguageContext";

export default function InspirationSection() {
    const { t } = useLanguage();
  return (
    <section className="py-48 bg-white">
      {/* Featured Image */}
      <div className="relative h-[500px] mb-32">
        <div
          className="absolute inset-0 bg-cover sm:bg-fixed bg-center"
          style={{ backgroundImage: "url('/convertedImages/bg-up.webp')" }}
        />
      </div>

      <InspirationGrid
        uiTitleKey="home.inspiration.title"
        showTitle

      />
    </section>
  );
}
