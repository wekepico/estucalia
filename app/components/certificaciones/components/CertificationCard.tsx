"use client"
import React from 'react';
import { Button } from '../../ui/button';
import Image from 'next/image';

interface CardServicesProps {
    title: string;
    filePath: string; // Nueva prop para la ruta del archivo
}

const CertificationCard = ({ title, filePath }: CardServicesProps) => {
    const handleDownload = () => {
        // Crear un enlace temporal para descargar el archivo
        const link = document.createElement('a');
        link.href = filePath;
        link.download = filePath.split('/').pop() || 'documento'; // Nombre del archivo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-[#f8f7f7] p-10 gap-8 flex flex-col">
            <div className='flex gap-3 items-center'>
                <Image
                    src="/img/certification-icon.png"
                    alt="Logo"
                    width={180}
                    height={100}
                    className="h-14 w-auto"
                />
                <h3 className="text-xl line-clamp-2 font-semibold mb-2">{title}</h3>
            </div>
            <div className='w-full flex items-end justify-end'>
                <Button
                    variant="outline"
                    className="border-gray-500 relative pl-5 pr-12 py-4 md:py-5 border-solid rounded-none"
                    onClick={handleDownload} // Agregar el evento onClick
                >
                    <span>Descargar</span>
                    <div className='absolute right-0'>
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default CertificationCard;