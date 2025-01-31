'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
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
                  name="asunto"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Asunto" {...field} />
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