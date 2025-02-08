'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
  const form = useForm<FormData>();
  const [fileName, setFileName] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <section className="py-28 lg:px-32">
      <div className="container mx-auto px-11">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-44">
          {/* Description */}
          <div >
            <h2 className="text-3xl font-bold mb-3">Personas con talento</h2>
            
            <div className='inline'>


            <p className="text-gray-900 inline leading-relaxed">
              En continua expansión, Grupo Estucalia selecciona los mejores
              profesionales para incorporarlos a sus proyectos.
              Únete a nuestro equipo si eres
            </p>
              
               <p className='inline leading-relaxed px-1 font-semibold'>
                exigente y comprometido. 
               </p>

              <p className='inline'>
                En Grupo Estucalia encontrarás un
              </p> 
              
              <p className='leading-relaxed font-semibold px-1 inline'>entorno laboral disciplinado y profesional.
                
              </p> 
            
             <p className='leading relaxed inline '> Rellene este formulario para incorporarte a nuestros nuevos talentos.
            </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-2 gap-6">
                <div className='border-b lg:col-span-1 col-span-2 border-black'>

                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem className=''>
                        <FormControl>
                          <Input placeholder="Nombre" className='border-none text-md' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
                <div className='border-b lg:col-span-1 col-span-2 border-black'>


                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem className=''>
                        <FormControl>
                          <Input type="tel" className='border-none text-md' placeholder="Teléfono" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='border-b border-black col-span-2'>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="email" className='border-none text-md' placeholder="E-mail" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='border-b border-black col-span-2'>
                  <FormField
                    control={form.control}
                    name="especialidad"
                    render={({ field }) => (
                      <FormItem className='col-span-2'>
                        <FormControl>
                          <Input placeholder="Especialidad" className='border-none text-md' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='border-b border-black col-span-2'>

                  <FormField
                    control={form.control}
                    name="mensaje"
                    render={({ field }) => (
                      <FormItem className='col-span-2'>
                        <FormControl>
                          <Input placeholder="Mensaje" className='border-none text-md' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-2'>

                  <FormField
                    control={form.control}
                    name="curriculum"
                    render={({ field: { onChange, ref, ...field } }) => (
                      <FormItem className='col-span-2'>
                        <FormControl>
                          <Label
                            htmlFor="curriculum"
                            className="flex items-center gap-4 px-4 py-3  border-gray-300 cursor-pointer  transition-colors"
                          >
                            <span className="text-gray-900 text-lg font-bold">Adjuntar Curriculum</span>
                            <Upload className="w-5 h-5" />
                            <Input
                              id="curriculum"
                              type="file"
                              className="hidden border-none rounded-none tx-md"
                              onChange={(e) => {
                                const files = e.target.files;
                                if (files?.length) {
                                  onChange(files); // Actualiza el estado del formulario
                                  setFileName(files[0].name); // Actualiza el nombre del archivo
                                } else {
                                  setFileName(null); // Resetea el nombre del archivo si no hay archivos seleccionados
                                }
                              }}
                              ref={ref}
                            />
                          </Label>
                        </FormControl>
                        {fileName && (
                          <div className="text-gray-600 mt-2">Archivo seleccionado: {fileName}</div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-1 leading-none col-span-2">
                  <FormLabel className="text-sm text-gray-900">
                    Información básica sobre Protección de Datos. Responsable: ESTUCALIA MORTEROS S.L. Finalidad del tratamiento:
                    gestionar su consulta/solicitud, envío de información vía electrónica y su posterior seguimiento comercial.
                    Legitimación: su consentimiento expreso al remitirnos este formulario (RGPD 6.1.a), sus datos no serán cedidos a
                    terceros y se conservarán por plazo de un año, salvo obligación legal. Puede ejercitar los derechos de acceso,
                    rectificación, supresión, portabilidad, limitación y oposición, y revocar su consentimiento dirigiéndose a:
                  </FormLabel>
                </div>

                <FormField
                  control={form.control}
                  name="aceptarPolitica"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className='rounded-none'
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-900">
                          Si, he leído y acepto el tratamiento de mis datos personales según la <a className='underline' href="">Política de Privacidad</a>  y el <a className="underline">Aviso Legal</a> de Estucalia Morteros S.L.
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aceptarComercial"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className='rounded-none'
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-900">
                          Sí, autorizo la recepción vía electrónica de información comercial de Grupo Estucalia.
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />


                <Button
                  type="submit"
                  className="group w-[150px] flex gap-4 justify-end borde-1 border-black rounded-none"
                  variant="outline"
                >
                  <span>Enviar</span>
                  <svg className="ml-2 w-10 h-10 transform transition-transform group-hover:translate-x-1"
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