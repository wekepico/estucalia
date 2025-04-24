'use client'
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
import { useLanguage } from '@/app/context/LanguageContext';
import { Loader, Loader2 } from "lucide-react";

export interface Spaces {
    name: string;
    descripcion: string;
    img: string;
    aplications: string[];
}

export interface Products {
    id:string,
    name: string;
    icon: string | StaticImport;
    category: string;
}

const products: Products[] = [
    {
        id:"singleLayerMortar",
        name: 'spacesSection.products.monocapa',
        icon: MorteroCal,
        category: "spacesSection.applications.coatings,spacesSection.applications.plasters,spacesSection.applications.waterproofing,spacesSection.applications.screeds,spacesSection.applications.dehumidification,spacesSection.applications.masonry,spacesSection.applications.thermal"
    },
    {
        id:"stampedMortar",
        name: 'spacesSection.products.printed',
        icon: MorteroImpreso,
        category: "spacesSection.applications.coatings,spacesSection.applications.plasters,spacesSection.applications.waterproofing,spacesSection.applications.dehumidification,spacesSection.applications.masonry,spacesSection.applications.thermal"
    },
    {
        id:"limeMortar",
        name: 'spacesSection.products.lime',
        icon: MorteroMonocapa,
        category: "spacesSection.applications.coatings,spacesSection.applications.plasters,spacesSection.applications.waterproofing,spacesSection.applications.dehumidification,spacesSection.applications.masonry,spacesSection.applications.thermal"
    },
    {
        id:"stoneMortar",
        name: 'spacesSection.products.stone',
        icon: Piedra,
        category: "spacesSection.applications.coatings,spacesSection.applications.plasters,spacesSection.applications.waterproofing,spacesSection.applications.dehumidification,spacesSection.applications.thermal"
    },
    {
        id:"bondingBridge",
        name: 'spacesSection.products.union',
        icon: Union,
        category: "spacesSection.applications.coatings,spacesSection.applications.plasters,spacesSection.applications.dehumidification,spacesSection.applications.masonry,spacesSection.applications.thermal"
    },
    {
        id:"groutMortar",
        name: 'spacesSection.products.joint',
        icon: Juntas,
        category: "spacesSection.applications.tiles,spacesSection.applications.waterproofing"
    },
    {
        id:"waterProtector",
        name: 'spacesSection.products.water',
        icon: Agua,
        category: "spacesSection.applications.waterproofing,spacesSection.applications.masonry"
    },
    {
        id:"tileAdhesive",
        name: 'spacesSection.products.adhesive',
        icon: Cola,
        category: "spacesSection.applications.tiles,spacesSection.applications.screeds,spacesSection.applications.dehumidification"
    },
    {
        id:"accessoriesAndTools",
        name: 'spacesSection.products.tools',
        icon: Herramientas,
        category: ""
    },
];

