'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function InspirationSection() {
  const { t } = useLanguage();

  const inspirationImages = [
    {
      url: "/convertedImages/img-1.webp",
      alt: t('home.inspiration.images.modernFacade')
    },
    {
      url: "/convertedImages/Home.webp",
      alt: t('home.inspiration.images.urbanArchitecture')
    },
    {
      url: "/convertedImages/img-3.webp",
      alt: t('home.inspiration.images.minimalistDesign')
    },
    {
      url: "/convertedImages/img-4.webp",
      alt: t('home.inspiration.images.contemporaryArchitecture')
    },
    {
      url: "/convertedImages/img3.webp",
      alt: t('home.inspiration.images.modernFacade')
    },
    {
      url: "/convertedImages/img-8.webp",
      alt: t('home.inspiration.images.urbanArchitecture')
    },
    {
      url: "/convertedImages/img1.webp",
      alt: t('home.inspiration.images.minimalistDesign')
    },
    {
      url: "/convertedImages/image1.webp",
      alt: t('home.inspiration.images.contemporaryArchitecture')
    }
  ];

  return (
    <section className="py-48 bg-white">
      {/* Featured Image */}
      <div className="relative h-[500px] mb-32">
        <div 
          className="absolute inset-0 bg-cover sm:bg-fixed bg-center"
          style={{
            backgroundImage: "url('/convertedImages/bg-up.webp')"
          }}
        />
      </div>

      <div className="md:px-15 sm:px-10 px-5 lg:px-20 mx-auto">
        <h2 className="text-2xl font-[600] mb-8">{t('home.inspiration.title')}</h2>

        {/* Image Grid */}
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
                aria-label={image.alt}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))} 
        </div>
      </div>
    </section>
  );
}