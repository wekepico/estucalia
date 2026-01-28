"use client";

import React from "react";
import { HeroSection } from "./sections/HeroSection";
import ProjectHelpSection from "../contacto/ProjectHelpSection";
import InspirationGrid from "../shared/InspirationGrid";

export interface SpacesPageVM {
  aplication: string;
  descripcion: string;
  img: string;
  products: { id: string; name: string; icon: string; appKey: string }[];
  aplications: { key: string; label: string }[];
}

export default function SpacesPage(
  props: SpacesPageVM & {
    onTabChangeFetchIfNeeded: (appKey: string) => void;
  },
) {
  return (
    <>
      <HeroSection
        category={props.aplication}
        description={props.descripcion}
        products={props.products}
        img={props.img}
        aplicaciones={props.aplications}
        onTabChange={props.onTabChangeFetchIfNeeded} // ✅ IMPORTANTÍSIMO
      />

      <InspirationGrid
        uiTitleKey="home.inspiration.title"
        showTitle
        className="mt-20 mb-20"
      />

      <ProjectHelpSection />
    </>
  );
}
