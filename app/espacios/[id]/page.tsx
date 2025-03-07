
"use client"
import { usePathname } from "next/navigation";
import MorteroCal from '../../../public/img/mortero-cal.svg'
import MorteroMonocapa from '../../../public/img/mortero-monocapa.svg'
import MorteroImpreso from '../../../public/img/mortero-impreso.svg'
import Piedra from '../../../public/img/mortero-piedra.svg'
import Union from '../../../public/img/mortero puente union.svg'
import Cola from '../../../public/img/mortero-cola.svg'
import Agua from '../../../public/img/mortero-protector-agua.svg'
import Juntas from '../../../public/img/mortero-juntas.svg'
import Herramientas from '../../../public/img/accerios-y-herramientas.svg'
import { useEffect, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import SpacesPage from "@/app/components/espacios/SpacesPage";


export interface Spaces {
    name: string;
    descripcion: string;
    img: string;
    aplications: string[]
}

export interface Products {
    name: string;
    icon: string | StaticImport
    category: string
}

const products:Products[] =[
    {
        name: 'Mortero monocapa',
        icon: MorteroCal,
        category: "Revestimientos,Revocos y enlucidos,Impermeabilización,Recrecidos,Deshumidificación / hidrofugante,Albañilería,Aislamiento térmico"
    },
    {
        name: 'Mortero impreso',
        icon: MorteroImpreso,
        category: "Revestimientos,Revocos y enlucidos,Impermeabilización,Deshumidificación / hidrofugante,Albañilería,Aislamiento térmico"
    },
    {
        name: 'Mortero cal',
        icon: MorteroMonocapa,
        category: "Revestimientos,Revocos y enlucidos,Impermeabilización,Deshumidificación / hidrofugante,Albañilería,Aislamiento térmico"
    },
    {
        name: 'Mortero piedra',
        icon: Piedra,
        category: "Revestimientos,Revocos y enlucidos,Impermeabilización,Deshumidificación / hidrofugante,Aislamiento térmico"
    },
    {
        name: 'PUENTE DE UNIÓN',
        icon: Union,
        category: "Revestimientos,Revocos y enlucidos,Deshumidificación / hidrofugante,Albañilería,Aislamiento térmico"
    },
    {
        name: 'MORTERO JUNTAS',
        icon: Juntas,
        category: "Baldosas,Impermeabilización"
    },
    {
        name: 'MORTERO AGUAS',
        icon: Agua,
        category: "Impermeabilización,Albañilería"
    },
    {
        name: 'MORTERO COLA',
        icon: Cola,
        category: "Baldosas,Recrecidos,Deshumidificación / hidrofugante"
    },
    {
        name: 'Accesorios y Herramientas',
        icon: Herramientas,
        category: ""
    },
    
]

const data: Spaces[] = [
    {
        name: "Fachadas",
        img: "/img/espacios/fachadas.jpg",
        descripcion: "Las fachadas son uno de los elementos arquitectónicos más visibles y expuestos de un edificio, por lo que requieren soluciones constructivas que combinen  protección, estética y eficiencia. Los revestimientos con mortero monocapa o materiales cerámicos ofrecen una excelente resistencia frente a la humedad, radiación solar y cambios de temperatura. Además, las fachadas ventiladas mejoran el aislamiento térmico, contribuyendo a la eficiencia energética. Los acabados decorativos permiten personalizar el diseño y potenciar el carácter visual de la construcción.",
        aplications: ["Revestimientos", "Revocos y enlucidos", "Albañilería", "Aislamiento térmico", "Impermeabilización", "Deshumidificación / hidrofugante"]

    },
    {
        name: "Terrazas",
        img: "/img/espacios/terrazas.jpg",
        descripcion: "Las terrazas son espacios exteriores que amplían las áreas habitables de las edificaciones. Su construcción requiere soluciones que garanticen impermeabilidad,resistencia al tránsito y durabilidad. El uso de morteros impermeabilizantes y pavimentos antideslizantes es fundamental para proteger la superficie y asegurar un entorno seguro. Además, el diseño arquitectónico puede integrar mobiliario fijo y jardineras para crear ambientes funcionales y confortables. Las terrazas bien diseñadas mejoran la calidad de vida y aportan valor estético a los edificios.",
        aplications: ["Revestimientos", "Revocos y enlucidos", "Albañilería","Baldosas", "Aislamiento térmico", "Impermeabilización", "Deshumidificación / hidrofugante"]


    },
    {
        name: "Balcones",
        img: "/img/espacios/balcones.jpg",
        descripcion: "Los balcones son extensiones arquitectónicas que aportan luz y ventilación a las viviendas. Su construcción debe contemplar soluciones estructurales y revestimientos resistentes a las condiciones climáticas. Los pavimentos antideslizantes y los sistemas de impermeabilización garantizan su durabilidad y seguridad. Además, el uso de barandillas modernas y acabados decorativos permite integrarlos en el diseño general del edificio, mejorando su funcionalidad y estética.",

        aplications: ["Revestimientos", "Revocos y enlucidos", "Albañilería", "Aislamiento térmico","Recrecidos", "Impermeabilización"]


    },
    {
        name: "Paredes",
        img: "/img/espacios/paredes.jpg",
        descripcion: "Las paredes son elementos estructurales y decorativos esenciales en cualquier construcción. Las soluciones constructivas incluyen morteros monocapa para revestimientos exteriores, que ofrecen protección y acabados estéticos en una sola aplicación. Para interiores, los morteros de cal garantizan transpirabilidad y un acabado fino. Las paredes pueden combinarse con elementos decorativos como lucernarios, paneles acústicos o revestimientos cerámicos, mejorando tanto la funcionalidad como el diseño del espacio.",
 
        aplications: ["Revestimientos", "Revocos y enlucidos", "Albañilería", "Baldosas", "Impermeabilización", "Deshumidificación / hidrofugante"]


    },
    {
        name: "Patios y lucernarios",
        img: "/img/espacios/patios y lucernarios.jpg",
        descripcion: "Los patios y lucernarios son soluciones arquitectónicas que mejoran la iluminación y la ventilación natural de los espacios interiores. Los patios requieren pavimentos impermeables y resistentes al tránsito, mientras que los lucernarios deben incorporar materiales transparentes de alta resistencia y sistemas de sellado eficientes. El diseño arquitectónico de estos espacios permite crear ambientes luminosos, confortables y visualmente atractivos, aportando un valor añadido a las edificaciones",

        aplications: ["Revestimientos", "Revocos y enlucidos", "Albañilería","Baldosas", "Recrecidos", "Impermeabilización", "Deshumidificación / hidrofugante"]


    },
    {
        name: "Suelos y pavimentos",
        img: "/img/espacios/pavimentos.jpg",
        descripcion: "Los suelos y pavimentos son fundamentales en cualquier espacio arquitectónico, ya que deben combinar resistencia, estética y funcionalidad. Los morteros autonivelantes y los pavimentos de alta resistencia ofrecen superficies uniformes y duraderas. Para exteriores, los pavimentos antideslizantes e impermeables son esenciales para garantizar seguridad y protección frente a la humedad. Las soluciones constructivas deben adaptarse a las necesidades del espacio, ya sea para tráfico peatonal, vehicular o ambientes decorativos.",

        aplications: ["Baldosas",  "Recrecidos", "Impermeabilización"]


    },
    {
        name: "Cocinas de exterior",
        img: "/img/espacios/cocina exterior.jpg",
        descripcion: `Las cocinas exteriores son espacios diseñados para
disfrutar actividades culinarias al aire libre. Para su
construcción, se requieren materiales resistentes a la
intemperie, como revestimientos cerámicos y
pavimentos antideslizantes. Los morteros
impermeables y las superficies fáciles de limpiar
garantizan su durabilidad y funcionalidad. El diseño
arquitectónico puede integrar zonas de cocción,
almacenaje y comedores al aire libre, creando
ambientes confortables y estéticos para reuniones
sociales.`,

        aplications: ["Revestimientos", "Revocos y enlucidos", "Albañilería ","Baldosas" , "Recrecidos", "Impermeabilización"]


    },
    {
        name: "Piscinas",
        img: "/img/espacios/piscina.jpg",
        descripcion: `Las piscinas requieren soluciones constructivas que
garanticen impermeabilidad, seguridad y estética. Los
morteros específicos para piscinas ofrecen una
excelente resistencia al agua y al cloro, asegurando la
protección de las estructuras. Los revestimientos
antideslizantes en suelos y bordes previenen 
accidentes, mientras que los acabados decorativos
permiten crear ambientes elegantes y personalizados.
La correcta aplicación de sistemas de
impermeabilización y juntas asegura la durabilidad de
la piscina frente a las condiciones climáticas y el uso
intensivo.`,
        aplications: ["Revestimientos", "Albañilería ", "Baldosas"]

    },
]


export default function Espacios() {
    const pathname = usePathname();

    const aplicationEncoded = pathname.split("/").pop();
    const aplication = decodeURIComponent(aplicationEncoded || "");

    const [value, setValues] = useState<Spaces | null>(null);

    useEffect(() => {
        // Busca la coincidencia en el arreglo `data`
        const found = data.find(item => item.name.toLowerCase() === aplication?.toLowerCase());
        setValues(found || null); // Si no se encuentra, se establece `null`
    }, [aplication]);

    return (
        <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32">
            {
                value &&
                <SpacesPage img={value.img} aplications={ value.aplications} descripcion={value.descripcion} aplication={value.name} products={products} />
            }
        </main>
    );
}