const data: Spaces[] = [
    {
        name: "spacesSection.spaces.facades",
        img: "/img/espacios/fachadas.jpg",
        descripcion: "spacesSection.descriptions.facades",
        aplications: [
            "spacesSection.applications.coatings",
            "spacesSection.applications.plasters",
            "spacesSection.applications.masonry",
            "spacesSection.applications.thermal",
            "spacesSection.applications.waterproofing",
            "spacesSection.applications.dehumidification"
        ]
    },
    {
        name: "spacesSection.spaces.terraces",
        img: "/img/espacios/terrazas.jpg",
        descripcion: "spacesSection.descriptions.terraces",
        aplications: [
            "spacesSection.applications.coatings",
            "spacesSection.applications.plasters",
            "spacesSection.applications.masonry",
            "spacesSection.applications.tiles",
            "spacesSection.applications.thermal",
            "spacesSection.applications.waterproofing",
            "spacesSection.applications.dehumidification"
        ]
    },
    {
        name: "spacesSection.spaces.balconies",
        img: "/img/espacios/balcones.jpg",
        descripcion: "spacesSection.descriptions.balconies",
        aplications: [
            "spacesSection.applications.coatings",
            "spacesSection.applications.plasters",
            "spacesSection.applications.masonry",
            "spacesSection.applications.thermal",
            "spacesSection.applications.screeds",
            "spacesSection.applications.waterproofing"
        ]
    },
    {
        name: "spacesSection.spaces.walls",
        img: "/img/espacios/paredes.jpg",
        descripcion: "spacesSection.descriptions.walls",
        aplications: [
            "spacesSection.applications.coatings",
            "spacesSection.applications.plasters",
            "spacesSection.applications.masonry",
            "spacesSection.applications.tiles",
            "spacesSection.applications.waterproofing",
            "spacesSection.applications.dehumidification"
        ]
    },
    {
        name: "spacesSection.spaces.patios",
        img: "/img/espacios/patios y lucernarios.jpg",
        descripcion: "spacesSection.descriptions.patios",
        aplications: [
            "spacesSection.applications.coatings",
            "spacesSection.applications.plasters",
            "spacesSection.applications.masonry",
            "spacesSection.applications.tiles",
            "spacesSection.applications.screeds",
            "spacesSection.applications.waterproofing",
            "spacesSection.applications.dehumidification"
        ]
    },
    {
        name: "spacesSection.spaces.floors",
        img: "/img/espacios/pavimentos.jpg",
        descripcion: "spacesSection.descriptions.floors",
        aplications: [
            "spacesSection.applications.tiles",
            "spacesSection.applications.screeds",
            "spacesSection.applications.waterproofing"
        ]
    },
    {
        name: "spacesSection.spaces.kitchens",
        img: "/img/espacios/cocina exterior.jpg",
        descripcion: "spacesSection.descriptions.kitchens",
        aplications: [
            "spacesSection.applications.coatings",
            "spacesSection.applications.plasters",
            "spacesSection.applications.masonry",
            "spacesSection.applications.tiles",
            "spacesSection.applications.screeds",
            "spacesSection.applications.waterproofing"
        ]
    },
    {
        name: "spacesSection.spaces.pools",
        img: "/img/espacios/piscina.jpg",
        descripcion: "spacesSection.descriptions.pools",
        aplications: [
            "spacesSection.applications.coatings",
            "spacesSection.applications.masonry",
            "spacesSection.applications.tiles"
        ]
    }
];

export default function Espacios() {
    const { t } = useLanguage();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);
    const [currentSpace, setCurrentSpace] = useState<Spaces | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    useEffect(() => {
        if (!isMounted) return;

        const spaceEncoded = pathname.split("/").pop();
        const spacePath = decodeURIComponent(spaceEncoded || "");
        
        // Find space by comparing translated values
        const foundSpace = data.find(item => 
            t(item.name).toLowerCase() === spacePath.toLowerCase()
        );

        setCurrentSpace(foundSpace || null);
     
           
   
    }, [pathname, isMounted, t]);


    useEffect(() => {
        if(currentSpace) window.location.href= "/espacios/" + t(currentSpace.name)
    }, [t]);


    if (!isMounted) {
        return (
            <main className="min-h-screen gap-4 flex justify-center items-center bg-white md:pt-28 pt-16 lg:pt-32">
               <Loader width={50} height={50}/>Loading...
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32">
            {currentSpace ? (
                <SpacesPage 
                    img={currentSpace.img} 
                    aplications={currentSpace.aplications.map(app => t(app))}
                    descripcion={t(currentSpace.descripcion)}
                    aplication={t(currentSpace.name)}
                    products={products.map(product => ({
                        ...product,
                        name: t(product.name),
                        category: product.category.split(',').map(cat => t(cat.trim())).join(',')
                    }))} 
                />
            ) : (
                <div className="text-center py-20">
                    <p>{t('spacesSection.common.spaceNotFound')}</p>
                </div>
            )}
        </main>
    );
}