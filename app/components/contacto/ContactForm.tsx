'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
  const form = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  // Configuración de campos del formulario
  const inputFields = [
    { name: 'nombre', type: 'text', placeholder: 'Nombre', component: Input },
    { name: 'telefono', type: 'tel', placeholder: 'Teléfono', component: Input },
    { name: 'email', type: 'email', placeholder: 'E-mail', component: Input },
    { name: 'asunto', type: 'text', placeholder: 'Asunto', component: Input },
    { name: 'mensaje', component: Input, placeholder: 'Mensaje', Type: 'text' }
  ];

  const checkboxes = [
    {
      name: 'aceptarPolitica',
      label:    <FormLabel className="text-sm text-gray-900">
        Si, he leído y acepto el tratamiento de mis datos personales según la <a className='underline' href="">Política de Privacidad</a>  y el <a className="underline">Aviso Legal</a> de Estucalia Morteros S.L.
      </FormLabel>
    },
    {
      name: 'aceptarComercial',
      label: <FormLabel className="text-sm text-gray-900">Sí, autorizo la recepción vía electrónica de información comercial de Grupo Estucalia.</FormLabel>
    }
  ];

  return (
    <section className="lg:pr-64 lg:pl-28 lg:py-16 pb-8 ">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-2 md: gap-12">

          {/* Información de contacto */}
          <div className='min-w-max'>
            <h1 className="text-3xl mb-2" style={{fontWeight:"900"}}>Contacto</h1>

            <div className="space-y-6">
              <div>
                <p>Camino Viejo de Fortuna, 40</p>
                <p>30148 Matanzas, Santomera</p>
                <p>Murcia (SPAIN).</p>
              </div>

              <div className='flex flex-col w-max'>
                <a href="tel:+34968862467" style={{fontWeight:"900"}} className=" inline w-max hover:text-gray-600 transition-colors">
                  +34 968 862 467
                </a>
                <a href="tel:+34663519854" style={{fontWeight:"900"}} className="inline w-max hover:text-gray-600 transition-colors">
                  +34 663 519 854
                </a>
                <a
                  href="mailto:grupoestucalia@grupoestucalia.com"
                  className="inline w-max hover:text-gray-600 transition-colors"
                >
                  grupoestucalia@grupoestucalia.com
                </a>
              </div>

              <div>
                <h2 className=" text-lg" style={{fontWeight:"900"}}>Horario</h2>
                <p>Lunes - Jueves</p>
                <p>08:00 AM - 18:00 PM</p>
                <p className="mt-2">Viernes</p>
                <p>08:00 AM - 14:00 PM</p>
                <p className="mt-2">Verano (del 15 Julio al 15 Septiembre)</p>
                <p>07:00 AM - 15:00 PM</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className='max-md:mb-16'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-2  gap-6">
                {inputFields.map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name as keyof FormData}

                    render={({ field: formField }) => (
                      <FormItem className={`${field.name == "nombre" || field.name == "telefono" ? 'lg:col-span-1 col-span-2' : "col-span-2"}`}>
                        <FormControl>
                          <div className='border-b border-black'>
                            <Input
                              className='border-none text-md'
                              type={field.type}
                              placeholder={field.placeholder}
                              value={formField.value as string}
                              onChange={formField.onChange}
                              onBlur={formField.onBlur}
                              ref={formField.ref}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <p className='text-sm col-span-2'>
                  Información básica sobre Protección de Datos. Responsable: ESTUCALIA MORTEROS S.L. Finalidad del tratamiento:
                  gestionar su consulta/solicitud, envío de información vía electrónica y su posterior seguimiento comercial.
                  Legitimación: su consentimiento expreso al remitirnos este formulario (RGPD 6.1.a), sus datos no serán cedidos a
                  terceros y se conservarán por plazo de un año, salvo obligación legal. Puede ejercitar los derechos de acceso,
                  rectificación, supresión, portabilidad, limitación y oposición, y revocar su consentimiento dirigiéndose a:
                </p>

                {checkboxes.map((checkbox) => (
                  <FormField
                    key={checkbox.name}
                    control={form.control}
                    name={checkbox.name as keyof FormData}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-2">
                        <FormControl>
                          <Checkbox
                            className='rounded-none'
                            checked={field.value as boolean} // Forzar tipo boolean
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            {checkbox.label}                 
                        </div>
                      </FormItem>
                    )}
                  />
                ))}

                <Button
                  type="submit"
                  className="group w-[155px] flex gap-4 justify-end borde-1 p-2 py-6 border-black rounded-none"
                  variant="outline"

                >
                  <span>Enviar</span>
                  <svg className="ml-2 w-10 h-10 transform transition-transform group-hover:translate-x-1 col-span-1"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5l7 7-7 7" />
                  </svg>

                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}