import React from 'react';
import { Shield } from 'lucide-react';

const products = [
  {
    name: 'MINERVA',
    description: 'Mortero monocapa',
    icon: 'shield-wings'
  },
  {
    name: 'FOREVER',
    description: 'Mortero polivalente juntas',
    icon: 'shield-wave'
  },
  {
    name: 'MURAL SHIELD',
    description: 'Protector de agua',
    icon: 'shield-drop'
  },
  {
    name: 'TALISMAN TOOL',
    description: 'Accesorios y herramientas',
    icon: 'shield-tools'
  },
  {
    name: 'VIKING',
    description: 'Mortero cola',
    icon: 'shield-cross'
  },
  {
    name: 'PETRA',
    description: 'Mortero impreso vertical',
    icon: 'shield-columns'
  },
  {
    name: 'RHINO',
    description: 'Puente de Unión',
    icon: 'shield-rhino'
  },
  {
    name: 'ARGAMASA',
    description: 'Mortero de cal',
    icon: 'shield-bull'
  },
  {
    name: 'BELLA STONE',
    description: 'Mortero china proyectada',
    icon: 'shield-stone'
  },
  {
    name: 'TURBO MOTAR',
    description: 'Pavimento autonivelante',
    icon: 'shield-fan'
  }
];

export default function SolutionsSection() {
  return (
    <section className="py-20 bg-[#FDF8F8]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-medium mb-6">Soluciones para la construcción</h2>
          <p className="text-lg max-w-4xl mx-auto">
            Gracias a sus más de 25 años de experiencia Grupo Estucalia ofrece una gama de productos con una calidad excepcional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {products.map((product) => (
            <div key={product.name} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Shield className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-1">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}