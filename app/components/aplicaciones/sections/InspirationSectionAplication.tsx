'use client';

import React from 'react';


interface InspirationSectionAplication {
  images:InspirationImages[]
}

interface InspirationImages{
  url: string;
  alt: string;
}

const inspirationImages: InspirationImages[] = [
  {
    url: "img/img-1.jpg",
    alt: "Modern facade detail"
  },
  {
    url: "img/home.jpg",
    alt: "Urban architecture"
  },
  {
    url: "img/img-3.jpg",
    alt: "Minimalist building design"
  },
  {
    url: "img/img-4.jpg",
    alt: "Contemporary architecture"
  },
  {
    url: "img/img3.jpg",
    alt: "Modern facade detail"
  },
  {
    url: "img/img-8.jpg",
    alt: "Urban architecture"
  },
  {
    url: "img/img1.jpg",
    alt: "Minimalist building design"
  },
  {
    url: "img/image1.jpg",
    alt: "Contemporary architecture"
  },
];

export const InspirationSectionAplication:React.FC<InspirationSectionAplication> = ({images}) => {
  return (
    <section className="py-32  bg-white">


      <div className="md:px-15 sm:px-10 px-5 lg:px-20 mx-auto">
       
        <h2 className="text-2xl font-bold mb-8 ">Inspiración</h2>
        

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {images.map((image, index) => (
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
              <div className=" inset-0 bg-black/0transition-colors duration-300" />
            </div>
          ))} 
        </div>
      </div>
    </section>
  );
}