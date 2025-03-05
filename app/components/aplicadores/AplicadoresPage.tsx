import React from 'react';
import ServicesGrid from './components/AplicantGrid';
import ProjectHelpSection from '../contacto/ProjectHelpSection';
import ApplicationForm from './components/AplicationForm';


export default function AplicadoresPage() {
    return (
        <section className="bg-white">
            {/* Featured Image */}
            <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-20 py-20 text-5xl font-[600] text-left items-end flex bg-[#ffffff] text-black">
                <h1 className="w-[36rem]">¿Qué ofrece <span className='text-red-700'>Grupo Estucalia </span>  a los aplicadores</h1>
            </div>

            <div className="relative h-[500px] ">
                <div
                    className="absolute inset-0 bg-cover bg-fixed bg-center"
                    style={{
                        backgroundImage: "url('/img/closeup-construction-worker039s-hands-wearing-protective-gloves.jpg')"
                    }}
                />
            </div>

            {/* Nueva Sección con Carrusel */}
            <div className="md:px-15 pt-28 pb-16 md:pb-28 bg-[#F5ECEB] sm:px-10 px-5 lg:px-20 ">
                <ServicesGrid />
            </div>
            {/* Featured Image */}
            <div className="relative h-[250px] md:h-[720px] ">
                <div
                    className="absolute inset-0 bg-cover bg-fixed bg-center"
                    style={{
                        backgroundImage: "url('/img/tiler-working-renovation-apartment.jpg')"
                    }}
                />
            </div>

            <ApplicationForm/>
            <ProjectHelpSection />
        </section>
    );
}