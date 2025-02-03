'use client';

import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full">
      {/* Fondo con imagen */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://i.pinimg.com/originals/ac/4c/40/ac4c4056127d9770fc201684c3612617.jpg')"
        }}
      />
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30" />
      {/* Contenido centrado */}
      <div className="relative h-full flex justify-center items-center">
        <div className="container flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-4xl text-center font-bold md:text-5xl xl:text-6xl max-w-3xl leading-tight mt-8 md:mt-0">
            Morteros sostenibles para la arquitectura y construcción.
          </h1>
        </div>
      </div>
    </section>
  );
}