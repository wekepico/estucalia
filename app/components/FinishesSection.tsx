import React from 'react';
import { Shield } from 'lucide-react';

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
        <div className="flex space-x-8 mb-12">
          {categories.map((category) => (
            <a
              key={category}
              href="#"
              className="text-gray-600 hover:text-black whitespace-nowrap border-b-2 border-transparent hover:border-black pb-2 transition-colors"
            >
              {category}
            </a>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.name} className="bg-gray-50 p-12 flex flex-col items-center text-center group">
              <div className="mb-6">
                {product.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <a 
                href="#" 
                className="inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors group-hover:text-black"
              >
                Ver producto
                <svg 
                  className="ml-2 w-4 h-4" 
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
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}