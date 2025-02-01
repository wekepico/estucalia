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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="tel" placeholder="Teléfono" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="email" placeholder="E-mail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="especialidad"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Especialidad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mensaje"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Mensaje"
                          className="resize-none"
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="curriculum"
                  render={({ field: { onChange, ref, ...field } }) => (
                    <FormItem>
                      <FormControl>
                        <Label
                          htmlFor="curriculum"
                          className="flex items-center gap-4 px-4 py-3 border border-gray-300 cursor-pointer hover:border-black transition-colors"
                        >
                          <Upload className="w-5 h-5" />
                          <span className="text-gray-600">Adjuntar Curriculum</span>
                          <Input
                            id="curriculum"
                            type="file"
                            className="hidden"
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

                <FormField
                  control={form.control}
                  name="aceptarPolitica"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-600">
                          Si, he leído y acepto el tratamiento de mis datos personales según la Política de Privacidad y el Aviso Legal de Estucalia Morteros S.L.
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aceptarComercial"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-600">
                          Sí, autorizo la recepción vía electrónica de información comercial de Grupo Estucalia.
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="group"
                  variant="outline"
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
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}