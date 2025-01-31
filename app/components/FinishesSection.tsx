'use client';

import React from 'react';
import { Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const categories = [
  'Rugoso/raspado', 'Lavado', 'Impreso', 'Piedra proyectada'
];

const products = [
  {
    name: 'MINERVA',
    description: 'Mortero monocapa',
    icon: <Shield className="w-16 h-16" />
  },
  {
    name: 'ARGAMASA',
    description: 'Mortero de cal',
    icon: <Shield className="w-16 h-16" />
  },
  {
    name: 'PETRA',
    description: 'Mortero impreso vertical',
    icon: <Shield className="w-16 h-16" />
  }
];

export default function FinishesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-medium mb-8">Acabados</h2>
        
        {/* Categories */}
        <ScrollArea className="w-full whitespace-nowrap mb-12">
          <div className="flex space-x-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className="text-gray-600 hover:text-black whitespace-nowrap border-b-2 border-transparent hover:border-black pb-2 transition-colors"
              >
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.name} className="bg-gray-50 group">
              <CardContent className="p-12 flex flex-col items-center text-center">
                <div className="mb-6">
                  {product.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto hover:bg-transparent group-hover:text-black"
                >
                  <span>Ver producto</span>
                  <svg 
                    className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}