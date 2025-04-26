'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

interface InspirationSectionProps {
    images: InspirationImages[];
}

interface InspirationImages {
    url: string;
    alt: string;
}

const inspirationImages: InspirationImages[] = [
    {
        url: "img/img-1.jpg",
        alt: "inspiration.images.modernFacade"
    },
    {
        url: "img/home.jpg",
        alt: "inspiration.images.urbanArchitecture"
    },
    {
        url: "img/img-3.jpg",
        alt: "inspiration.images.minimalistDesign"
    },
    {
        url: "img/img-4.jpg",
        alt: "inspiration.images.contemporaryArchitecture"
    },
    {
        url: "img/img3.jpg",
        alt: "inspiration.images.modernFacade"
    },
    {
        url: "img/img-8.jpg",
        alt: "inspiration.images.urbanArchitecture"
    },
    {
        url: "img/img1.jpg",
        alt: "inspiration.images.minimalistDesign"
    },
    {
        url: "img/image1.jpg",
        alt: "inspiration.images.contemporaryArchitecture"
    },
];

export const InspirationSectionAplication: React.FC<InspirationSectionProps> = ({ images }) => {
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <section className="py-32 bg-white">
            <div className="md:px-15 sm:px-10 px-5 lg:px-20 mx-auto">
                <h2 className="text-2xl font-[600] mb-8">{t('home.inspiration.title')}</h2>

                {/* Image Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {images.map((image, index) => (
                        <div 
                            key={index} 
                            className="relative aspect-square overflow-hidden group cursor-pointer"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url('${image.url}')` }}
                                role="img"
                                aria-label={t(image.alt)}
                            />
                            <div className="inset-0 bg-black/0 transition-colors duration-300" />
                        </div>
                    ))} 
                </div>
            </div>
        </section>
    );
}