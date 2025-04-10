'use client';

import React from 'react';
import CardServices from './CardService';
import { useLanguage } from '@/app/context/LanguageContext';

const ServicesGrid = () => {
  const { t } = useLanguage();

  function getArrayTranslation(tValue: string | string[]): string[] {
    return Array.isArray(tValue) ? tValue : [];
  }

  const cardsData = [
    {
      title: t("services.cards.advice.title"),
      description: t("services.cards.advice.description"),
      bullets: getArrayTranslation(t("services.cards.advice.bullets"))
    },
    {
      title: t("services.cards.definition.title"),
      description: t("services.cards.definition.description"),
      bullets: getArrayTranslation(t("services.cards.definition.bullets"))
    },
    {
      title: t("services.cards.resources.title"),
      description: t("services.cards.resources.description"),
      bullets:getArrayTranslation( t("services.cards.resources.bullets"))
    },
    {
      title: t("services.cards.support.title"),
      description: t("services.cards.support.description"),
      bullets:getArrayTranslation( t("services.cards.support.bullets"))
    },
    {
      title: t("services.cards.delivery.title"),
      description: t("services.cards.delivery.description"),
      bullets: getArrayTranslation(t("services.cards.delivery.bullets"))
    },
    {
      title: t("services.cards.sustainability.title"),
      description: t("services.cards.sustainability.description"),
      bullets: getArrayTranslation(t("services.cards.sustainability.bullets"))
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
      {cardsData.map((card, index) => (
        <div key={index}>
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
