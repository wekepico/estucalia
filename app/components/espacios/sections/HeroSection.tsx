import Image from "next/image";
import { ProductCard } from "../../home/components/ProductCard";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


import Link from "next/link";

interface Product {
    name: string;
    icon: string | StaticImport;
}

interface HeroSectionProps {
    category: string;
    img: string;
    description: string;
    products: Product[];
    aplicaciones?: string[]
}

export const HeroSection: React.FC<HeroSectionProps> = ({ description, category, products, img, aplicaciones }) => {
    return (
            <div className="flex flex-col gap-16 md:gap-28 px-5 sm:px-10 md:px-15 lg:px-20">
                {/* Contenedor principal */}
                <div className="w-full flex flex-col md:flex-row h-auto md:h-[450px]">
                    {/* Contenedor de texto */}
                    <div className="flex w-full md:w-2/5 gap-6 bg-gray-200 px-6 py-8 md:px-12 md:py-16 flex-col">
                        <h1 className="font-semibold sm:text-xl   lg:text-4xl md:text-2xl">
                            {category}
                        </h1>
                        <p className="text-base xl:text-lg md:text-sm">
                            {description}
                        </p>
                    </div>

                    {/* Contenedor de la imagen */}
                    <div className="relative w-full md:w-3/5 h-64 md:h-auto bg-slate-500">
                        <Image
                            src={img}
                            alt={category}
                            layout="fill"
                            objectFit="cover"
                            className="absolute inset-0"
                        />
                    </div>
                </div>
                <div className="">
                    <h2 className="text-2xl font-bold mb-4 md:mb-6">Aplicaciones</h2>
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        {/* Categories Scroll */}
                        <ScrollArea className="w-full md:flex-1">
                            <div className="flex min-w-max pb-5">
                                {aplicaciones?.map((category) => (
                                    <div key={category}>
                                        <Link
                                            className='text-base md:text-xl p-0 mr-3 md:mr-6 hover:border-b pb-1 hover:border-black'
                                            href={"/#"}
                                        >
                                            {category}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>


                {/* Product Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16">
                    {products.map((product) => (
                        <div key={product.name}>
                            <ProductCard icon={product.icon} name={product.name} />
                        </div>
                    ))}
                </div>
                </div>

            </div>
    );
};