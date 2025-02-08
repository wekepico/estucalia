'use client';

import React from 'react';

export default function VideoHero() {
  return (
    <section className="relative h-[700px] w-full">
      {/* Video Background */}
      <div className="absolute inset-0 z-0" style={{ height: '100vh' }}>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1590574744313-91d6e3ce9a52?auto=format&fit=crop&q=80"
        >
          <source src="https://uploads.innet.es/videos-estucalia/exterior.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <div className="absolute top-4 left-4 text-white text-sm font-light tracking-wider">
            VIDEO
          </div>
          <h1 className="text-white text-2xl md:text-5xl font-bold max-w-6xl mx-auto leading-tight">
            Más de 25 años en el sector de revestimientos de fachadas y cerámicos a nivel internacional.
          </h1>
        </div>
      </div>
    </section>
  );
}