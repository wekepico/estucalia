'use client';

import React from 'react';
import ProjectHelpSection from "../contacto/ProjectHelpSection";
import { useLanguage } from "@/app/context/LanguageContext";

const inspirationImages = [
    {
        url: "/convertedImages/image1.webp",
        alt: "Contemporary architecture",
        size: "large"
    },
    {
        url: "/convertedImages/img-8.webp",
        alt: "Urban architecture",
        size: "medium"
    },
    {
        url: "/convertedImages/img-3.webp",
        alt: "Minimalist building design",
        size: "small"
    },
    {
        url: "/convertedImages/img1.webp",
        alt: "Minimalist building design",
        size: "small"
    },
    {
        url: "/convertedImages/aplicaciones/terraza.webp",
        alt: "Modern facade detail",
        size: "full"
    },
    {
        url: "/convertedImages/img-4.webp",
        alt: "Contemporary architecture",
        size: "medium"
    },
    {
        url: "/convertedImages/Home.webp",
        alt: "Urban architecture",
        size: "medium"
    },
    // New images from inspiration folder
    {
        url: "/convertedImages/inspiracion/DSC_0013.webp",
        alt: "Architectural facade detail",
        size: "medium"
    },
    {
        url: "/convertedImages/inspiracion/Fachadas Raspado 012.webp",
        alt: "Scraped facade finish",
        size: "large"
    },
    {
        url: "/convertedImages/inspiracion/Fachadas Raspado 021.webp",
        alt: "Textured wall finish",
        size: "medium"
    },
    {
        url: "/convertedImages/inspiracion/Fachadas Raspado 025.webp",
        alt: "Modern exterior wall texture",
        size: "medium"
    },
    {
        url: "/convertedImages/inspiracion/Fachadas Raspado 028.webp",
        alt: "Architectural wall treatment",
        size: "large"
    },
   
    {
        url: "/convertedImages/inspiracion/Monocapa Impreso 2.webp",
        alt: "Printed monocouche finish",
        size: "large"
    },
    {
        url: "/convertedImages/inspiracion/Monocapa Impreso 9.webp",
        alt: "Decorative concrete texture",
        size: "small"
    },
    {
        url: "/convertedImages/inspiracion/Monocapa Impreso 13.webp",
        alt: "Architectural surface pattern",
        size: "small"
    },
    {
        url: "/convertedImages/inspiracion/Monocouche Pasta Chino 6.webp",
        alt: "Chinese paste finish detail",
        size: "medium"
    },
    {
        url: "/convertedImages/inspiracion/Monocouche Pasta Chino 9.webp",
        alt: "Decorative wall treatment",
        size: "large"
    },
    {
        url: "/convertedImages/inspiracion/Monocouche Pasta Chino 11.webp",
        alt: "Specialty plaster finish",
        size: "medium"
    },
    {
        url: "/convertedImages/inspiracion/Monocouche Pasta Chino 15.webp",
        alt: "Architectural texture detail",
        size: "medium"
    },
    {
        url: "/convertedImages/inspiracion/Monocouche Pasta Chino 27.webp",
        alt: "Contemporary wall finish",
        size: "medium"
    }
];

export default function InspirationPage() {
    const { t } = useLanguage();

    return (
        <section className="bg-white">
            {/* Featured Image */}
            <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-20 pt-20 pb-16 text-5xl font-[600] text-left items-end flex bg-[#ffffff] text-black">
                <h1 className="w-[36rem]">{t("inspiration.title")}</h1>
            </div>

            {/* Image Grid */}
            <div className="md:px-15 sm:px-10 px-5 lg:px-20 grid grid-cols-4 grid-rows-5 pb-28 gap-4">
                {inspirationImages.map((image, index) => (
                    <div
                        key={index}
                        className={`relative overflow-hidden group cursor-pointer
                            ${image.size === 'large' ? 
                                'col-span-2 row-span-2 h-800px' : 
                                image.size === 'full' ? 
                                'col-span-4 row-span-2 h-800px' : 
                             image.size === 'medium' ? 
                                'col-span-2 row-span-1 h-[400px]' : 
                                'col-span-1 row-span-1 h-[400px]'}
                        `}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500"
                            style={{ backgroundImage: `url('${image.url}')` }}
                            role="img"
                            aria-label={image.alt}
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300" />
                    </div>
                ))}
            </div>

            <ProjectHelpSection/>
        </section>
    )
}
