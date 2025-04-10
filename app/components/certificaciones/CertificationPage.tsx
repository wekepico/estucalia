'use client';

import React from 'react';
import ServicesGrid from './components/certificationGrid';
import ProjectHelpSection from '../contacto/ProjectHelpSection';
import SolutionsSection from '../empresa/SolutionsSection';
import { useLanguage } from '@/app/context/LanguageContext';

export default function CertificacionesPage() {
    const { t } = useLanguage();

    return (
        <section className="bg-white">
            {/* Featured Image */}
            <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-20 py-20 text-5xl font-[600] text-left items-end flex bg-[#C7C5C5] text-black">
                <h1 className="w-96">{t("certifications.title")}</h1>
            </div>

            {/* Nueva Sección con Carrusel */}
            <div className="md:px-15 sm:px-10 px-5 lg:px-20 my-28 ">
                <ServicesGrid />
            </div>
            <SolutionsSection />
            <ProjectHelpSection />
        </section>
    );
}
