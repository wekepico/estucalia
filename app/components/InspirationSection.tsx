import React from 'react';

const inspirationImages = [
  {
    url: "https://images.unsplash.com/photo-1590574744313-91d6e3ce9a52?auto=format&fit=crop&q=80",
    alt: "Curved architectural detail"
  },
  {
    url: "https://images.unsplash.com/photo-1600607688939-ce8a6c25118c?auto=format&fit=crop&q=80",
    alt: "Geometric patterns in architecture"
  },
  {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    alt: "Modern building facade"
  },
  {
    url: "https://images.unsplash.com/photo-1590574744537-befb4b4e5ae3?auto=format&fit=crop&q=80",
    alt: "Linear architectural patterns"
  },
  {
    url: "https://images.unsplash.com/photo-1600607687920-4e03c8cdb44e?auto=format&fit=crop&q=80",
    alt: "Minimalist building design"
  },
  {
    url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80",
    alt: "Contemporary architecture"
  },
  {
    url: "https://images.unsplash.com/photo-1600607687101-9f2368761d0d?auto=format&fit=crop&q=80",
    alt: "Modern facade detail"
  },
  {
    url: "https://images.unsplash.com/photo-1600607687710-4bfb87661aac?auto=format&fit=crop&q=80",
    alt: "Urban architecture"
  }
];

export default function InspirationSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-medium mb-12">Inspiración</h2>
        
        {/* Featured Image */}
        <div className="relative h-[300px] mb-12">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80')"
            }}
          />
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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