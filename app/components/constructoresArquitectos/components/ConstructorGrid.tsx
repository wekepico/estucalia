'use client'
import React from 'react';
import ConstructorCard from './ConstructorCard';
import { useLanguage } from '@/app/context/LanguageContext';

const ConstructorGrid = () => {
    const { t } = useLanguage();

    const cardsData = [
        {
            title: t('constructorGrid.cards.0.title'),
            description: t('constructorGrid.cards.0.description'),
            bullets: [
                t('constructorGrid.cards.0.bullets.0'),
                t('constructorGrid.cards.0.bullets.1'),
                t('constructorGrid.cards.0.bullets.2'),
                t('constructorGrid.cards.0.bullets.3')
            ]
        },
        {
            title: t('constructorGrid.cards.1.title'),
            description: t('constructorGrid.cards.1.description'),
            bullets: [
                t('constructorGrid.cards.1.bullets.0'),
                t('constructorGrid.cards.1.bullets.1'),
                t('constructorGrid.cards.1.bullets.2'),
                t('constructorGrid.cards.1.bullets.3')
            ]
        },
        {
            title: t('constructorGrid.cards.2.title'),
            description: t('constructorGrid.cards.2.description'),
            bullets: [
                t('constructorGrid.cards.2.bullets.0'),
                t('constructorGrid.cards.2.bullets.1')
            ]
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
            {cardsData.map((card, index) => (
                <div key={index} className=''>
                    <ConstructorCard
                        title={card.title}
                        description={card.description}
                        bullets={card.bullets}
                    />
                </div>
            ))}
        </div>
    );
};

export default ConstructorGrid;