'use client';

import React from 'react';
import { Button } from "@/components/ui/button";

export default function ProjectHelpSection() {
  return (
    <section className="relative min-h-[500px] flex items-center">
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 bg-cover bg-top "
        style={{
          backgroundImage: "url('/img/helper.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Contenido */}
      <div className="relative md:px-15 sm:px-10 px-5 lg:px-20">
        <div className="max-w-[27rem]  mx-auto bg-slate-100" style={{ backgroundColor: "rgba(255, 255, 250, 0.8)" }}>
          <div className="p-6 md:p-12">
            {/* Título */}
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-[600] mb-4">
              ¿Necesitas ayuda con tu proyecto?
            </h2>
            {/* Descripción */}
            <p className="text-black text-base md:text-xl mb-8 text-justify">
              Recibe una asistencia personalizada y un servicio experto con los profesionales de Grupo Estucalia.
            </p>
            {/* Botón */}
            <div className="flex w-full justify-end items-center">
              <Button
                variant="outline"
                className=" border-gray-500 border-solid relative pl-5 pr-10 py-4 md:py-5  rounded-none"
              >
                <span>Más información</span>
                <div className='absolute right-0'>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}