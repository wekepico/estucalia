import MorteroCal from '../../public/img/mortero-cal.svg'
import MorteroMonocapa from '../../public/img/mortero-monocapa.svg'
import MorteroImpreso from '../../public/img/mortero-impreso.svg'
import Piedra from '../../public/img/mortero-piedra.svg'
import Union from '../../public/img/mortero puente union.svg'
import Cola from '../../public/img/mortero-cola.svg'
import Agua from '../../public/img/mortero-protector-agua.svg'
import Juntas from '../../public/img/mortero-juntas.svg'
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Aplication {
    id: string;
    aplication: string;
    descripcion: string;
    img: string;
    products: {
        id: string;
        name: string;
        icon: string | StaticImport;
    }[];
}

export const data: Aplication[] = [
    {
        id: "coatings",
        aplication: "applications.categories.coatings",
        img: "/img/revestimiento.jpg",
        descripcion: "applications.descriptions.coatings",
        products: [
            {
                id: "singleLayerMortar",
                name: 'products.monocapa',
                icon: MorteroMonocapa
            },
            {
                id: "limeMortar",
                name: 'products.lime',
                icon: MorteroCal
            },
            {
                id: "stampedMortar",
                name: 'products.printed',
                icon: MorteroImpreso
            },
            {
                id: "stoneMortar",
                name: 'products.stone',
                icon: Piedra
            },
            {
                id: "bondingBridge",
                name: 'products.union',
                icon: Union
            },
        ]
    },
    {
        id: "plasters",
        aplication: "applications.categories.plasters",
        img: "/img/revocos_enlucidos.jpg",
        descripcion: "applications.descriptions.plasters",
        products: [
            {
                id: "singleLayerMortar",
                name: 'products.monocapa',
                icon: MorteroMonocapa
            },
            {
                id: "limeMortar",
                name: 'products.lime',
                icon: MorteroCal
            },
            {
                id: "stampedMortar",
                name: 'products.printed',
                icon: MorteroImpreso
            },
            {
                id: "stoneMortar",
                name: 'products.stone',
                icon: Piedra
            },
            {
                id: "bondingBridge",
                name: 'products.union',
                icon: Union
            },
        ]
    },
    {
        id: "masonry",
        aplication: "applications.categories.masonry",
        img: "/img/albañileria.jpg",
        descripcion: "applications.descriptions.masonry",
        products: [
            {
                id: "singleLayerMortar",
                name: 'products.monocapa',
                icon: MorteroMonocapa
            },
            {
                id: "tileAdhesive",
                name: 'products.adhesive',
                icon: Cola
            },
            {
                id: "limeMortar",
                name: 'products.lime',
                icon: MorteroCal
            },
            {
                id: "stampedMortar",
                name: 'products.printed',
                icon: MorteroImpreso
            },
            {
                id: "waterProtector",
                name: 'products.waterProtector',
                icon: Agua
            },
            {
                id: "bondingBridge",
                name: 'products.union',
                icon: Union
            },
        ]
    },
    {
        id: "tiles",
        aplication: "applications.categories.tiles",
        img: "/img/baldosas.jpg",
        descripcion: "applications.descriptions.tiles",
        products: [
            {
                id: "tileAdhesive",
                name: 'products.adhesive',
                icon: Cola
            },
            {
                id: "groutMortar",
                name: 'products.joint',
                icon: Juntas
            }
        ]
    },
    {
        id: "thermalInsulation",
        aplication: "applications.categories.thermal",
        img: "/img/aislamiento.jpg",
        descripcion: "applications.descriptions.thermal",
        products: [
            {
                id: "singleLayerMortar",
                name: 'products.monocapa',
                icon: MorteroMonocapa
            },
            {
                id: "tileAdhesive",
                name: 'products.adhesive',
                icon: Cola
            },
            {
                id: "limeMortar",
                name: 'products.lime',
                icon: MorteroCal
            },
            {
                id: "stampedMortar",
                name: 'products.printed',
                icon: MorteroImpreso
            },
            {
                id: "bondingBridge",
                name: 'products.union',
                icon: Union
            },
        ]
    },
    {
        id: "waterproofing",
        aplication: "applications.categories.waterproofing",
        img: "/img/impermeabilizacion.jpg",
        descripcion: "applications.descriptions.waterproofing",
        products: [
            {
                id: "singleLayerMortar",
                name: 'products.monocapa',
                icon: MorteroMonocapa
            },
            {
                id: "limeMortar",
                name: 'products.lime',
                icon: MorteroCal
            },
            {
                id: "stampedMortar",
                name: 'products.printed',
                icon: MorteroImpreso
            },
            {
                id: "groutMortar",
                name: 'products.joint',
                icon: Juntas
            },
            {
                id: "stoneMortar",
                name: 'products.stone',
                icon: Piedra
            },
            {
                id: "waterProtector",
                name: 'products.waterProtector',
                icon: Agua
            }
        ]
    },
    {
        id: "dehumidification",
        aplication: "applications.categories.dehumidification",
        img: "/img/deshumificacion.jpg",
        descripcion: "applications.descriptions.dehumidification",
        products: [
            {
                id: "singleLayerMortar",
                name: 'products.monocapa',
                icon: MorteroMonocapa
            },
            {
                id: "limeMortar",
                name: 'products.lime',
                icon: MorteroCal
            },
            {
                id: "stampedMortar",
                name: 'products.printed',
                icon: MorteroImpreso
            },
            {
                id: "tileAdhesive",
                name: 'products.adhesive',
                icon: Cola
            }
        ]
    }
]; 