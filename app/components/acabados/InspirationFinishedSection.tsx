'use client';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function InspirationFinishedSection() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  if (!mounted) return null;

  useEffect(() => {
    setMounted(true);
  }, []);


  const inspirationImages = [
    {
      url: "/convertedImages/img-1.webp",
      alt: "inspiration.images.modernFacade"
    },
    {
      url: "/convertedImages/Home.webp",
      alt: "inspiration.images.urbanArchitecture"
    },
    {
      url: "/convertedImages/img-3.webp",
      alt: "inspiration.images.minimalistDesign"
    },
    {
      url: "/convertedImages/img-4.webp",
      alt: "inspiration.images.contemporaryArchitecture"
    },
    {
      url: "/convertedImages/img3.webp",
      alt: "inspiration.images.modernFacade"
    },
    {
      url: "/convertedImages/img-8.webp",
      alt: "inspiration.images.urbanArchitecture"
    },
    {
      url: "/convertedImages/img1.webp",
      alt: "inspiration.images.minimalistDesign"
    },
    {
      url: "/convertedImages/image1.webp",
      alt: "inspiration.images.contemporaryArchitecture"
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="md:px-15 sm:px-10 px-5 lg:px-20 mx-auto">
        <h2 className="text-2xl font-[600] mb-8">{t('home.inspiration.title')}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {inspirationImages.map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-square overflow-hidden group cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${image.url}')` }}
                role="img"
                aria-label={t(image.alt)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))} 
        </div>
      </div>
    </section>
  );
}