'use client';

import React, { useState } from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MorteroCal from '../../../public/img/mortero-cal.svg'
import MorteroMonocapa from '../../../public/img/mortero-monocapa.svg'
import MorteroImpreso from '../../../public/img/mortero-impreso.svg'
import Piedra from '../../../public/img/mortero-piedra.svg'
import { ProductCard } from './components/ProductCard';
import { useLanguage } from '../../context/LanguageContext';

type Category = 'hammered' | 'washed' | 'printed' | 'stone' | 'smooth';

interface Product {
  id:string,
  name: string;
  icon: any;
  category: string;
}

export default function FinishesSection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<Category>('hammered');
  
  const categories: Category[] = ['hammered', 'washed', 'printed', 'stone', 'smooth'];

  const products: Product[] = [
    {
      id:"singleLayerMortar",
      name: t('home.finishes.products.monocapa'),
      icon: MorteroMonocapa,
      category: `${t('home.finishes.categories.hammered')},${t('home.finishes.categories.washed')},${t('home.finishes.categories.smooth')}`
    },
    {
      id:"limeMortar",
      name: t('home.finishes.products.lime'),
      icon: MorteroCal,
      category: `${t('home.finishes.categories.hammered')},${t('home.finishes.categories.washed')},${t('home.finishes.categories.smooth')}`
    },
    {
      id:"stampedMortar",
      name: t('home.finishes.products.printed'),
      icon: MorteroImpreso,
      category: `${t('home.finishes.categories.hammered')},${t('home.finishes.categories.washed')},${t('home.finishes.categories.printed')},${t('home.finishes.categories.smooth')}`
    },
    {
      id:"stoneMortar",
      name: t('home.finishes.products.stone'),
      icon: Piedra,
      category: t('home.finishes.categories.stone')
    }
  ];
  
  const filteredProducts = products.filter(product => 
    product.category.includes(t(`home.finishes.categories.${selectedCategory}`))
  );

  return (
    <section className="py-8 md:py-16 md:px-15 sm:px-10 px-5 lg:px-20 bg-white">
      <div className="mx-auto">
        <h2 className="text-xl md:text-2xl font-[600] mb-4">{t('home.finishes.title')}</h2>

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
                {t(`home.finishes.categories.${category}`)}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredProducts.map((product,index) => (  
            <div key={product.name}>
              <ProductCard 
                key={index+"-product-card"}
                id ={product.id}
                icon={product.icon} 
                name={product.name} 
              />
            </div>
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            {t('home.finishes.noProducts')}
          </p>
        )}
      </div>
    </section>
  );
}