'use client';

import React from 'react';
import { Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from 'next/image';

const categories = [
  'Rugoso/raspado', 'Lavado', 'Impreso', 'Piedra proyectada'
];

const products = [
  {
    name: 'MINERVA',
    description: 'Mortero monocapa',
    icon: <Image
      src="/img/minerva.png"
      alt="Logo"
      width={180}
      height={100}
      className="h-40 w-auto"
    />
  },
  {
    name: 'ARGAMASA',
    description: 'Mortero de cal',
    icon: <Image
      src="/img/argamasa.png"
      alt="Logo"
      width={180}
      height={100}
      className="h-40 w-auto"
    />
  },
  {
    name: 'PETRA',
    description: 'Mortero impreso vertical',
    icon: <Image
      src="/img/petra.png"
      alt="Logo"
      width={180}
      height={100}
      className="h-40 w-auto"
    />
  }
];

export default function FinishesSection() {
  return (
    <section className="py-18 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold">Acabados</h2>

        {/* Categories */}
        <ScrollArea className="w-full whitespace-nowrap mb-4">
          <div className="flex space-x-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant="link"
                className='text-lg p-0 mr-6'
              >
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.name} className="bg-stone-50 group">
              <div className="px-16 py-20 flex flex-col items-center text-center">
                <div className="mb-6">
                  {product.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                <p className="text-gray-900 text-lg mb-2">{product.description}</p>

              </div>
              <div className='flex w-full p-4 justify-end'>
                <Button
                  variant="ghost"
                  className="p-0 h-auto hover:bg-transparent group-hover:text-black"
                >
                  <span>Ver producto</span>
                  <svg
                    className="ml-2 w-7 h-7 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
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