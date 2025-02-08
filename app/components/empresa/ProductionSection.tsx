import React from 'react';

export default function ProductionSection() {
  return (
    <section className=" text-white">
      {/* Stats Section */}
      <div className=" mx-auto w-full">
        <div className="text-center p-32 max-sm:px-4  bg-black">
          <h2 className="text-4xl font-bold mb-8">100.000 Tm/año</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Nuestras instalaciones, dotadas con la última tecnología en maquinaria, nos permiten obtener una producción diaria
            <span className="font-bold"> de 300 Tm. </span>
            
          </p>
        </div>

        {/* Video Section */}
        <div className="relative">
          <div className="relative aspect-video object-cover mx-auto overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1590574744313-91d6e3ce9a52?auto=format&fit=crop&q=80"
            >
              <source src="https://uploads.innet.es/videos-estucalia/produccion.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}