import React from 'react';
import CardServices from './AplicantCard';
import { useLanguage } from '@/app/context/LanguageContext';

const ServicesGrid = () => {
    const { t } = useLanguage();

    const cardsData = [0, 1, 2].map(index => ({
        title: t(`servicesGrid.cards.${index}.title`),
        description: t(`servicesGrid.cards.${index}.description`),
        bullets: []
    }));

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