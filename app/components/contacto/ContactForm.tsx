'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  nombre: string;
  telefono: string;
  email: string;
  asunto: string;
  mensaje: string;
  aceptarPolitica: boolean;
  aceptarComercial: boolean;
};

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h1 className="text-3xl font-light mb-8">Contacto</h1>
            
            <div className="space-y-6">
              <div>
                <p>Camino Viejo de Fortuna, 40</p>
                <p>30148 Matanzas, Santomera</p>
                <p>Murcia (SPAIN).</p>
              </div>

              <div>
                <a href="tel:+34968862467" className="block hover:text-gray-600 transition-colors">
                  +34 968 862 467
                </a>
                <a href="tel:+34663519854" className="block hover:text-gray-600 transition-colors">
                  +34 663 519 854
                </a>
                <a 
                  href="mailto:grupoestucalia@grupoestucalia.com" 
                  className="block hover:text-gray-600 transition-colors"
                >
                  grupoestucalia@grupoestucalia.com
                </a>
              </div>

              <div>
                <h2 className="font-medium mb-2">Horario</h2>
                <p>Lunes - Jueves</p>
                <p>08:00 AM - 18:00 PM</p>
                <p className="mt-4">Viernes</p>
                <p>08:00 AM - 14:00 PM</p>
                <p className="mt-4">Verano (del 15 Julio al 15 Septiembre)</p>
                <p>07:00 AM - 15:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Nombre"
                  {...register('nombre', { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 focus:border-black outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Teléfono"
                  {...register('telefono', { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 focus:border-black outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="E-mail"
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  className="w-full px-4 py-2 border border-gray-300 focus:border-black outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Asunto"
                  {...register('asunto', { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 focus:border-black outline-none transition-colors"
                />
              </div>

              <div>
                <textarea
                  placeholder="Mensaje"
                  {...register('mensaje', { required: true })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 focus:border-black outline-none transition-colors resize-none"
                />
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    {...register('aceptarPolitica', { required: true })}
                    className="mt-1"
                  />
                  <label className="text-gray-600 leading-tight">
                    Si, he leído y acepto el tratamiento de mis datos personales según la Política de Privacidad y el Aviso Legal de Estucalia Morteros S.L.
                  </label>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    {...register('aceptarComercial')}
                    className="mt-1"
                  />
                  <label className="text-gray-600 leading-tight">
                    Sí, autorizo la recepción vía electrónica de información comercial de Grupo Estucalia.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors group"
              >
                <span>Enviar</span>
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}