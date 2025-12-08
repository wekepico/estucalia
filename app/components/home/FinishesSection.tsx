'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MorteroCal from '../../../public/img/mortero-cal.svg'
import MorteroMonocapa from '../../../public/img/mortero-monocapa.svg'
import MorteroImpreso from '../../../public/img/mortero-impreso.svg'
import Piedra from '../../../public/img/mortero-piedra.svg'
import { ProductCard } from './components/ProductCard';
import { useLanguage } from '../../context/LanguageContext';
import { useHome } from '@/api/useHome';

type Category = 'hammered' | 'washed' | 'printed' | 'stone' | 'smooth';

interface Product {
  id:string,
  name: string;
  icon: any;
  category: string;
}

// Mapeo de iconos para productos
const productIcons: Record<string, any> = {
  'singleLayerMortar': MorteroMonocapa,
  'limeMortar': MorteroCal,
  'stampedMortar': MorteroImpreso,
  'stoneMortar': Piedra,
};

export default function FinishesSection() {
  const { t, language } = useLanguage();
  const { data: homeData } = useHome();
  const [selectedCategory, setSelectedCategory] = useState<Category>('hammered');
  
  // Fallback estático de categorías
  const fallbackCategories: Category[] = ['hammered', 'washed', 'printed', 'stone', 'smooth'];

  // Fallback estático de productos
  const fallbackProducts: Product[] = [
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

  // Transformar datos del backend a formato esperado por el componente
  const transformBackendData = useMemo(() => {
    if (!homeData?.finishes_tabs || !Array.isArray(homeData.finishes_tabs) || homeData.finishes_tabs.length === 0) {
      return {
        categories: fallbackCategories,
        products: fallbackProducts
      };
    }

    // Intentar extraer categorías y productos del backend
    let backendCategories: Category[] = [];
    let backendProducts: Product[] = [];

    try {
      const tabs = homeData.finishes_tabs;
      
      if (tabs.length > 0) {
        // Extraer categorías de los tabs
        tabs.forEach((tab: any) => {
          const catKey = tab.slug || tab.id || tab.name;
          if (catKey && fallbackCategories.includes(catKey as Category)) {
            backendCategories.push(catKey as Category);
          }
        });

        // Si no se encontraron categorías, intentar extraerlas de otra forma
        if (backendCategories.length === 0) {
          tabs.forEach((tab: any) => {
            // Intentar mapear nombres a categorías
            const tabName = (tab.name || tab.title || '').toLowerCase();
            if (tabName.includes('hammered') || tabName.includes('abujardado')) backendCategories.push('hammered');
            if (tabName.includes('washed') || tabName.includes('lavado')) backendCategories.push('washed');
            if (tabName.includes('printed') || tabName.includes('impreso')) backendCategories.push('printed');
            if (tabName.includes('stone') || tabName.includes('piedra')) backendCategories.push('stone');
            if (tabName.includes('smooth') || tabName.includes('liso')) backendCategories.push('smooth');
          });
        }

        // Extraer productos de los tabs
        tabs.forEach((tab: any) => {
          if (tab.products && Array.isArray(tab.products)) {
            tab.products.forEach((product: any) => {
              const productId = product.id || product.slug || product.name?.toLowerCase().replace(/\s+/g, '');
              const productName = product.name || product.name_es || product.title || '';
              const productCategories = Array.isArray(product.categories) 
                ? product.categories.map((c: any) => typeof c === 'string' ? c : (c.name || c.title || '')).join(',')
                : (product.category || '');

              if (productId && productName) {
                backendProducts.push({
                  id: productId,
                  name: productName,
                  icon: productIcons[productId] || productIcons['singleLayerMortar'],
                  category: productCategories
                });
              }
            });
          }
        });
      }
    } catch (error) {
      console.error('Error procesando datos del backend (finishes):', error);
    }

    // Eliminar duplicados de productos por id
    const uniqueProducts = backendProducts.filter((product, index, self) =>
      index === self.findIndex((p) => p.id === product.id)
    );

    // Si no se pudieron extraer datos válidos, usar fallback
    return {
      categories: backendCategories.length > 0 ? [...new Set(backendCategories)] as Category[] : fallbackCategories,
      products: uniqueProducts.length > 0 ? uniqueProducts : fallbackProducts
    };
  }, [homeData, fallbackCategories, fallbackProducts, t]);

  // Usar datos del backend si están disponibles, sino usar fallback
  const categories = transformBackendData.categories;
  const products = transformBackendData.products;

  // Actualizar selectedCategory cuando cambien las categorías
  useEffect(() => {
    if (categories.length > 0 && !categories.includes(selectedCategory)) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);
  
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