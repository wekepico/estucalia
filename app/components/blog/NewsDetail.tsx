'use client';

import React from 'react';
import ReachText from '../reachText/reachText';
import { useLanguage } from '@/app/context/LanguageContext';
import { RiFacebookFill } from "react-icons/ri";
import { AiOutlineInstagram } from "react-icons/ai";
import { ImLinkedin2 } from "react-icons/im";
import { Button } from '../ui/button';
import { IoMdArrowRoundBack } from "react-icons/io";

interface NewsDetailProps {
    id: string;
    title: string;
    description: any;
    date?: string;
    imageUrl?: string;
}

const NewsDetail = ({ title, description, date, imageUrl }: NewsDetailProps) => {
    const { t,language } = useLanguage();

    function formatDate(isoDate: string): string {
        const date = new Date(isoDate);
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        return date.toLocaleDateString('es-ES', options);
    }

    return (
        <div className="pb-8">
            {/* Contenedor de la imagen con el título superpuesto */}
            {imageUrl && (
                <div className="relative  md:h-[600px]   overflow-hidden">
                    {/* Imagen de fondo */}
                    <img
                        className="w-full h-full object-cover"
                        src={imageUrl}
                        alt={title}
                    />

                    {/* Capa oscura para mejorar la legibilidad del título */}
                    {/* <div className="absolute inset-0 bg-black/60"></div> */}
                </div>
            )}



            {/* Fecha y redes sociales */}
            <div className=" md:px-15 mt-36 sm:px-28 px-5 lg:px-48  flex  flex-col  mb-1">
                <button
                    onClick={() => {
                        if (window.history.length > 1) { // Verifica si hay historial
                            window.history.back();
                        } else {
                            // Redirige a una ruta por defecto si no hay historial
                            window.location.href = "/"; // (Opcional)
                        }
                    }}
                    className="bg-transparent w-max hover:bg-gray-100 p-1 mb-8 rounded-lg flex gap-x-2 items-center"

            >
                <IoMdArrowRoundBack/>{language === "en"?"Back":"Volver"}
            </button>

                {/* Fecha de publicación */}
                <div>
                    {date && (
                        <p className="text-gray-900 text-base  ">
                            {formatDate(date)}
                        </p>
                    )}
                </div>

                <div className="inset-0 mb-6 flex">
                    <h1 className="text-3xl md:text-4xl   font-[600] text-black">
                        {title}
                    </h1>
                </div>

            </div>

            {/* Descripción de la noticia */}
            <div className="sm:px-28 px-5 lg:px-48 prose prose-lg max-w-full text-black">
                <ReachText className='flex no-underline flex-col gap-5' content={description} />
            </div>

            {/* Redes sociales */}
            <div className="sm:px-28 px-5 lg:px-48  mt-8 flex space-x-3">
                <p className=''> {t('blog.publishedOn')}</p>
                {/* Enlace a Facebook */}
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:text-blue-700 transition-colors duration-300 flex items-center space-x-2"
                >
                    <RiFacebookFill className='w-5 h-5' />
                </a>

                {/* Enlace a Intagram */}
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:text-blue-700 transition-colors duration-300 flex items-center space-x-2"
                >
                    <AiOutlineInstagram className='w-5 h-5' />
                </a>

                {/* Enlace a twitter */}
                <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:text-blue-700 transition-colors duration-300 flex items-center space-x-2"
                >
                    <ImLinkedin2 className='w-5 h-5' />
                </a>
            </div>
        </div>
    );
};

export default NewsDetail;