'use client';

import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://i.pinimg.com/originals/ac/4c/40/ac4c4056127d9770fc201684c3612617.jpg')"
        }}
      />
      <div className="absolute inset-0  bg-black/30" />
      <div className="relative h-full flex justify-center items-center">
        <div className="container flex items-center justify-center">
          <h1 className="text-white text-4xl text-center font-bold md:text-6xl max-w-2xl leading-tight">
            Morteros sostenibles para la arquitectura y construcción.
          </h1>
        </div>
      </div>
    </section>
  );
}