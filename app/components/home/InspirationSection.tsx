'use client';

import React from 'react';

const inspirationImages = [
  {
    url: "img/img-1.jpg",
    alt: "Modern facade detail"
  },
  {
    url: "img/Home.jpg",
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
    <section className=" py-48  bg-white">
       {/* Featured Image */}
       <div className="relative h-[500px] mb-32">
          <div 
            className="absolute inset-0 bg-cover bg-fixed bg-center"
            style={{
              backgroundImage: "url('/img/bg-up.png')"
            }}
          />
        </div>

      <div className="md:px-15 sm:px-10 px-5 lg:px-20 mx-auto">
       
        <h2 className="text-2xl font-[600] mb-8 ">Inspiración</h2>
        

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