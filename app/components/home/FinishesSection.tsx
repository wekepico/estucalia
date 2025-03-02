'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from 'next/image';
import Link from 'next/link';
import MorteroCal from '../../../public/img/mortero-cal.svg'
import MorteroMonocapa from '../../../public/img/mortero-monocapa.svg'
import MorteroImpreso from '../../../public/img/mortero-impreso.svg'
import { ProductCard } from './components/ProductCard';


const categories = [
  'Abujardado/raspado', 'Lavado/fratasado', 'Impreso', 'Piedra proyectada','Liso'
];

const products = [
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
  }
];

export default function FinishesSection() {
  return (
    <section className="py-8 md:py-16 md:px-15 sm:px-10 px-5 lg:px-20 bg-white">
      <div className="mx-auto">
        <h2 className="text-xl md:text-2xl font-[600] mb-4">Acabados</h2>

        {/* Categories Scroll */}
        <ScrollArea className="w-full whitespace-nowrap mb-4">
          <div className="flex space-x-4 md:space-x-8 pb-2">
            {categories.map((category) => (
              <div>
                <Link
                  key={category}
                  href={'/#'}
                  className='text-base md:text-xl p-0 hover:border-b pb-1 hover:border-black'
                >
                  {category}
                </Link>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {products.map((product) => (  
          <div key={product.name}>
            <ProductCard icon={product.icon} name={product.name} />
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}