import React from 'react';
import ServicesGrid from './components/ServiceGrid';
import ProjectHelpSection from '../contacto/ProjectHelpSection';


export default function Servicios() {
    return (
        <section className="bg-white">
            {/* Featured Image */}
            <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-20 py-20 text-5xl font-[600] text-left items-end flex bg-[#C7C5C5] text-black">
                <h1 className="w-96">Servicio Integral de Proyectos</h1>
            </div>

            <div className="relative h-[350px] mb-28">
                <div
                    className="absolute inset-0 bg-cover bg-fixed bg-center"
                    style={{
                        backgroundImage: "url('/img/bg-up.png')"
                    }}
                />
            </div>

            {/* Nueva Sección con Carrusel */}
            <div className="md:px-15 sm:px-10 px-5 lg:px-20 ">
                <ServicesGrid />
            </div>
            {/* Featured Image */}
            <div className="relative h-[250px] md:h-[470px] mt-16 md:mt-28">
                <div
                    className="absolute inset-0 bg-cover bg-fixed bg-center"
                    style={{
                        backgroundImage: "url('/img/bg-down.png')"
                    }}
                />
            </div>
            <ProjectHelpSection />
        </section>
    );
}