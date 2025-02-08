import React from 'react';
import { Shield } from 'lucide-react';
import MorteroCal from '../../../public/img/mortero-cal.svg'
import MorteroMonocapa from '../../../public/img/mortero-monocapa.svg'
import MorteroImpreso from '../../../public/img/mortero-impreso.svg'
import MorteroPolivalente from '../../../public/img/mortero-juntas.svg'
import MorteroProtector from '../../../public/img/mortero-protector-agua.svg'
import AccesoriosHerramientas from '../../../public/img/accerios-y-herramientas.svg'
import MorteroCola from '../../../public/img/mortero-cola.svg'
import MorteroPiedra from '../../../public/img/mortero-piedra.svg'
import MorteroUnion from '../../../public/img/mortero puente union.svg'

import Image from 'next/image';

const products = [
  {
    name: 'MINERVA',
    description: 'Mortero monocapa',
    icon: <Image
      src={MorteroMonocapa}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
  {
    name: 'FOREVER',
    description: 'Mortero polivalente juntas',
    icon: <Image
      src={MorteroPolivalente}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
  {
    name: 'MURAL SHIELD',
    description: 'Protector de agua',
    icon: <Image
      src={MorteroProtector}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
  {
    name: 'TALISMAN TOOL',
    description: 'Accesorios y herramientas',
    icon: <Image
      src={AccesoriosHerramientas}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
  {
    name: 'VIKING',
    description: 'Mortero cola',
    icon: <Image
      src={MorteroCola}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
  {
    name: 'PETRA',
    description: 'Mortero impreso vertical',
    icon: <Image
      src={MorteroImpreso}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
  {
    name: 'RHINO',
    description: 'Puente de Unión',
    icon: <Image
      src={MorteroUnion}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
  {
    name: 'ARGAMASA',
    description: 'Mortero de cal',
    icon: <Image
      src={MorteroCal}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
  {
    name: 'BELLA STONE',
    description: 'Mortero china proyectada',
    icon: <Image
      src={MorteroPiedra}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
  {
    name: 'TURBO MOTAR',
    description: 'Pavimento autonivelante',
    icon: <Image
      src={MorteroMonocapa}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  }
];

export default function SolutionsSection() {
  return (
    <section className="py-40 flex flex-col bg-[#f6eded]">
      <div className=" mx-auto max-sm:px-2">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Soluciones para la construcción</h2>
          <p className="text-lg max-w-4xl mx-auto">
            Gracias a sus más de 25 años de experiencia Grupo Estucalia ofrece una gama de productos con una calidad excepcional.
          </p>
        </div>

      <div className="grid md:grid-flow-col items-center justify-center grid-rows-3 md:grid-rows-5 sm:grid-cols-1 lg:grid-rows-3 gap-y-8 gap-x-12">
          {products.map((product) => (
            <div key={product.name} className="flex items-center gap-2">
              <div className=" flex-shrink-0">
                {product.icon}
              </div>
              <div>
                <h3 className="text-md font-bold">{product.name}</h3>
                <p className=" font-medium text-lg">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}