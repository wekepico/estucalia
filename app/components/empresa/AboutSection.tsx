import React from 'react';
import Image from 'next/image';

import Creatividad from '../../../public/img/creatividad-img.png'


export default function AboutSection() {
  return (
    <div>
      {/* Top Section */}
      <section className="relative bg-white">
        <div className="mx-auto px-28 max-sm:px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 max-sm:gap-y-8 items-center">
            {/* Text Content */}
            <div className='lg:p-12 max-sm:px-2'>
              <h2 className="text-3xl font-bold mb-2">Somos Grupo Estucalia</h2>
              <p className="text-lg leading-relaxed">
                Grupo Estucalia está compuesto por varias empresas especializadas 
                en <span className="font-medium">fabricación, comercialización y exportación</span> de morteros 
                monocapa para el revestimiento de fachadas, y cementos cola y 
                rejuntado para el revestimiento cerámico de suelos y paredes.
              </p>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="relative  aspect-square">
                <Image
                  src={Creatividad}
                  alt="Arte en Fachadas"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-36 bg-[#f1e9e9]">
        <div className="mx-auto  max-sm:px-0 text-center">
          <h3 className="text-3xl font-bold mb-6">
            Nuestra misión: satisfacer al cliente
          </h3>
          <p className="text-lg max-w-2xl mx-auto">
            En nuestra empresa, la misión es clara: proporcionar un{' '}
            <span className="font-bold">servicio de calidad excepcional</span>{' '}
            ofreciendo total disponibilidad del equipo para{' '}
            <span className="font-bold">garantizar su satisfacción</span>.
          </p>
        </div>
      </section>
    </div>
  );
}