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
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-light mb-8">
            Asesoramiento personalizado
          </h2>
          
          <p className="text-lg mb-12 leading-relaxed">
            La excelencia en el acabado de cada proyecto no es solo el último paso en nuestra búsqueda de calidad, sino el sello distintivo que define el resultado final. Grupo Estucalia pone a su disposición un equipo técnico preparado para proporcionar asistencia experta en cada proyecto que emprendamos juntos.
          </p>

          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-black group"
          >
            <span>Más información</span>
            <svg 
              className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}