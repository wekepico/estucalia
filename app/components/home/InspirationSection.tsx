'use client';

import React from 'react';

const inspirationImages = [
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

export default function InspirationSection() {
  return (
    <section className="py-32  bg-white">
       {/* Featured Image */}
       <div className="relative h-[500px] mb-24">
          <div 
            className="absolute inset-0 bg-cover bg-fixed bg-center"
            style={{
              backgroundImage: "url('/img/bg-up.png')"
            }}
          />
        </div>
      <div className="container mx-auto px-4">
       
        <h2 className="text-2xl font-bold mb-8 px-8">Inspiración</h2>
        

        {/* Image Grid */}
        <div className="grid grid-cols-2 px-8 md:grid-cols-4 gap-16">
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