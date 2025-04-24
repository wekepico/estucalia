'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import { ProductCard } from "../../home/components/ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useLanguage } from '@/app/context/LanguageContext';

interface Product {
    id:string,
    name: string;
    icon: string | StaticImport;
    category: string;
}

interface HeroSectionProps {
    category: string;
    img: string;
    description: string;
    products: Product[];
    aplicaciones: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
    description, 
    category, 
    products, 
    img, 
    aplicaciones
}) => {
    const { t } = useLanguage();
    const [selectedAplicacion, setSelectedAplicacion] = useState<string | null>(null);

    // Initialize selectedAplicacion after component mounts to avoid hydration mismatch
    useEffect(() => {
        setSelectedAplicacion(aplicaciones[0]);
    }, [aplicaciones]);

    const filteredProducts = selectedAplicacion 
        ? products.filter(product => product.category.includes(selectedAplicacion))
        : [];

    // Handle null state during initial render
    if (selectedAplicacion === null) {
        return null; // or a loading skeleton
    }

    return (
        <div className="flex flex-col gap-16 md:gap-28 px-5 sm:px-10 md:px-15 lg:px-20">
            {/* Main container */}
            <div className="w-full flex flex-col md:flex-row h-auto md:h-[480px]">
                {/* Text container */}
                <div className="flex w-full md:w-[43%] gap-6 bg-gray-200 px-6 py-8 md:px-12 md:py-16 flex-col">
                    <h1 className="font-semibold sm:text-xl lg:text-4xl md:text-2xl">
                        {category}
                    </h1>
                    <p className="text-base xl:text-lg md:text-sm">
                        {description}
                    </p>
                </div>

                {/* Image container */}
                <div className="relative w-full md:w-[57%] h-64 md:h-auto bg-slate-500">
                    <Image
                        src={img}
                        alt={category}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                        className="object-cover"
                    />
                </div>
            </div>
            
            <div>
                <h2 className="text-2xl font-[600] mb-4 md:mb-6">
                    {t('heroSection.applications')}
                </h2>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    {/* Categories Scroll */}
                    <ScrollArea className="w-full md:flex-1">
                        <div className="flex min-w-max pb-5" role="tablist">
                            {aplicaciones.map((aplicacion) => (
                                <button
                                    key={aplicacion}
                                    role="tab"
                                    aria-selected={selectedAplicacion === aplicacion}
                                    onClick={() => setSelectedAplicacion(aplicacion)}
                                    className={`text-base md:text-xl p-0 mr-3 md:mr-6 pb-1 transition-colors ${
                                        selectedAplicacion === aplicacion 
                                            ? 'border-b-2 border-black font-medium' 
                                            : 'hover:border-b hover:border-gray-400'
                                    }`}
                                >
                                    {aplicacion}
                                </button>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>

                {/* Product Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16">
                    {filteredProducts.map((product) => (
                        <div key={product.name}>
                            <ProductCard 
                                id={product.id}
                                icon={product.icon} 
                                name={product.name} 
                            />
                        </div>
                    ))}
                </div>

                {/* Empty state message */}
                {filteredProducts.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">
                        {t('heroSection.noProducts')}
                    </p>
                )}
            </div>
        </div>
    );
};