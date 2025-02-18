import Image from "next/image"
import { Button } from "../../ui/button"
import { StaticImport } from "next/dist/shared/lib/get-img-props"



interface ProductCardProps {
    name: string,
    icon: string  | StaticImport
}



export const ProductCard: React.FC<ProductCardProps> = ({ name, icon }) => {

    return (
        <div className="bg-stone-50 group hover:bg-stone-100 transition-colors">
            <div className="px-4 py-8 md:px-8 md:py-16 lg:px-16 lg:py-20 flex flex-col items-center text-center">
                <div className="mb-4 md:mb-6">
                    <Image
                        src={icon}
                        alt="Logo"
                        width={180}
                        height={100}
                        className="h-32 md:h-48 w-auto"
                    />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1">{name.toLocaleUpperCase()}</h3>
            </div>
            <div className='w-full p-4 flex justify-end'>
                <Button
                    variant="ghost"
                    className="p-0 h-auto hover:bg-transparent group-hover:text-black text-base md:text-lg"
                >
                    <span className="mr-2">Ver producto</span>
                    <svg
                        className="w-10 h-10 md:w-12 md:h-12 transform transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={0.5}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Button>
            </div>
        </div>
    )
}