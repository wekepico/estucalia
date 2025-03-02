
"use client"
import React from "react";
import { HeroSection } from "./sections/HeroSection";
import { InspirationSectionAplication } from "./sections/InspirationSectionAplication";
import ProjectHelpSection from "../contacto/ProjectHelpSection";
import { Aplication } from "@/app/aplicaciones/[id]/page";





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



export default function AplicationPage(aplication:Aplication) {


  return (
    <React.Fragment>
      <HeroSection category={aplication.aplication}
        description={aplication.descripcion}
        products={aplication.products}
        img={aplication.img}
      />
      <InspirationSectionAplication images={inspirationImages} />
      <ProjectHelpSection />

    </React.Fragment>
  )
}