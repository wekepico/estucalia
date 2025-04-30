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
import { useLanguage } from '@/app/context/LanguageContext';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast, Toaster } from 'react-hot-toast';

// Esquema de validación con Zod usando las traducciones
const formSchema = (t: any) => z.object({
  nombre: z.string().min(1, { message: t('workWithUs.form.validation.nameRequired') }),
  telefono: z.string().min(9, { message: t('workWithUs.form.validation.phoneRequired') }).regex(/^[0-9]+$/, {
    message: t('workWithUs.form.validation.phoneNumbersOnly'),
  }),
  email: z.string().email({ message: t('workWithUs.form.validation.emailInvalid') }),
  especialidad: z.string().min(1, { message: t('workWithUs.form.validation.specialtyRequired') }),
  mensaje: z.string().min(1, { message: t('workWithUs.form.validation.messageRequired') }),
  curriculum: z.custom<FileList>((value) => value instanceof FileList, {
    message: t('workWithUs.form.validation.cvRequired'),
  }).refine((files) => files?.length > 0, {
    message: t('workWithUs.form.validation.cvRequired'),
  }),
  aceptarPolitica: z.boolean().refine(val => val, {
    message: t('workWithUs.form.validation.privacyPolicyRequired'),
  }),
  aceptarComercial: z.boolean().optional(),
});

type FormData = z.infer<ReturnType<typeof formSchema>>;

export default function ApplicationForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      nombre: '',
      telefono: '',
      email: '',
      especialidad: '',
      mensaje: '',
      curriculum: undefined,
      aceptarPolitica: false,
      aceptarComercial: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', data.nombre);
      formData.append('phone', data.telefono);
      formData.append('email', data.email);
      formData.append('specialty', data.especialidad);
      formData.append('message', data.mensaje);
      formData.append('cv', data.curriculum[0]);
      formData.append('acceptPrivacyPolicy', data.aceptarPolitica.toString());
      formData.append('acceptCommercialInfo', data.aceptarComercial?.toString() || 'false');

      const response = await fetch("https://apiestucalia.innet.es/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      await response.json();
      toast.success(t('workWithUs.form.successMessage'));
      form.reset();
      setFileName(null);
    } catch (error) {
      console.error('Error:', error);
      toast.error(t('workWithUs.form.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-28 lg:px-32">
      <div className="container mx-auto px-11">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-44">
          {/* Description */}
          <div >
            <h2 className="text-3xl font-[600] mb-3">{t('workWithUs.form.title')}</h2>
            
            <div className='inline'>
              <p className="text-gray-900 inline leading-relaxed">
                {t('workWithUs.form.description.part1')}
              </p>
                
              <p className='inline leading-relaxed px-1 font-semibold'>
                {t('workWithUs.form.description.part2')}
              </p>

              <p className='inline'>
                {t('workWithUs.form.description.part3')}
              </p> 
              
              <p className='leading-relaxed font-semibold px-1 inline'>
                {t('workWithUs.form.description.part4')}
              </p> 
            
              <p className='leading relaxed inline '>
                {t('workWithUs.form.description.part5')}
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
                          <Input placeholder={t('workWithUs.form.fields.name')} className='border-none text-md' {...field} />
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
                          <Input type="tel" className='border-none text-md' placeholder={t('workWithUs.form.fields.phone')} {...field} />
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
                          <Input type="email" className='border-none text-md' placeholder={t('workWithUs.form.fields.email')} {...field} />
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
                          <Input placeholder={t('workWithUs.form.fields.specialty')} className='border-none text-md' {...field} />
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
                          <Input placeholder={t('workWithUs.form.fields.message')} className='border-none text-md' {...field} />
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
                            <span className="text-gray-900 text-lg font-[600]">{t('workWithUs.form.fields.cv')}</span>
                            <Upload className="w-5 h-5" />
                            <Input
                              id="curriculum"
                              type="file"
                              className="hidden border-none rounded-none tx-md"
                              onChange={(e) => {
                                const files = e.target.files;
                                if (files?.length) {
                                  onChange(files);
                                  setFileName(files[0].name);
                                } else {
                                  setFileName(null);
                                }
                              }}
                              ref={ref}
                            />
                          </Label>
                        </FormControl>
                        {fileName && (
                          <div className="text-gray-600 mt-2">{t('workWithUs.form.fields.fileSelected')} {fileName}</div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-1 leading-none col-span-2">
                  <FormLabel className="text-sm text-gray-900">
                    {t('workWithUs.form.privacy.info')}
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
                          {t('workWithUs.form.privacy.accept')}{' '}
                          <a className='underline' href="/politica-privacidad">{t('workWithUs.form.privacy.privacyPolicy')}</a>{' '}
                          {t('common.and')}{' '}
                          <a className="underline" href="/aviso-legal">{t('workWithUs.form.privacy.legalNotice')}</a>{' '}
                          {t('common.of')} {t('workWithUs.form.privacy.companyName')}
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
                          {t('workWithUs.form.commercial.accept')}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="group w-[155px] flex gap-4 justify-end borde-1 p-2 py-6 border-black rounded-none"
                  variant="outline"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? t('workWithUs.form.submitting') : t('workWithUs.form.submit')}</span>
                  {!isSubmitting && (
                    <svg className="ml-2 w-10 h-10 transform transition-transform group-hover:translate-x-1 col-span-1"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </section>
  );
}