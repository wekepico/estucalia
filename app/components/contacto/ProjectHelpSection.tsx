'use client';

import React from 'react';

export default function ProjectHelpSection() {
  return (
    <section className="relative min-h-[500px] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <div className="max-w-lg bg-white p-12 ml-0 md:ml-12">
          <h2 className="text-3xl font-medium mb-4">
            ¿Necesitas ayuda con tu proyecto?
          </h2>
          <p className="text-gray-600 mb-8">
            Recibe una asistencia personalizada y un servicio experto con los profesionales de Grupo Estucalia.
          </p>
          <button className="inline-flex items-center px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors group">
            <span>Más información</span>
            <svg 
              className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}