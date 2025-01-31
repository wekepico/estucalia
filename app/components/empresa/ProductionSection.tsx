import React from 'react';

export default function ProductionSection() {
  return (
    <section className="bg-black text-white">
      {/* Stats Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-light mb-8">100.000 Tm/año</h2>
          <p className="text-lg max-w-3xl mx-auto">
            Nuestras instalaciones, dotadas con la última tecnología en maquinaria, nos permiten obtener una 
            <span className="text-[#ff00ff]"> producción diaria </span>
            de 300 Tm.
          </p>
        </div>

        {/* Video Section */}
        <div className="relative">
          <div className="absolute top-4 left-4 text-[#ff00ff] text-sm font-light tracking-wider z-10">
            VIDEO
          </div>
          <div className="relative aspect-video w-full max-w-5xl mx-auto overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1590574744313-91d6e3ce9a52?auto=format&fit=crop&q=80"
            >
              <source src="/production-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}