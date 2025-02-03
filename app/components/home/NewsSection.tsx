'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const newsItems = [
  {
    image: "https://images.unsplash.com/photo-1582657233895-0f37a3f150c0?auto=format&fit=crop&q=80",
    title: "Misión Comercial Directa a Arabia Saudita",
    link: "#"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
    title: "Grupo Estucalia presenta sus Morteros Monocapa en Marruecos",
    link: "#"
  },
  {
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
    title: "Convención Internacional en Rabat",
    link: "#"
  }
];

export default function NewsSection() {
  return (
    <section className="py-12 md:py-28 bg-white">
      {/* Featured Image */}
      <div className="relative h-[250px] md:h-[400px] mb-16 md:mb-32">
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center"
          style={{
            backgroundImage: "url('https://www.inenco.com/wp-content/uploads/2020/07/shutterstock_1544096003.gif')"
          }}
        />
      </div>
      
      <div className="container mx-auto ">
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 px-4 md:px-16 text-center md:text-left">
          Actualidad
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 px-4 md:px-16 gap-8 md:gap-16">
          {newsItems.map((item, index) => (
            <Card 
              key={index} 
              className="border-none shadow-none flex flex-col group "
            >
              <CardHeader className="p-0 overflow-hidden">
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px] mb-4 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                </div>
                <h3 className="text-base md:text-lg px-4 md:px-0 mb-4 font-medium">
                  {item.title}
                </h3>
              </CardHeader>
              
              <CardContent className="px-4 md:px-0 mt-auto">
                <div className='w-full flex justify-end'>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto hover:bg-transparent group-hover:text-black"
                  >
                    <span className="mr-2">Ver noticia</span>
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8 transform transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}