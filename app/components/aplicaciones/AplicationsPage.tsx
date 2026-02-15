"use client"
import React from "react";
import { HeroSection } from "./sections/HeroSection";
import { InspirationSectionAplication } from "./sections/InspirationSectionAplication";
import ProjectHelpSection from "../contacto/ProjectHelpSection";
import { Aplication } from "@/app/data/aplicaciones";
import { useLanguage } from "@/app/context/LanguageContext";
import InspirationGrid from "../shared/InspirationGrid";

const inspirationImages = [
  {
    url: "/img/img-1.jpg",
    alt: "Modern facade detail"
  },
  {
    url: "/img/Home.jpg",
    alt: "Urban architecture"
  },
  {
    url: "/img/img-3.jpg",
    alt: "Minimalist building design"
  },
  {
    url: "/img/img-4.jpg",
    alt: "Contemporary architecture"
  },
  {
    url: "/img/img3.jpg",
    alt: "Modern facade detail"
  },
  {
    url: "/img/img-8.jpg",
    alt: "Urban architecture"
  },
  {
    url: "/img/img1.jpg",
    alt: "Minimalist building design"
  },
  {
    url: "/img/image1.jpg",
    alt: "Contemporary architecture"
  },
];

// En el archivo del componente AplicationPage
interface AplicationPageProps {
  aplication: (Aplication & { icon?: string }) | null; // <-- MODIFICA ESTA LÍNEA
  backendData?: any;
}

export default function AplicationPage({ aplication, backendData }: AplicationPageProps) {
  const { t } = useLanguage();

  return (
    <React.Fragment>
      <HeroSection
        category={
          backendData
            ? (aplication?.aplication ?? null)
            : aplication?.aplication
              ? t(aplication.aplication)
              : null
        }
        description={
          backendData
            ? (aplication?.descripcion ?? null)
            : aplication?.descripcion
              ? t(aplication.descripcion)
              : null
        }
        products={aplication?.products ?? null}
        img={(aplication as any)?.img ?? (aplication as any)?.icon ?? null}
        imageAlt={
          backendData
            ? aplication?.image_alt || aplication?.aplication
            : aplication?.aplication
              ? t(aplication.aplication)
              : null
        }
        imageTitle={
          backendData
            ? aplication?.image_title || aplication?.aplication
            : aplication?.aplication
              ? t(aplication.aplication)
              : null
        }
      />
      <InspirationGrid
        uiTitleKey="home.inspiration.title"
        showTitle
        className="mt-20 mb-20"
      />
      <ProjectHelpSection />
    </React.Fragment>
  );
}