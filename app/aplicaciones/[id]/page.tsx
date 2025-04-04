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
  aplication:string;
  descripcion:string;
  img:string;
  products:{
    name:string;
    icon:string | StaticImport
  }[]
}

const data:Aplication[] = [
  {
    aplication: "applications.categories.coatings",
    img:"/img/revestimiento.jpg",
    descripcion: "applications.descriptions.coatings",
    products: [
      {
        name: 'products.monocapa',
        icon: MorteroCal

      },
      {
        name: 'products.lime',
        icon: MorteroMonocapa

      },
      {
        name: 'products.printed',
        icon: MorteroImpreso
      },
      {
        name: 'products.stone',
        icon: Piedra
      },
      {
        name: 'products.union',
        icon: Union
      },
    ]

  },
  {
    aplication: "applications.categories.plasters",
    img:"/img/revocos_enlucidos.jpg",
    descripcion: "applications.descriptions.plasters",
    products: [
      {
        name: 'products.monocapa',
        icon: MorteroCal

      },
      {
        name: 'products.lime',
        icon: MorteroMonocapa

      },
      {
        name: 'products.printed',
        icon: MorteroImpreso
      },
      {
        name: 'products.stone',
        icon: Piedra
      },
      {
        name: 'products.union',
        icon: Union
      },
    ]

  },
  {
    aplication: "applications.categories.masonry",
    img:"/img/albañileria.jpg",
    descripcion: "applications.descriptions.masonry",
    products: [
      {
        name: 'products.monocapa',
        icon: MorteroCal

      },
      {
        name: 'products.adhesive',
        icon: Cola
      },
      {
        name: 'products.lime',
        icon: MorteroMonocapa

      },
      {
        name: 'products.printed',
        icon: MorteroImpreso
      },
      {
        name: 'products.waterProtector',
        icon: Agua
      },
      {
        name: 'products.union',
        icon: Union
      },
    ]

  },
  {
    aplication: "applications.categories.tiles",
    img:"/img/baldosas.jpg",
    descripcion: "applications.descriptions.tiles",
    products: [
      {
        name: 'products.adhesive',
        icon: Cola
      },
      {
        name: 'products.joint',
        icon: Juntas

      }
    ]

  },
  {
    aplication: "applications.categories.screeds",
    img:"/img/recrecidos.jpg",
    descripcion: "applications.descriptions.screeds",
    products: [
      {
        name: 'products.monocapa',
        icon: MorteroMonocapa
      },
      {
        name: 'products.adhesive',
        icon: Cola

      }
    ]

  },
  {
    aplication: "applications.categories.thermal",
    img:"/img/aislamiento.jpg",
    descripcion: "applications.descriptions.thermal",
    products: [
      {
        name: 'products.monocapa',
        icon: MorteroMonocapa

      },
      {
        name: 'products.adhesive',
        icon: Cola
      },
      {
        name: 'products.lime',
        icon: MorteroCal

      },
      {
        name: 'products.printed',
        icon: MorteroImpreso
      },

      {
        name: 'products.union',
        icon: Union
      },
    ]

  },
  {
    aplication: "applications.categories.waterproofing",
    img:"/img/impermeabilizacion.jpg",
    descripcion: "applications.descriptions.waterproofing",
    products: [
      {
        name: 'products.monocapa',
        icon: MorteroMonocapa

      },
      {
        name: 'products.lime',
        icon: MorteroCal

      },
      {
        name: 'products.printed',
        icon: MorteroImpreso
      },
      {
        name: 'products.joint',
        icon: Juntas
      },

      {
        name: 'products.stone',
        icon: Piedra
      },
      {
        name: 'products.waterProtector',
        icon: Agua
      },
    ]

  },
  {
    aplication: "applications.categories.dehumidification",
    img:"/img/deshumificacion.jpg",
    descripcion: "applications.descriptions.dehumidification",
    products: [
      {
        name: 'products.monocapa',
        icon: MorteroMonocapa

      },
      {
        name: 'products.adhesive',
        icon: Cola

      },
      {
        name: 'products.lime',
        icon: MorteroCal
      },
      {
        name: 'products.printed',
        icon: MorteroImpreso
      },

      {
        name: 'products.stone',
        icon: Piedra
      },
      {
        name: 'products.union',
        icon: Union
      },
    ]

  },
]


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


  useEffect(() => {
    if (mounted) {
      const found = data.find(item => t(item.aplication).toLowerCase() === aplication?.toLowerCase());
      setValues(found || null);
    }
  }, [aplication, mounted, t]);

  if (!mounted) {
    return null;
  }

  return (
      <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32">
        <AplicationPage img={value?.img || ''} descripcion={value?.descripcion ? t(value.descripcion) : ""} aplication={value?.aplication ? t(value.aplication) : ""}  products={value?.products.map(product => ({
          ...product,
          name: t(product.name)
        })) || []} />
      </main>
  );
}