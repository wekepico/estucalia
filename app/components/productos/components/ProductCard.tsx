import Image from "next/image"
import { Button } from "../../ui/button"
import { StaticImport } from "next/dist/shared/lib/get-img-props"



interface ProductCardProps {
    name: string,
    icon: string | StaticImport
}



export const ProductCard: React.FC<ProductCardProps> = ({ name, icon }) => {

    return (
        <div className="bg-gray-100 group hover:bg-stone-100 transition-colors">
            <div className=" min-w-[110px] py-4 flex flex-col items-center text-center">
                <div className="flex w-full">

                    <div className="mb-2 w-[28rem] h-[28rem] flex-col gap-4 flex item-center justify-center">
                        <Image
                            src={icon}
                            alt="Logo"
                            width={500}
                            height={500}
                            className="h-40 w-auto"
                        />
                        <h3 className="text-[1rem] font-[600] mb-1">{name.toLocaleUpperCase()}</h3>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}