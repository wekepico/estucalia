'use client';

import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?auto=format&fit=crop&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-4xl md:text-6xl font-light max-w-2xl leading-tight">
            Morteros sostenibles para la arquitectura y construcción.
          </h1>
        </div>
      </div>
    </section>
  );
}