"use client"
import AplicationPage from "@/app/components/aplicaciones/AplicationsPage";
import { usePathname } from "next/navigation";
import MorteroCal from '../../../public/img/mortero-cal.svg'
import MorteroMonocapa from '../../../public/img/mortero-monocapa.svg'
import MorteroImpreso from '../../../public/img/mortero-impreso.svg'
import Piedra from '../../../public/img/mortero-piedra.svg'
import Union from '../../../public/img/mortero puente union.svg'
import Cola from '../../../public/img/mortero-cola.svg'
import Agua from '../../../public/img/mortero-protector-agua.svg'
import Juntas from '../../../public/img/mortero-juntas.svg'
import { useEffect, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useLanguage } from '@/app/context/LanguageContext';


export interface Aplication{
  id:string
  aplication:string;
  descripcion:string;
  img:string;
  products:{
    id:string,
    name:string;
    icon:string | StaticImport
  }[]
}




export default function Aplicaciones() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const aplicationEncoded = pathname.split("/").pop();
  const aplication = decodeURIComponent(aplicationEncoded || "");

  const [value, setValues] = useState<Aplication | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);


  const data: Aplication[] = [
    {
      id: "coatings",
      aplication: t("applications.categories.coatings"),
      img: "/img/revestimiento.jpg",
      descripcion: t("applications.descriptions.coatings"),
      products: [
        {
          id:"singleLayerMortar",
          name: t('products.monocapa'),
          icon:MorteroMonocapa 
        },
        {
          id:"limeMortar",
          name: t('products.lime'),
          icon: MorteroCal
        },
        {
          id:"stampedMortar",
          name: t('products.printed'),
          icon: MorteroImpreso
        },
        {
          id:"stoneMortar",
          name: t('products.stone'),
          icon: Piedra
        },
        {
          id:"bondingBridge",
          name: t('products.union'),
          icon: Union
        },
      ]
    },
    {
      id: "plasters",
      aplication: t("applications.categories.plasters"),
      img: "/img/revocos_enlucidos.jpg",
      descripcion: t("applications.descriptions.plasters"),
      products: [
        {
          id:"singleLayerMortar",
          name: t('products.monocapa'),
          icon: MorteroMonocapa
        },
        {
          id:"limeMortar",
          name: t('products.lime'),
          icon:  MorteroCal
        },
        {
          id:"stampedMortar",
          name: t('products.printed'),
          icon: MorteroImpreso
        },
        {
          id:"stoneMortar",
          name: t('products.stone'),
          icon: Piedra
        },
        {
          id:"bondingBridge",
          name: t('products.union'),
          icon: Union
        },
      ]
    },
    {
      id: "masonry",
      aplication: t("applications.categories.masonry"),
      img: "/img/albañileria.jpg",
      descripcion: t("applications.descriptions.masonry"),
      products: [
        {
          id:"singleLayerMortar",
          name: t('products.monocapa'),
          icon: MorteroMonocapa
        },
        {
          id:"tileAdhesive",
          name: t('products.adhesive'),
          icon: Cola
        },
        {
          id:"limeMortar",
          name: t('products.lime'),
          icon: MorteroMonocapa
        },
        {
          id:"stampedMortar",
          name: t('products.printed'),
          icon: MorteroImpreso
        },
        {
          id:"waterProtector",
          name: t('products.waterProtector'),
          icon: Agua
        },
        {
          id:"bondingBridge",
          name: t('products.union'),
          icon: Union
        },
      ]
    },
    {
      id: "tiles",
      aplication: t("applications.categories.tiles"),
      img: "/img/baldosas.jpg",
      descripcion: t("applications.descriptions.tiles"),
      products: [
        {
          id:"tileAdhesive",
          name: t('products.adhesive'),
          icon: Cola
        },
        {
          id:"groutMortar",
          name: t('products.joint'),
          icon: Juntas
        }
      ]
    },
    {
      id: "screeds",
      aplication: t("applications.categories.screeds"),
      img: "/img/recrecidos.jpg",
      descripcion: t("applications.descriptions.screeds"),
      products: [
        {
          id:"singleLayerMortar",
          name: t('products.monocapa'),
          icon: MorteroMonocapa
        },
        {
          id:"tileAdhesive",
          name: t('products.adhesive'),
          icon: Cola
        }
      ]
    },
    {
      id: "thermalInsulation",
      aplication: t("applications.categories.thermal"),
      img: "/img/aislamiento.jpg",
      descripcion: t("applications.descriptions.thermal"),
      products: [
        {
          id:"singleLayerMortar",
          name: t('products.monocapa'),
          icon: MorteroMonocapa
        },
        {
          id:"tileAdhesive",
          name: t('products.adhesive'),
          icon: Cola
        },
        {
          id:"limeMortar",
          name: t('products.lime'),
          icon: MorteroCal
        },
        {
          id:"stampedMortar",
          name: t('products.printed'),
          icon: MorteroImpreso
        },
        {
          id:"bondingBridge",
          name: t('products.union'),
          icon: Union
        },
      ]
    },
    {
      id: "waterproofing",
      aplication: t("applications.categories.waterproofing"),
      img: "/img/impermeabilizacion.jpg",
      descripcion: t("applications.descriptions.waterproofing"),
      products: [
        {
          id:"singleLayerMortar",
          name: t('products.monocapa'),
          icon: MorteroMonocapa
        },
        {
          id:"limeMortar",
          name: t('products.lime'),
          icon: MorteroCal
        },
        {
          id:"stampedMortar",
          name: t('products.printed'),
          icon: MorteroImpreso
        },
        {
          id:"groutMortar",
          name: t('products.joint'),
          icon: Juntas
        },
        {
          id:"stoneMortar",
          name: t('products.stone'),
          icon: Piedra
        },
        {
          id:"waterProtetor",
          name: t('products.waterProtector'),
          icon: Agua
        },
      ]
    },
    {
      id: "dehumidification",
      aplication: t("applications.categories.dehumidification"),
      img: "/img/deshumificacion.jpg",
      descripcion: t("applications.descriptions.dehumidification"),
      products: [
        {
          id:"singleLayerMortar",
          name: t('products.monocapa'),
          icon: MorteroMonocapa
        },
        {
          id:"tileAdhesive",
          name: t('products.adhesive'),
          icon: Cola
        },
        {
          id:"limeMortar",
          name: t('products.lime'),
          icon: MorteroCal
        },
        {
          id:"stampedMortar",
          name: t('products.printed'),
          icon: MorteroImpreso
        },
        {
          id:"stoneMortar",
          name: t('products.stone'),
          icon: Piedra
        },
        {
          id:"bondingBridge",
          name: t('products.union'),
          icon: Union
        },
      ]
    },
  ];


  useEffect(() => {
    if (mounted) {
      const found = data.find(item => item.id.toLowerCase() === aplication?.toLowerCase());
      setValues(found || null);
    }
  }, [aplication, mounted, t]);

  if (!mounted) {
    return null;
  }

  return (
      <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32">
        <AplicationPage aplication={value} />
      </main>
  );
}