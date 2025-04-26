"use client"
import React from "react";
import { HeroSection } from "./sections/HeroSection";
import { InspirationSectionAplication } from "./sections/InspirationSectionAplication";
import ProjectHelpSection from "../contacto/ProjectHelpSection";
import { Aplication } from "@/app/data/aplicaciones";
import { useLanguage } from "@/app/context/LanguageContext";

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

interface AplicationPageProps {
  aplication: Aplication | null;
}

export default function AplicationPage({ aplication }: AplicationPageProps) {
  const { t } = useLanguage();

  return (
    <React.Fragment>
      <HeroSection 
        category={aplication?.aplication ? t(aplication.aplication) : null}
        description={aplication?.descripcion ? t(aplication.descripcion) : null}
        products={aplication?.products || null}
        img={aplication?.img || null}
      />
      <InspirationSectionAplication images={inspirationImages} />
      <ProjectHelpSection />
    </React.Fragment>
  )
}