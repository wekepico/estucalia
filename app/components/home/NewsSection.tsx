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
    <section className="py-28 bg-white">
      {/* Featured Image */}
      <div className="relative h-[400px] mb-32">
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center"
          style={{
            backgroundImage: "url('https://www.inenco.com/wp-content/uploads/2020/07/shutterstock_1544096003.gif')"
          }}
        />
      </div>
      <div className="container mx-auto px-4">


        <h2 className="text-2xl font-bold mb-8">Actualidad</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {newsItems.map((item, index) => (
            <Card key={index} className="border-none shadow-none justify-between flex-col flex group">
              <CardHeader className="p-0">
                <div className="relative h-[500px] mb-4 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                </div>
                <h3 className="text-lg mb-4">{item.title}</h3>
              </CardHeader>
              <CardContent className="px-0 flex-col items-end justify-end">
               
              
           
              <div className='flex w-full  p-2  flex-col  items-end'>
                <Button
                  variant="ghost"
                  className="p-0 h-auto hover:bg-transparent group-hover:text-black"
                >
                  <span>Ver noticia</span>
                  <svg
                    className="ml-2 w-7 h-7 transform transition-transform group-hover:translate-x-1"
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