'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from 'next/image';
import Link from 'next/link';
import MorteroCal from '../../../public/img/mortero-cal.svg'
import MorteroMonocapa from '../../../public/img/mortero-monocapa.svg'
import MorteroImpreso from '../../../public/img/mortero-impreso.svg'


const categories = [
  'Abujardado/raspado', 'Lavado/fratasado', 'Impreso', 'Piedra proyectada','Liso'
];

const products = [
  {
    name: 'Mortero monocapa',
    icon: <Image
      src={MorteroCal}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-48 w-auto"
    />
  },
  {
    name: 'Mortero de cal',
    icon: <Image
      src={MorteroMonocapa}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-48 w-auto"
    />
  },
  {
    name: 'Mortero impreso',
    icon: <Image
      src={MorteroImpreso}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-48 w-auto"
    />
  }
];

export default function FinishesSection() {
  return (
    <section className="py-8 md:py-16 px-4 md:px-16 bg-white">
      <div className="max-w-[1500px] mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Acabados</h2>

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
            <div key={product.name} className="bg-stone-50 group hover:bg-stone-100 transition-colors">
              <div className="px-4 py-8 md:px-8 md:py-16 lg:px-16 lg:py-20 flex flex-col items-center text-center">
                <div className="mb-4 md:mb-6">
                  {product.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1">{product.name.toLocaleUpperCase()}</h3>
              </div>
              <div className='w-full p-4 flex justify-end'>
                <Button
                  variant="ghost"
                  className="p-0 h-auto hover:bg-transparent group-hover:text-black text-base md:text-lg"
                >
                  <span className="mr-2">Ver producto</span>
                  <svg
                    className="w-10 h-10 md:w-12 md:h-12 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={0.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}