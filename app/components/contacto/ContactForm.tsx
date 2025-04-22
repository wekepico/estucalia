'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLanguage } from '@/app/context/LanguageContext';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast, Toaster } from 'react-hot-toast';

// Esquema de validación con Zod usando las traducciones
const formSchema = (t: any) => z.object({
  nombre: z.string().min(1, { message: t('contact.form.validation.nameRequired') }),
  telefono: z.string().min(9, { message: t('contact.form.validation.phoneRequired') }).regex(/^[0-9]+$/, {
    message: t('contact.form.validation.phoneNumbersOnly'),
  }),
  email: z.string().email({ message: t('contact.form.validation.emailInvalid') }),
  asunto: z.string().min(1, { message: t('contact.form.validation.subjectRequired') }),
  mensaje: z.string(),
  aceptarPolitica: z.boolean().refine(val => val, {
    message: t('contact.form.validation.privacyPolicyRequired'),
  }),
  aceptarComercial: z.boolean().optional(),
});

type FormData = z.infer<ReturnType<typeof formSchema>>;

export default function ContactForm() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      nombre: '',
      telefono: '',
      email: '',
      asunto: '',
      mensaje: '',
      aceptarPolitica: false,
      aceptarComercial: false,
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log(data)
    try {
      const payload = {
        name: data.nombre,
        phone: data.telefono,
        email: data.email,
        subject: data.asunto,
        message: data.mensaje,
        acceptPrivacyPolicy: data.aceptarPolitica,
        acceptCommercialInfo: data.aceptarComercial,
      };

      const response = await fetch("https://api.derecho-ciudadano.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      await response.json();
      toast.success(t('contact.form.successMessage'));
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      toast.error(t('contact.form.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return null;
  }

  // Configuración de campos del formulario
  const inputFields = [
    { 
      name: 'nombre', 
      type: 'text', 
      placeholder: t('contact.form.name'), 
      component: Input,
      required: true
    },
    { 
      name: 'telefono', 
      type: 'tel', 
      placeholder: t('contact.form.phone'), 
      component: Input,
      required: true
    },
    { 
      name: 'email', 
      type: 'email', 
      placeholder: t('contact.form.email'), 
      component: Input,
      required: true
    },
    { 
      name: 'asunto', 
      type: 'text', 
      placeholder: t('contact.form.subject'), 
      component: Input,
      required: true
    },
    { 
      name: 'mensaje', 
      component: Textarea, 
      placeholder: t('contact.form.message'),
      required: true
    }
  ];

  const checkboxes = [
    {
      name: 'aceptarPolitica',
      label: <FormLabel className="text-sm text-gray-900">
        {t('contact.form.privacyPolicy')}
      </FormLabel>,
      required: true
    },
    {
      name: 'aceptarComercial',
      label: <FormLabel className="text-sm text-gray-900">
        {t('contact.form.commercialInfo')}
      </FormLabel>,
      required: false
    }
  ];

  return (
    <section className="lg:pr-64 lg:pl-28 lg:py-28 py-16 ">
         <Toaster position="top-right"  />
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-2 md: gap-12">

          {/* Información de contacto */}
          <div className='min-w-max'>
            <h1 className="text-3xl mb-2" style={{fontWeight:"600"}}>{t('contact.title')}</h1>

            <div className="space-y-6">
              <div>
                <p>{t('contact.address.line1')}</p>
                <p>{t('contact.address.line2')}</p>
                <p>{t('contact.address.line3')}</p>
              </div>

              <div className='flex flex-col w-max'>
                <a href="tel:+34968862467" style={{fontWeight:"600"}} className=" inline w-max hover:text-gray-600 transition-colors">
                  +34 968 862 467
                </a>
                <a href="tel:+34663519854" style={{fontWeight:"600"}} className="inline w-max hover:text-gray-600 transition-colors">
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
                <h2 className=" text-lg" style={{fontWeight:"700"}}>{t('contact.schedule.title')}</h2>
                <p>{t('contact.schedule.weekdays')}</p>
                <p>{t('contact.schedule.weekdaysHours')}</p>
                <p className="mt-2">{t('contact.schedule.friday')}</p>
                <p>{t('contact.schedule.fridayHours')}</p>
                <p className="mt-2">{t('contact.schedule.summer')}</p>
                <p>{t('contact.schedule.summerHours')}</p>
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
                            <field.component
                              className='border-none text-md'
                              type={field.type}
                              placeholder={field.placeholder}
                              {...formField}
                              value={formField.value as string}
                              onChange={formField.onChange}
                              onBlur={formField.onBlur}
                              ref={formField.ref}
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <p className='text-sm col-span-2'>
                  {t('contact.form.dataProtection')}
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
                            checked={field.value as boolean}
                            onCheckedChange={field.onChange}
                            disabled={isSubmitting}   
                            required = {field.name === "aceptarPolitica"}                       
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
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}</span>
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
    </section>
  );
}