import Image from "next/image";
import { ProductCard } from "../../home/components/ProductCard";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Product {
    id:string,
    name: string;
    icon: string | StaticImport;
}

interface HeroSectionProps {
    category: string | null;
    img: string | null;
    description: string | null;
    products: Product[] | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ description, category, products, img, }) => {
    return (
        <div className="flex flex-col gap-16 md:gap-28 px-5 sm:px-10 md:px-15 lg:px-20">
            {/* Contenedor principal */}
            <div className="w-full flex flex-col md:flex-row h-auto md:h-[480px]">
                {/* Contenedor de texto */}
                <div className="flex w-full md:w-[43%] gap-6 bg-gray-200 px-6 py-8 md:px-12 md:py-16 flex-col">
                    <h1 className="font-semibold sm:text-xl   lg:text-4xl md:text-2xl">
                        {category}
                    </h1>
                    <p className="text-base xl:text-lg md:text-sm">
                        {description}
                    </p>
                </div>

                {/* Contenedor de la imagen */}
                <div className="relative w-full md:w-[57%] h-64 md:h-auto bg-slate-500">
                    <Image
                        src={img || ""}
                        alt={category || ""}
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0"
                    />
                </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16">
                {products?.map((product) => (
                    <div key={product.name}>
                        <ProductCard id={product.id} icon={product.icon} name={product.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};