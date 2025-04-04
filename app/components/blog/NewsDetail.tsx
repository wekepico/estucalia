'use client';

import React from 'react';
import ReachText from '../reachText/reachText';
import { useLanguage } from '@/app/context/LanguageContext';

interface NewsDetailProps {
    id: string;
    title: string;
    description: any;
    date?: string;
    imageUrl?: string;
}

const NewsDetail = ({ title, description, date, imageUrl }: NewsDetailProps) => {
    const { t } = useLanguage();

    return (
        <div className="pb-8">
            {/* Contenedor de la imagen con el título superpuesto */}
            {imageUrl && (
                <div className="relative h-[200px] md:h-[300px]   overflow-hidden">
                    {/* Imagen de fondo */}
                    <img
                        className="w-full h-full object-cover"
                        src={imageUrl}
                        alt={title}
                    />

                    {/* Capa oscura para mejorar la legibilidad del título */}
                    <div className="absolute inset-0 bg-black/60"></div>

                    {/* Título superpuesto */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-3xl md:text-4xl  p-20 font-[600] text-white">
                            {title}
                        </h1>
                    </div>
                </div>
            )}

            {/* Fecha y redes sociales */}
            <div className=" md:px-15 mt-2 sm:px-10 px-5 lg:px-20  flex  flex-col md:flex-row justify-between items-center md:items-center mb-6">
                {/* Fecha de publicación */}
                {date && (
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        {t('blog.publishedOn')} {date}
                    </p>
                )}
            </div>

            {/* Descripción de la noticia */}
            <div className="md:px-15 sm:px-10 px-5 lg:px-20 prose prose-lg max-w-full text-gray-700">
                <ReachText content={description}/>
            </div>

            {/* Redes sociales */}
            <div className="md:px-15 sm:px-10 px-5 lg:px-20 mt-8 flex space-x-6">
                {/* Enlace a Facebook */}
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    <span className="hidden md:inline">{t('blog.social.facebook')}</span>
                </a>

                {/* Enlace a Twitter */}
                <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    <span className="hidden md:inline">{t('blog.social.twitter')}</span>
                </a>

                {/* Enlace a WhatsApp */}
                <a
                    href="https://wa.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-green-500 transition-colors duration-300 flex items-center space-x-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.1-.473-.149-.673.149-.2.297-.767.967-.94 1.166-.173.198-.347.223-.643.074-1.224-.612-2.301-1.469-3.169-2.597-.584-.795-.983-1.738-1.098-2.031-.115-.293-.012-.453.086-.598.086-.135.192-.347.288-.521.096-.173.128-.297.192-.496.064-.198.032-.372-.016-.521-.048-.149-.432-1.041-.591-1.426-.16-.385-.32-.334-.448-.34-.115-.006-.247-.006-.379-.006a.729.729 0 00-.526.248c-.181.198-.693.677-.693 1.654 0 .977.71 1.916.81 2.049.1.133 1.397 2.132 3.386 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.384-.055 1.177-.454 1.344-.896.167-.442.167-.82.116-.896-.05-.075-.182-.129-.379-.223zM12 0C5.373 0 0 5.373 0 12c0 2.126.548 4.125 1.513 5.865L.056 23.851a.5.5 0 00.614.614l6.001-1.467A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                    </svg>
                    <span className="hidden md:inline">{t('blog.social.whatsapp')}</span>
                </a>
            </div>
        </div>
    );
};

export default NewsDetail;