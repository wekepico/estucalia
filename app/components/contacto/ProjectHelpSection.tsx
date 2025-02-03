'use client';

import React from 'react';
import { Button } from "@/components/ui/button";

export default function ProjectHelpSection() {
  return (
    <section className="relative min-h-[500px] flex items-center">
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Contenido */}
      <div className="relative container mx-auto px-4">
        <div className="max-w-[27rem]  mx-auto md:ml-12 bg-slate-100" style={{ backgroundColor: "rgba(255, 255, 250, 0.8)" }}>
          <div className="p-6 md:p-12">
            {/* Título */}
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold mb-4">
              ¿Necesitas ayuda con tu proyecto?
            </h2>
            {/* Descripción */}
            <p className="text-black text-base md:text-xl mb-8 text-justify">
              Recibe una asistencia personalizada y un servicio experto con los profesionales de Grupo Estucalia.
            </p>
            {/* Botón */}
            <div className="flex w-full justify-end items-center">
              <Button variant="outline" className="border-gray-500 py-4 md:py-6 border-solid rounded-none">
                <span>Más información</span>
                <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}