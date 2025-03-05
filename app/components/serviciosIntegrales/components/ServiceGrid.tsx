import React from 'react';
import CardServices from './CardService';


const ServicesGrid = () => {
    const cardsData = [
        {
            title: "Asesoramiento y soporte especializado",
            description: "Nuestro equipo especializado te facilitará las cotizaciones por partidas detalladas.",
            bullets: [
                "- Equipo profesional de análisis y soporte.",
                "- Asistencia en consultas, posibilidades de aplicación.",
                "- Cotización por partidas.",
                "- Recomendaciones de producto, acabado y colores."
            ]
        },
        {
            title: "Ayuda en la definición del proyecto",
            description: "Nos comprometemos a proporcionarte apoyo y asesoramiento sobre transporte, manipulación, aplicación y mantenimiento.",
            bullets: [
                "- Atención personalizada y soluciones adaptadas a tus proyectos.",
                "- Asesoramiento para aplicación y mantenimiento.",
                "- Estudio individualizado del proyecto.",
                "- Optimización en términos de ahorro y rendimiento."
            ]
        },
        {
            title: "Recursos para los proyectos",
            description: "Disfrutarás de un servicio exclusivo para poder desarrollar tus proyectos, plasmar tu visión y mejorarla con los morteros o cementos más avanzados.",
            bullets: [
                "- Muestras en 48 h. Recibe las muestras que necesites para tus proyectos.",
                "- Servicio personalizado. Te recomendamos aplicadores para garantizar el mejor servicio y calidad.",
            ]
        },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
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