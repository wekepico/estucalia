import React from 'react';
import Image from 'next/image';

export default function CertificationsSection() {
  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-8">
            Resultados a la altura de las exigencias
          </h2>
          
          <p className="text-lg mb-16 leading-relaxed">
            Nuestra empresa está comprometida con la calidad en cada paso del camino, como lo demuestra nuestra certificación de calidad. Grupo Estucalia integra el riguroso{' '}
            <span className="font-medium">sistema de Calidad Total</span>{' '}
            basado en la norma UNE-EN ISO 9001/2000 y certificado por AENOR como empresa registrada numero ER-0339/2002.
          </p>

          {/* Certificates */}
          <div className="flex justify-center items-center gap-12 mb-16">
            <div className="w-24 h-24 relative">
              <Image
                src="/ce-mark.svg"
                alt="CE Mark"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-24 h-24 relative">
              <Image
                src="/aenor.svg"
                alt="AENOR Certification"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-24 h-24 relative">
              <Image
                src="/iqnet.svg"
                alt="IQNet Certification"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* CTA Button */}
          <button className="inline-flex items-center px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors group">
            <span>Certificaciones</span>
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
    </section>
  );
}