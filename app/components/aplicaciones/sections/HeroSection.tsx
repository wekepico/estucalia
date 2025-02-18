import Image from "next/image";
import { ProductCard } from "../../home/components/ProductCard"
import { StaticImport } from "next/dist/shared/lib/get-img-props";


interface Product {
    name: string,
    icon: string | StaticImport

}

interface HeroSectionProps {
    category: string;
    img: string,
    description: string
    products: Product[]
}



export const HeroSection: React.FC<HeroSectionProps> = ({ description, category, products, img }) => {

    return (
        <div className="flex  md:px-15 sm:px-10 px-5 lg:px-20 flex-col gap-28">
            <div className="w-full flex h-[450px]">

                <div className="flex w-2/5 gap-6 bg-gray-200 px-12 py-16 flex-col">
                    <h1 className="font-semibold line-clamp-6 text-5xl">
                        {category}
                    </h1>
                    <p className="text">
                        {description}
                    </p>
                </div>

                <div className="relative w-3/5 bg-slate-500" >
                    <div
                        className="absolute inset-0 bg-cover bg-center "
                        style={{ backgroundImage: `url('${img}')` }}
                    />
                </div>

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
    )
}

