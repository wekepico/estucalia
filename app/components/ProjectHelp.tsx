'use client';

import React from 'react';
import { Button } from "@/components/ui/button";

export default function ProjectHelp() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-medium">¿Necesitas ayuda con tu proyecto?</h2>
            <p className="text-gray-600">
              Recibe una asistencia personalizada y un servicio experto con los profesionales de Grupo Estucalia.
            </p>
            <Button variant="outline" className="group">
              <span>Más información</span>
              <svg 
                className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Button>
          </div>
          <div className="relative h-[400px]">
            <div 
              className="absolute inset-0 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80')"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}