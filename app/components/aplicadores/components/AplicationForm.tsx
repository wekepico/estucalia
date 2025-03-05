'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type FormData = {
    nombre: string;
    telefono: string;
    email: string;
    empresa: string;
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
        <section className="py-28">
            <div className=" mx-auto md:px-15 sm:px-10 px-5 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-44">
                    {/* Description */}
                    <div >
                        <h2 className="text-4xl font-[600] w-72 mb-3">Únete a la nuestra red de aplicadores.</h2>

                        <div className='flex flex-col gap-8'>


                            <p className="text-gray-900 text-xl inline leading-relaxed">
                                Pertenecer a la red de aplicadores de Grupo Estucalia ofrece
                                múltiples ventajas para profesionales del sector. Algunas de
                                ellas son:
                            </p>

                            <div className='flex flex-col '>
                                <p className="text-gray-900 font-[600] text-lg inline leading-relaxed">
                                    Mayor visibilidad y oportunidades de negocio
                                </p>
                                <p className="text-gray-900  text-lg inline leading-relaxed">
                                    Grupo Estucalia recomienda a sus aplicadores a constructoras y arquitectos,
                                    facilitando el acceso a proyectos de gran envergadura.
                                </p>
                            </div>

                            <div className='flex flex-col '>
                                <p className="text-gray-900 font-[600] text-lg inline leading-relaxed">
                                    Acceso a productos de alta calidad
                                </p>
                                <p className="text-gray-900  text-lg inline leading-relaxed">
                                    Posibilidad de trabajar con materiales innovadores y exclusivos, garantizando
                                    acabados superiores.
                                </p>
                            </div>
                            <div className='flex flex-col '>
                                <p className="text-gray-900 font-[600] text-lg inline leading-relaxed">
                                    Asesoramiento técnico
                                </p>
                                <p className="text-gray-900  text-lg inline leading-relaxed">
                                    Conocimiento de nuevas técnicas y materiales, asegurando que los
                                    aplicadores estén siempre actualizados.
                                </p>
                            </div>
                            <div className='flex flex-col '>
                                <p className="text-gray-900 font-[600] text-lg inline leading-relaxed">
                                    Respaldo y confianza de una marca consolidada
                                </p>
                                <p className="text-gray-900  text-lg inline leading-relaxed">
                                    Trabajar bajo el aval de Grupo Estucalia mejora la reputación y credibilidad
                                    ante clientes y empresas del sector.
                                </p>
                            </div>
                            <div className='flex flex-col '>
                                <p className="text-gray-900 font-[600] text-lg inline leading-relaxed">
                                    Soporte comercial y técnico
                                </p>
                                <p className="text-gray-900  text-lg inline leading-relaxed">
                                    Asistencia en la gestión de proyectos, soluciones a medida y apoyo en la
                                    resolución de incidencias.
                                </p>
                            </div>
                            <div className='flex flex-col '>
                                <p className="text-gray-900 font-[600] text-lg inline leading-relaxed">
                                    Red de contactos y colaboraciones
                                </p>
                                <p className="text-gray-900  text-lg inline leading-relaxed">
                                    Posibilidad de establecer alianzas con otros profesionales del sector para
                                    potenciar el crecimiento y la expansión del negocio.
                                </p>
                            </div>

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
                                        name="empresa"
                                        render={({ field }) => (
                                            <FormItem className='col-span-2'>
                                                <FormControl>
                                                    <Input placeholder="Empresa" className='border-none text-md' {...field} />
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