import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[40vh] flex items-center bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-light mb-6">Noticias</h1>
          <p className="text-lg text-gray-600">
            Descubre las últimas novedades, proyectos y actualizaciones de Grupo Estucalia
          </p>
        </div>
      </div>
    </section>
  );
}