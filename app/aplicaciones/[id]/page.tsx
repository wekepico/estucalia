
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
    aplication: "Revestimientos",
    img:"/img/revestimiento.jpg",
    descripcion: "El mortero monocapa es ideal para revestimientos de fachadas, ofreciendo protección y decoración en una sola aplicación. Su alta resistencia a las condiciones climáticas y la amplia variedad de acabados lo convierten en una opción versátil y duradera. Por otro lado, el mortero de cal es especialmente útil en  edificaciones tradicionales o restauraciones, ya que permite una mayor transpiración de las paredes. Ambos tipos de morteros proporcionan una excelente adherencia y mejoran la estética del edificio, manteniendo la superficie bien protegida.",
    products: [
      {
        name: 'Mortero monocapa',
        icon: MorteroCal

      },
      {
        name: 'Mortero de cal',
        icon: MorteroMonocapa

      },
      {
        name: 'Mortero impreso',
        icon: MorteroImpreso
      },
      {
        name: 'Mortero piedra',
        icon: Piedra
      },
      {
        name: 'PUENTE DE UNIÓN',
        icon: Union
      },
    ]

  },
  {
    aplication: "Revocos y enlucidos",
    img:"/img/revocos_enlucidos.jpg",
    descripcion: "Para revocos y enlucidos, el mortero de cal es una opción tradicional que ofrece gran transpirabilidad y flexibilidad, ideal para evitar fisuras en superficies antiguas. En aplicaciones modernas, el mortero monocapa destaca por su doble función de nivelar y proporcionar un acabado decorativo en una sola capa, ahorrando tiempo y costes. Ambos tipos de mortero garantizan una buena adherencia y resistencia frente a las inclemencias climáticas, mejorando la apariencia y la protección de las fachadas.",
    products: [
      {
        name: 'Mortero monocapa',
        icon: MorteroCal

      },
      {
        name: 'Mortero de cal',
        icon: MorteroMonocapa

      },
      {
        name: 'Mortero impreso',
        icon: MorteroImpreso
      },
      {
        name: 'Mortero piedra',
        icon: Piedra
      },
      {
        name: 'PUENTE DE UNIÓN',
        icon: Union
      },
    ]

  },
  {
    aplication: "Albañilería",
    img:"/img/albañileria.jpg",
    descripcion: "El mortero polivalente para juntas es ideal para trabajos de albañilería, ya que permite rellenar uniones entre ladrillos o bloques, garantizando una fijación sólida y resistente. En revestimientos exteriores, el mortero monocapa sigue siendo una opción preferida por su capacidad para proteger y decorar las estructuras. Para obras tradicionales, el mortero de cal aporta flexibilidad y resistencia a la humedad, siendo una excelente alternativa en restauraciones.",
    products: [
      {
        name: 'Mortero monocapa',
        icon: MorteroCal

      },
      {
        name: 'Mortero Cola',
        icon: Cola
      },
      {
        name: 'Mortero de cal',
        icon: MorteroMonocapa

      },
      {
        name: 'Mortero impreso',
        icon: MorteroImpreso
      },
      {
        name: 'PROTECTOR DE AGUA',
        icon: Agua
      },
      {
        name: 'PUENTE DE UNIÓN',
        icon: Union
      },
    ]

  },
  {
    aplication: "Baldosas",
    img:"/img/baldosas.jpg",
    descripcion: "El mortero cola es el más adecuado para la instalación de baldosas en paredes y suelos, tanto en interiores como exteriores. Ofrece una alta adherencia y resistencia, incluso en condiciones de humedad o temperatura extremas. Si se busca un acabado exterior decorativo, el mortero monocapa también puede servir como base para la colocación de baldosas, proporcionando una superficie bien nivelada y resistente. Esta combinación garantiza una solución estética y funcional para revestimientos cerámicos.",
    products: [
      {
        name: 'Mortero Cola',
        icon: Cola
      },
      {
        name: 'Moncapa Juntas',
        icon: Juntas

      }
    ]

  },
  {
    aplication: "Recrecidos",
    img:"/img/recrecidos.jpg",
    descripcion: "El mortero de cal es ideal para recrecidos en suelos o fachadas de edificaciones tradicionales, ya que su flexibilidad evita fisuras y permite una correcta transpiración. En aplicaciones modernas, el mortero  monocapa puede aplicarse sobre recrecidos para lograr un acabado estético y resistente. Esta combinación garantiza una base sólida y bien protegida, mejorando la durabilidad y la estética de las superficies tratadas.",
    products: [
      {
        name: 'Mortero Moncapa',
        icon: MorteroMonocapa
      },
      {
        name: 'Mortero Cola',
        icon: Cola

      }
    ]

  },
  {
    aplication: "Aislamiento térmico",
    img:"/img/aislamiento.jpg",
    descripcion: "Para trabajos de aislamiento térmico, el mortero monocapa es una solución eficiente cuando se aplica sobre sistemas de aislamiento térmico exterior (SATE), ofreciendo una capa protectora y decorativa. Si se busca una solución más natural y transpirable, el mortero de cal es una excelente opción, ya que permite regular la humedad y mejorar el confort térmico del edificio. Ambos tipos de mortero contribuyen a la eficiencia energética y a la protección de las fachadas.",
    products: [
      {
        name: 'Mortero monocapa',
        icon: MorteroMonocapa

      },
      {
        name: 'Mortero Cola',
        icon: Cola
      },
      {
        name: 'Mortero de cal',
        icon: MorteroCal

      },
      {
        name: 'Mortero impreso',
        icon: MorteroImpreso
      },

      {
        name: 'PUENTE DE UNIÓN',
        icon: Union
      },
    ]

  },
  {
    aplication: "Impermeabilización",
    img:"/img/impermeabilizacion.jpg",
    descripcion: "El mortero monocapa es una excelente opción para impermeabilizar fachadas, ya que forma una barrera protectora que evita la entrada de agua. Para aplicaciones específicas, como superficies con juntas visibles, el mortero polivalente para juntas garantiza un sellado efectivo. En obras tradicionales, el mortero de cal también ofrece propiedades impermeabilizantes, permitiendo una correcta transpiración de las paredes. Todos estos morteros contribuyen a mantener las estructuras libres de humedad y en buen estado.",
    products: [
      {
        name: 'Mortero monocapa',
        icon: MorteroMonocapa

      },
      {
        name: 'Mortero de cal',
        icon: MorteroCal

      },
      {
        name: 'Mortero impreso',
        icon: MorteroImpreso
      },
      {
        name: 'Moncapa juntas',
        icon: Juntas
      },

      {
        name: 'Mortero piedra',
        icon: Piedra
      },
      {
        name: 'Protector de agua',
        icon: Agua
      },
    ]

  },
  {
    aplication: "Deshumidificación",
    img:"/img/deshumificacion.jpg",
    descripcion: "En proyectos de deshumidificación, el mortero de cal es altamente recomendado por su capacidad para repeler el agua y permitir la transpiración de las paredes. Esta característica lo convierte en una solución ideal para restauraciones o construcciones con problemas de humedad. El mortero monocapa también ayuda a mantener las superficies secas gracias a su capacidad impermeabilizante y decorativa, siendo una opción versátil y resistente para mejorar la durabilidad de las fachadas y protegerlas contra la acumulación de humedad.",
    products: [
      {
        name: 'Mortero monocapa',
        icon: MorteroMonocapa

      },
      {
        name: 'Mortero cola',
        icon: Cola

      },
      {
        name: 'Mortero cal',
        icon: MorteroCal
      },
      {
        name: 'Mortero impreso',
        icon: MorteroImpreso
      },

      {
        name: 'Mortero piedra',
        icon: Piedra
      },
      {
        name: 'PUENTE DE UNIÓN',
        icon: Union
      },
    ]

  },
]


export default function Aplicaciones() {
  const pathname = usePathname();

  const aplicationEncoded = pathname.split("/").pop();
  const aplication = decodeURIComponent(aplicationEncoded || "");

  const [value, setValues] = useState<Aplication | null>(null);

  useEffect(() => {
      // Busca la coincidencia en el arreglo `data`
      const found = data.find(item => item.aplication.toLowerCase() === aplication?.toLowerCase() );
      setValues(found || null); // Si no se encuentra, se establece `null`
  }, [aplication]);

  return (
      <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32">
        <AplicationPage img={value?.img || ''} descripcion={value?.descripcion || ""} aplication={value?.aplication || ""}  products={value?.products || []} />
      </main>
  );
}