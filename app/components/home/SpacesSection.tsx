'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const categories = [
  'Fachadas', 'Terrazas', 'Balcones', 'Paredes', 
  'Patios y lucernarios', 'Suelos', 'Pavimentos', 
  'Cocinas exterior', 'Piscinas'
];

const spaces = [
  {
    image: "https://www.inenco.com/wp-content/uploads/2020/07/shutterstock_1544096003.gif",
    title: "Revestimientos"
  },
  {
    image: "https://c.stocksy.com/a/HOH400/z9/1020165.jpg",
    title: "Revocos y enlucidos"
  },
  {
    image: "https://rentpath-res.cloudinary.com/$img_current/t_3x2_webp_2xl/t_unpaid/5428c1bc8e3dc04f4b461522071c76bf",
    title: "Albañilería"
  }
];

export default function SpacesSection() {
  return (
    <section className="py-32 px-16 bg-white">
      <div className="container mx-auto ">
        <h2 className="text-2xl font-bold">Espacios</h2>
        <div className='flex gap-3 items-center'> 
          {/* Categories Scroll */}
          <ScrollArea className="w-full whitespace-nowrap mb-4">
            <div className="flex">
              {categories.map((category) => (
                <Button
                  key={category}
                  className='text-lg p-0 mr-6'
                  variant="link"
                >
                  {category}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />

          </ScrollArea>
          <div className='flex p-2'>
          {/* Navigation Arrows */}
            <Button 
              variant="ghost"
              size="icon"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button 
              variant="ghost"
              size="icon"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
              </svg>
            </Button>

          </div>

        </div>
       


        {/* Image Cards */}
        <div className="relative">
          <div className="flex gap-6  items-center justify-between overflow-x-auto pb-8">
            {spaces.map((space) => (
              <Card key={space.title} className="flex-none w-[440px] border-none shadow-none">
                <CardContent className="p-0">
                  <div className="relative h-[650px] group">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${space.image}')`
                      }}
                    />
                    <div className="absolute top-0 left-0 text-right  right-0 p-6">
                      <h3 className="text-black text-xl font-medium">{space.title}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          </div>


        </div>
      </div>
    </section>
  );
}