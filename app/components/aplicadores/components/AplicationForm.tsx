'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLanguage } from '@/app/context/LanguageContext';

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
    const { t } = useLanguage();
    const form = useForm<FormData>();
    const [fileName, setFileName] = useState<string | null>(null);

    const onSubmit = (data: FormData) => {
        console.log(data);
        // Handle form submission
    };

    return (
        <section className="py-28">
            <div className="mx-auto md:px-15 sm:px-10 px-5 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-44">
                    {/* Description */}
                    <div>
                        <h2 className="text-4xl font-[600] w-72 mb-3">
                            {t('applicationForm.title')}
                        </h2>

                        <div className='flex flex-col gap-8'>
                            <p className="text-gray-900 text-xl inline leading-relaxed">
                                {t('applicationForm.intro')}
                            </p>

                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className='flex flex-col'>
                                    <p className="text-gray-900 font-[600] text-lg inline leading-relaxed">
                                        {t(`applicationForm.benefits.${item}.title`)}
                                    </p>
                                    <p className="text-gray-900 text-lg inline leading-relaxed">
                                        {t(`applicationForm.benefits.${item}.description`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
                                <div className='border-b lg:col-span-1 col-span-2 border-black'>
                                    <FormField
                                        control={form.control}
                                        name="nombre"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input 
                                                        placeholder={t('applicationForm.formFields.name')} 
                                                        className='border-none text-md' 
                                                        {...field} 
                                                    />
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
                                            <FormItem>
                                                <FormControl>
                                                    <Input 
                                                        type="tel" 
                                                        className='border-none text-md' 
                                                        placeholder={t('applicationForm.formFields.phone')} 
                                                        {...field} 
                                                    />
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
                                                    <Input 
                                                        type="email" 
                                                        className='border-none text-md' 
                                                        placeholder={t('applicationForm.formFields.email')} 
                                                        {...field} 
                                                    />
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
                                            <FormItem>
                                                <FormControl>
                                                    <Input 
                                                        placeholder={t('applicationForm.formFields.company')} 
                                                        className='border-none text-md' 
                                                        {...field} 
                                                    />
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
                                            <FormItem>
                                                <FormControl>
                                                    <Input 
                                                        placeholder={t('applicationForm.formFields.message')} 
                                                        className='border-none text-md' 
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="space-y-1 leading-none col-span-2">
                                    <FormLabel className="text-sm text-gray-900">
                                        {t('applicationForm.dataProtection')}
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
                                                    {t('applicationForm.privacyCheckbox.part1')}
                                                    <a className='underline' href="">{t('applicationForm.privacyCheckbox.link1')}</a>
                                                    {t('applicationForm.privacyCheckbox.part2')}
                                                    <a className="underline" href="">{t('applicationForm.privacyCheckbox.link2')}</a>
                                                    {t('applicationForm.privacyCheckbox.part3')}
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
                                                    {t('applicationForm.marketingCheckbox')}
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
                                    <span>{t('applicationForm.submitButton')}</span>
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