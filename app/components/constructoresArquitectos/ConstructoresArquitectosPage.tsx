'use client'
import React from 'react';
import ServicesGrid from './components/ConstructorGrid';
import ProjectHelpSection from '../contacto/ProjectHelpSection';
import SolutionsSection from '../empresa/SolutionsSection';
import ConstructorGrid from './components/ConstructorGrid';
import { useLanguage } from '@/app/context/LanguageContext';

export default function ConstructoresArquitectosPage() {
    const { t } = useLanguage();

    return (
        <section className="bg-white">
            {/* Featured Image */}
            <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-20 py-20 text-5xl font-[600] text-left items-end flex bg-[#ffffff] text-black">
                <h1 className="w-[37rem]">
                    {t('constructorsArchitectsPage.title.part1')} 
                    <span className='text-red-700'>{t('constructorsArchitectsPage.title.highlight')}</span> 
                    {t('constructorsArchitectsPage.title.part2')}
                </h1>
            </div>

            <div className="relative h-[500px]">
                <div
                    className="absolute inset-0 bg-cover sm:bg-fixed bg-center"
                    style={{
                        backgroundImage: `url('${t('constructorsArchitectsPage.images.banner1')}')`
                    }}
                />
            </div>

            {/* Nueva Sección con Carrusel */}
            <div className="md:px-15 pt-28 pb-16 md:pb-28 bg-[#F5ECEB] sm:px-10 px-5 lg:px-20">
                <ConstructorGrid />
            </div>

            {/* Featured Image */}
            <div className="relative h-[250px] md:h-[720px]">
                <div
                    className="absolute inset-0 bg-cover sm:bg-fixed bg-center"
                    style={{
                        backgroundImage: `url('${t('constructorsArchitectsPage.images.banner2')}')`
                    }}
                />
            </div>

            <SolutionsSection/>
            <ProjectHelpSection />
        </section>
    );
}