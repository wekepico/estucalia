import Image from "next/image"
import { Button } from "../../ui/button"
import { StaticImport } from "next/dist/shared/lib/get-img-props"



interface ProductCardProps {
    id:string
    name: string,
    icon: string  | StaticImport
}



export const ProductCard: React.FC<ProductCardProps> = ({ name, icon,id }) => {

    return (
        <div 
            className="bg-gray-100 group hover:bg-stone-300 transition-colors cursor-pointer"
            onClick={()=>{window.location.href = "/producto/"+id}}
        >
            <div className=" min-w-[140px]  py-4 flex flex-col items-center text-center">
                <div className="mb-2">
                    <Image
                        src={icon}
                        alt="Logo"
                        width={180}
                        height={100}
                        className="h-14 md:h-14 w-auto"
                    />
                </div>
                <h3 title={name} className="text-[0.6rem] font-[600] mb-1 max-w-[min-content] line-clamp-2">{name.toLocaleUpperCase()}</h3>
            </div>
        </div>
    )
}