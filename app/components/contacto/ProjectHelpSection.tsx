'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
      <div className="relative container  mx-auto px-4">
        <div className="max-w-[27rem] ml-0 md:ml-12 bg-slate-100" style={{backgroundColor:"rgba(255, 255, 250, 0.8)"}}>
          <div className="p-12"> 
            <h2 className="text-3xl font-bold  mb-4">
              ¿Necesitas ayuda con tu proyecto?
            </h2>
            <p className="text-black text-lg mb-8">
              Recibe una asistencia personalizada y un servicio experto con los profesionales de Grupo Estucalia.
            </p>
            <div className='flex w-full justify-end items-center'>
              <Button variant="outline" className="group border-gray-400 border-solid rounded-none">
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
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}