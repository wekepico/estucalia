'use client';

import React from 'react';
import { Button } from "@/components/ui/button";

export default function ConsultingSection() {
  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-8">
            Asesoramiento personalizado
          </h2>

          <p className="text-xl mb-12 leading-relaxed">
            La excelencia en el acabado de cada proyecto no es solo el último paso en nuestra búsqueda de calidad, sino el sello distintivo que define el resultado final. Grupo Estucalia pone a su disposición un equipo técnico preparado para proporcionar asistencia experta en cada proyecto que emprendamos juntos.
          </p>

          <Button variant="outline" className="border-gray-200 pl-5  pr-0  md:py-6 bg-transparent hover:text-black border-solid rounded-none">
            <span>Más información</span>
            <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5l7 7-7 7" />
            </svg>
          </Button>

        </div>
      </div>
    </section>
  );
}