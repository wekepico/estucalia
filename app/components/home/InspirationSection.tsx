'use client';

import React from 'react';

const inspirationImages = [
  {
    url: "https://img.freepik.com/premium-photo/residential-building-sky-background-facade-modern-housing-construction-with-balconies_991208-12480.jpg",
    alt: "Curved architectural detail"
  },
  {
    url: "https://www.crosscountry-consulting.com/wp-content/uploads/2023/01/AdobeStock_353155691-scaled.jpeg",
    alt: "Geometric patterns in architecture"
  },
  {
    url: "https://img.freepik.com/premium-photo/3d-visualization-house-luxury-3d-rendering_1128603-7388.jpg",
    alt: "Modern building facade"
  },
  {
    url: "https://www.themetechmount.com/wordpress/buildtab/advanced/wp-content/uploads/sites/11/2023/04/04-650x700.jpg",
    alt: "Linear architectural patterns"
  },
  {
    url: "https://ejadasafety.ae/wp-content/uploads/2023/07/Ejada-Facade-Curtain-Wall-and-Cladding-Systems.jpg",
    alt: "Minimalist building design"
  },
  {
    url: "https://artelfacades.co.uk/wp-content/uploads/2021/02/Shutterstock_1418136680-min-scaled.jpg",
    alt: "Contemporary architecture"
  },
  {
    url: "https://images.pexels.com/photos/1109068/pexels-photo-1109068.jpeg?cs=srgb&dl=cold-city-clouds-1109068.jpg&fm=jpg",
    alt: "Modern facade detail"
  },
  {
    url: "https://www.compass.com/m/0/164f1216-462f-46ff-a054-c386a6b7873c/770x1000.jpg",
    alt: "Urban architecture"
  }
];

export default function InspirationSection() {
  return (
    <section className="py-32  bg-white">
       {/* Featured Image */}
       <div className="relative h-[400px] mb-24">
          <div 
            className="absolute inset-0 bg-cover bg-fixed bg-center"
            style={{
              backgroundImage: "url('https://www.epgdlaw.com/wp-content/uploads/2023/08/135042701_m_normal_none-scaled.jpg')"
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