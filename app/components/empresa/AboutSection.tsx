import React from 'react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <div>
      {/* Top Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl font-light mb-8">Somos Grupo Estucalia</h2>
              <p className="text-lg leading-relaxed">
                Grupo Estucalia está compuesto por varias empresas especializadas 
                en <span className="font-medium">fabricación, comercialización y exportación</span> de morteros 
                monocapa para el revestimiento de fachadas, y cementos cola y 
                rejuntado para el revestimiento cerámico de suelos y paredes.
              </p>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="relative w-full aspect-square">
                <Image
                  src="/abstract-pattern.svg"
                  alt="Arte en Fachadas"
                  fill
                  className="object-contain"
                  priority
                />
                <div className="absolute top-0 right-0 text-sm space-y-1">
                  <div className="font-light">
                    Creatividad <span className="text-gray-500">+</span>
                  </div>
                  <div className="font-light">
                    Tecnología <span className="text-gray-500">+</span>
                  </div>
                  <div className="text-red-600 font-medium mt-2 -rotate-6 transform origin-top-right">
                    ARTE EN FACHADAS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-[#FDF8F8]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-medium mb-6">
            Nuestra misión: satisfacer al cliente
          </h3>
          <p className="text-lg max-w-3xl mx-auto">
            En nuestra empresa, la misión es clara: proporcionar un{' '}
            <span className="font-medium">servicio de calidad excepcional</span>{' '}
            ofreciendo total disponibilidad del equipo para{' '}
            <span className="font-medium">garantizar su satisfacción</span>.
          </p>
        </div>
      </section>
    </div>
  );
}