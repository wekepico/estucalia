'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Upload } from 'lucide-react';

type FormData = {
  nombre: string;
  telefono: string;
  email: string;
  especialidad: string;
  mensaje: string;
  curriculum: FileList;
  aceptarPolitica: boolean;
  aceptarComercial: boolean;
};

export default function ApplicationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Description */}
          <div>
            <h2 className="text-3xl font-light mb-6">Personas con talento</h2>
            <p className="text-gray-600 leading-relaxed">
              En continua expansión, Grupo Estucalia selecciona los mejores profesionales para incorporarlos a sus proyectos. Únete a nuestro equipo si eres exigente y comprometido. En Grupo Estucalia encontrarás un entorno laboral disciplinado y profesional. Rellene este formulario para incorporarte a nuestros nuevos talentos.
            </p>
          </div>

          {/* Form */}
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
                  placeholder="Especialidad"
                  {...register('especialidad', { required: true })}
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

              <div>
                <label className="flex items-center gap-4 px-4 py-3 border border-gray-300 cursor-pointer hover:border-black transition-colors">
                  <Upload className="w-5 h-5" />
                  <span className="text-gray-600">Adjuntar Curriculum</span>
                  <input
                    type="file"
                    {...register('curriculum', { required: true })}
                    className="hidden"
                  />
                </label>
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