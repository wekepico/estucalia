
"use client"
import React from "react";
import { HeroSection } from "./sections/HeroSection";

import ProjectHelpSection from "../contacto/ProjectHelpSection";
import { Aplication } from "@/app/aplicaciones/[id]/page";
import { InspirationSectionAplication } from "../aplicaciones/sections/InspirationSectionAplication";
import { StaticImport } from "next/dist/shared/lib/get-img-props";


export interface Spaces{
  aplication:string;
  descripcion:string;
  img:string;
  products:{
    id:string
    name:string;
    icon:string | StaticImport
    category:string
  }[],
  aplications:string[]
}

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



export default function SpacesPage(aplication:Spaces) {


  return (
    <React.Fragment>
      <HeroSection 
        category={aplication.aplication}
        description={aplication.descripcion}
        products={aplication.products}
        img={aplication.img}
        aplicaciones={aplication.aplications}
      />
      <InspirationSectionAplication images={inspirationImages} />
      <ProjectHelpSection />
    </React.Fragment>
  )
}