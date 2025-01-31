'use client';

import React from 'react';

export default function VideoHero() {
  return (
    <section className="relative h-screen w-full">
      {/* Video Background */}
      <div className="fixed inset-0 bg-black" style={{ height: '100vh' }}>
        <video
          className="w-full h-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1590574744313-91d6e3ce9a52?auto=format&fit=crop&q=80"
        >
          <source src="/company-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <div className="absolute top-4 left-4 text-white text-sm font-light tracking-wider">
            VIDEO
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-light max-w-4xl mx-auto leading-tight">
            Más de 25 años en el sector de revestimientos de fachadas y cerámicos a nivel internacional.
          </h1>
        </div>
      </div>
    </section>
  );
}