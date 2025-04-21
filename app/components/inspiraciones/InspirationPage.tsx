'use client';

import React from 'react';
import ProjectHelpSection from "../contacto/ProjectHelpSection";
import { useLanguage } from "@/app/context/LanguageContext";

const inspirationImages = [
    {
        url: "img/image1.jpg",
        alt: "Contemporary architecture",
        size: "large"
    },
    {
        url: "img/img-8.jpg",
        alt: "Urban architecture",
        size: "medium"
    },
    {
        url: "img/img-3.jpg",
        alt: "Minimalist building design",
        size: "small"
    },
    {
        url: "img/img1.jpg",
        alt: "Minimalist building design",
        size: "small"
    },
    {
        url: "img/aplicaciones/terraza.jpg",
        alt: "Modern facade detail",
        size: "full"
    },
    {
        url: "img/img-4.jpg",
        alt: "Contemporary architecture",
        size: "medium"
    },
    {
        url: "img/Home.jpg",
        alt: "Urban architecture",
        size: "medium"
    },
    // New images from inspiration folder
    {
        url: "img/inspiracion/DSC_0013.jpg",
        alt: "Architectural facade detail",
        size: "medium"
    },
    {
        url: "img/inspiracion/Fachadas Raspado 012.jpg",
        alt: "Scraped facade finish",
        size: "large"
    },
    {
        url: "img/inspiracion/Fachadas Raspado 021.jpg",
        alt: "Textured wall finish",
        size: "medium"
    },
    {
        url: "img/inspiracion/Fachadas Raspado 025.jpg",
        alt: "Modern exterior wall texture",
        size: "medium"
    },
    {
        url: "img/inspiracion/Fachadas Raspado 028.jpg",
        alt: "Architectural wall treatment",
        size: "large"
    },
   
    {
        url: "img/inspiracion/Monocapa Impreso 2.jpg",
        alt: "Printed monocouche finish",
        size: "large"
    },
    {
        url: "img/inspiracion/Monocapa Impreso 9.jpg",
        alt: "Decorative concrete texture",
        size: "small"
    },
    {
        url: "img/inspiracion/Monocapa Impreso 13.jpg",
        alt: "Architectural surface pattern",
        size: "small"
    },
    {
        url: "img/inspiracion/Monocouche Pasta Chino 6.jpg",
        alt: "Chinese paste finish detail",
        size: "medium"
    },
    {
        url: "img/inspiracion/Monocouche Pasta Chino 9.jpg",
        alt: "Decorative wall treatment",
        size: "large"
    },
    {
        url: "img/inspiracion/Monocouche Pasta Chino 11.jpg",
        alt: "Specialty plaster finish",
        size: "medium"
    },
    {
        url: "img/inspiracion/Monocouche Pasta Chino 15.jpg",
        alt: "Architectural texture detail",
        size: "medium"
    },
    {
        url: "img/inspiracion/Monocouche Pasta Chino 27.jpg",
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
