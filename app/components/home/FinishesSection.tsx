'use client';

import React, { useState } from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MorteroCal from '../../../public/img/mortero-cal.svg'
import MorteroMonocapa from '../../../public/img/mortero-monocapa.svg'
import MorteroImpreso from '../../../public/img/mortero-impreso.svg'
import Piedra from '../../../public/img/mortero-piedra.svg'
import { ProductCard } from './components/ProductCard';

type Category = 'Abujardado/raspado' | 'Lavado/fratasado' | 'Impreso' | 'Piedra proyectada' | 'Liso';

interface Product {
  name: string;
  icon: any;
  category: string;
}

const categories: Category[] = [
  'Abujardado/raspado', 'Lavado/fratasado', 'Impreso', 'Piedra proyectada','Liso'
];

const products: Product[] = [
  {
    name: 'Mortero monocapa',
    icon: MorteroCal,
    category: 'Abujardado/raspado,Lavado/fratasado,Impreso,Liso'
  },
  {
    name: 'Mortero de cal',
    icon: MorteroMonocapa,
    category: 'Abujardado/raspado,Lavado/fratasado,Liso'
  },
  {
    name: 'Mortero impreso',
    icon: MorteroImpreso,
    category: 'Abujardado/raspado,Lavado/fratasado,Impreso,Liso'
  },
  {
    name: 'Mortero piedra',
    icon: Piedra,
    category: 'Piedra proyectada'
  },
  // Agrega más productos con sus categorías correspondientes
];

export default function FinishesSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  
  const filteredProducts = products.filter(product => 
    product.category.includes(selectedCategory)
  );

  return (
    <section className="py-8 md:py-16 md:px-15 sm:px-10 px-5 lg:px-20 bg-white">
      <div className="mx-auto">
        <h2 className="text-xl md:text-2xl font-[600] mb-4">Acabados</h2>

        {/* Categories Tabs */}
        <ScrollArea className="w-full whitespace-nowrap mb-4">
          <div className="flex space-x-4 md:space-x-8 pb-2" role="tablist">
            {categories.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className={`text-base md:text-xl p-0 pb-1 transition-colors ${
                  selectedCategory === category 
                    ? 'border-b-2 border-black font-medium' 
                    : 'hover:border-b hover:border-gray-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredProducts.map((product) => (  
            <div key={product.name}>
              <ProductCard 
                icon={product.icon} 
                name={product.name} 
              />
            </div>
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No hay productos disponibles en esta categoría
          </p>
        )}
      </div>
    </section>
  );
}