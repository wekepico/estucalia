import React from 'react';

import CertificationCard from './CertificationCard';


const ServicesGrid = () => {
    const cardsData = [
        {
            title: "Declaración conformidad morteros monocapa",
            filePath: "/files/declaracion-conformidad-estucalia-morteros.pdf",
        },
        {
            title: "Declaración conformidad cementos cola",
            filePath: "/files/declaracion-conformidad-cementos-cola-estucalia-morteros.pdf",
        },
        {
            title: "Documento de Idoneidad Técnica Plus",
            filePath: "/files/dit-plus-espanol.pdf",
        },
        {
            title: "Certificado AENOR",
            filePath: "/files/certificado-aenor.pdf",
        },
        {
            title: "Certificado IQNET",
            filePath: "/files/certificado-iqnet.pdf",
        },
        {
            title: "Política de Calidad",
            filePath: "/files/politica-de-calidad-grupo-estucalia.pdf",
        }
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
            {cardsData.map((card, index) => (
                <div key={index} className=''>
                    <CertificationCard
                        title={card.title}
                        filePath={card.filePath}
                    />
                </div>
            ))}
        </div>
    );
};

export default ServicesGrid;