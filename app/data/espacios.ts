import MorteroCal from '../../public/img/mortero-cal.svg'
import MorteroMonocapa from '../../public/img/mortero-monocapa.svg'
import MorteroImpreso from '../../public/img/mortero-impreso.svg'
import Piedra from '../../public/img/mortero-piedra.svg'
import Union from '../../public/img/mortero puente union.svg'
import Cola from '../../public/img/mortero-cola.svg'
import Agua from '../../public/img/mortero-protector-agua.svg'
import Juntas from '../../public/img/mortero-juntas.svg'
import Herramientas from '../../public/img/accerios-y-herramientas.svg'
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Spaces {
    id:string,
    name: string;
    descripcion: string;
    img: string;
    aplications: string[];
}

export interface Products {
    id: string;
    name: string;
    icon: string | StaticImport;
    category: string;
}

export const products: Products[] = [
    {
        id: "singleLayerMortar",
        name: 'spacesSection.products.monocapa',
        icon: MorteroMonocapa,
        category: "spacesSection.applications.coatings,spacesSection.applications.plasters,spacesSection.applications.waterproofing,spacesSection.applications.screeds,spacesSection.applications.dehumidification,spacesSection.applications.masonry,spacesSection.applications.thermal"
    },
    {
        id: "stampedMortar",
        name: 'spacesSection.products.printed',
        icon: MorteroImpreso,
        category: "spacesSection.applications.coatings,spacesSection.applications.plasters,spacesSection.applications.waterproofing,spacesSection.applications.dehumidification,spacesSection.applications.masonry,spacesSection.applications.thermal"
    },
    {
        id: "limeMortar",
        name: 'spacesSection.products.lime',
        icon: MorteroCal,
        category: "spacesSection.applications.coatings,spacesSection.applications.plasters,spacesSection.applications.waterproofing,spacesSection.applications.dehumidification,spacesSection.applications.masonry,spacesSection.applications.thermal"
    },
    {
        id: "stoneMortar",
        name: 'spacesSection.products.stone',
        icon: Piedra,
        category: "spacesSection.applications.coatings,spacesSection.applications.plasters,spacesSection.applications.waterproofing,spacesSection.applications.dehumidification,spacesSection.applications.thermal"
    },
    {
        id: "bondingBridge",
        name: 'spacesSection.products.union',
        icon: Union,
        category: "spacesSection.applications.coatings,spacesSection.applications.plasters,spacesSection.applications.dehumidification,spacesSection.applications.masonry,spacesSection.applications.thermal"
    },
    {
        id: "groutMortar",
        name: 'spacesSection.products.joint',
        icon: Juntas,
        category: "spacesSection.applications.tiles,spacesSection.applications.waterproofing"
    },
    {
        id: "waterProtector",
        name: 'spacesSection.products.water',
        icon: Agua,
        category: "spacesSection.applications.waterproofing,spacesSection.applications.masonry"
    },
    {
        id: "tileAdhesive",
        name: 'spacesSection.products.adhesive',
        icon: Cola,
        category: "spacesSection.applications.tiles,spacesSection.applications.screeds,spacesSection.applications.dehumidification"
    },
    {
        id: "accessoriesAndTools",
        name: 'spacesSection.products.tools',
        icon: Herramientas,
        category: ""
    }
];

export const data: Spaces[] = [
    {
        id:"facades",
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
        id:"terraces",
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
        id:"balconies",
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
        id:"walls",
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
        id:"patios",
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
        id:"floors",
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
        id:"kitchens",
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
        id:"pools",
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