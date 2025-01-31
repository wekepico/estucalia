import React from 'react';

export default function MapSection() {
  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Map */}
          <div className="h-[400px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.8554454554455!2d-1.0547893!3d38.0547892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63875b8b8b8b8b%3A0x1d1d1d1d1d1d1d1d!2sGrupo%20Estucalia!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-medium mb-4">Cómo llegar</h2>
              <p className="text-gray-600 leading-relaxed">
                Nos encontramos en el Camino Viejo de Fortuna, 40, en la localidad de Matanzas, 
                Santomera (Murcia). Nuestras instalaciones están estratégicamente ubicadas para 
                facilitar la distribución de nuestros productos.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Desde Murcia</h3>
              <p className="text-gray-600 leading-relaxed">
                Tome la A-7 dirección Alicante y salga en la salida 571 hacia Santomera. 
                Siga las indicaciones hacia Matanzas por la MU-414.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Desde Alicante</h3>
              <p className="text-gray-600 leading-relaxed">
                Tome la A-7 dirección Murcia y salga en la salida 571 hacia Santomera. 
                Siga las indicaciones hacia Matanzas por la MU-414.
              </p>
            </div>

            <button className="inline-flex items-center px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors group">
              <span>Cómo llegar</span>
              <svg 
                className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}