import React from 'react';

const countries = [
  'Argelia', 'Marruecos', 'Kuwait', 'Arabia Saudí', 
  'Egipto', 'Qatar', 'Emiratos', 'Yemen'
];

export default function InternationalSection() {
  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1582657233895-0f37a3f150c0?auto=format&fit=crop&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-8">Internacionales</h2>
          <p className="text-lg mb-12">
            Grupo Estucalia está presente en el extranjero, teniendo distribuidores y clientes en lugares como
          </p>
          
          {/* Countries Grid */}
          <div className="flex flex-wrap justify-center gap-4">
            {countries.map((country, index) => (
              <React.Fragment key={country}>
                <span className="text-lg font-medium hover:text-blue-400 transition-colors cursor-pointer">
                  {country}
                </span>
                {index < countries.length - 1 && (
                  <span className="text-blue-400 last:hidden">,</span>
                )}
              </React.Fragment>
            ))}
            <span className="text-blue-400">...</span>
          </div>
        </div>
      </div>
    </section>
  );
}