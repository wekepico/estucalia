import React from 'react';
import CardServices from './AplicantCard';


const ServicesGrid = () => {
    const cardsData = [
        {
            title: "Asistencia y soporte",
            description: "Nuestros especialistas están a tu disposición para ayudarte a nivel comercial y en materia de seguridad. Asesoramos sobre transporte, manipulación, aplicación y mantenimiento.",
            bullets: []
        },
        {
            title: "Servicio de entrega mundial",
            description: "Disfruta de un servicio de entrega de alcance mundial para hacer crecer tu proyecto.",
            bullets: []
        },
        {
            title: "Sostenibilidad y eficiencia",
            description: "Te ayudamos a conocer nuestro catálogo de productos, sus procesos de fabricación sostenibles y su diversidad de aplicaciones/usos.",
            bullets: []
        }
    ];
    return (
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-28">
            {cardsData.map((card, index) => (
                <div key={index} className=''>
                    <CardServices
                        title={card.title}
                        description={card.description}
                        bullets={card.bullets}
                    />
                </div>
            ))}
        </div>
    );
};

export default ServicesGrid;