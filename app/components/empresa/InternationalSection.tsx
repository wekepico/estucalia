import React from 'react';

const countries = [
  'Argelia', 'Marruecos', 'Kuwait', 'Arabia Saudí',
  'Egipto', 'Qatar', 'Emiratos', 'Yemen'
];

export default function InternationalSection() {
  return (
    <section className="relative min-h-[1100px] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.squarespace-cdn.com/content/v1/5b8637e770e802c744a04a0f/1634142584524-O1S760EEBQS94QV9BADF/NEW+YORK_MOOD.jpg')"
        }}
      >
        
      </div>

      {/* Content */}
      <div className="relative w-full mx-auto  py-40 text-white"
                  style={{
                    background: "rgba(0, 2, 0, 0.8)", // Fondo negro con opacidad del 80%
                  }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-4">Internacionales</h2>
          <p className="text-lg mb-4">
            Grupo Estucalia está presente en el extranjero, teniendo distribuidores y clientes en lugares como
          </p>

          {/* Countries Grid */}
          <div className="flex flex-wrap justify-center  gap-2"

          >
            {countries.map((country, index) => (
              <React.Fragment key={country}>
                <span className="text-lg font-bold hover:text-blue-400 transition-colors ">
                  {country}
                </span>
                {index < countries.length - 1 && (
                  <span className="text-blue-400 last:hidden">,</span>
                )}
              </React.Fragment>
            ))}
            <span >...</span>
          </div>
        </div>
      </div>
    </section>
  );
}