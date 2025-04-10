'use client';

import React from 'react';
import CertificationCard from './CertificationCard';
import { useLanguage } from '@/app/context/LanguageContext';

const ServicesGrid = () => {
  const { t } = useLanguage();

  const cardsData = [
    {
      title: t("certifications.cards.morteros"),
      filePath: "/files/declaracion-conformidad-estucalia-morteros.pdf",
    },
    {
      title: t("certifications.cards.cementos"),
      filePath: "/files/declaracion-conformidad-cementos-cola-estucalia-morteros.pdf",
    },
    {
      title: t("certifications.cards.dit"),
      filePath: "/files/dit-plus-espanol.pdf",
    },
    {
      title: t("certifications.cards.aenor"),
      filePath: "/files/certificado-aenor.pdf",
    },
    {
      title: t("certifications.cards.iqnet"),
      filePath: "/files/certificado-iqnet.pdf",
    },
    {
      title: t("certifications.cards.politica"),
      filePath: "/files/politica-de-calidad-grupo-estucalia.pdf",
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
      {cardsData.map((card, index) => (
        <div key={index}>
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
