"use client"
import React from "react";
import { HeroSection } from "./sections/HeroSection";
import ProjectHelpSection from "../contacto/ProjectHelpSection";
import { InspirationSectionAplication } from "../aplicaciones/sections/InspirationSectionAplication";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Spaces {
    aplication: string;
    descripcion: string;
    img: string;
    products: {
        id: string;
        name: string;
        icon: string | StaticImport;
        category: string;
    }[];
    aplications: string[];
}

const inspirationImages = [
    {
        url: "/convertedImages/img-1.webp",
        alt: "Modern facade detail"
    },
    {
        url: "/convertedImages/Home.webp",
        alt: "Urban architecture"
    },
    {
        url: "/convertedImages/img-3.webp",
        alt: "Minimalist building design"
    },
    {
        url: "/convertedImages/img-4.webp",
        alt: "Contemporary architecture"
    },
    {
        url: "/convertedImages/img3.webp",
        alt: "Modern facade detail"
    },
    {
        url: "/convertedImages/img-8.webp",
        alt: "Urban architecture"
    },
    {
        url: "/convertedImages/img1.webp",
        alt: "Minimalist building design"
    },
    {
        url: "/convertedImages/image1.webp",
        alt: "Contemporary architecture"
    },
];

export default function SpacesPage(aplication: Spaces) {
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
    );
}