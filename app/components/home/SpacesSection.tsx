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
    image: "https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&q=80",
    title: "Revestimientos"
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    title: "Revocos y enlucidos"
  },
  {
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80",
    title: "Albañilería"
  }
];

export default function SpacesSection() {
  return (
    <section className="py-20 bg-white">
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
              <Card key={space.title} className="flex-none w-[470px] border-none shadow-none">
                <CardContent className="p-0">
                  <div className="relative h-[650px] group">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${space.image}')`
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                      <h3 className="text-white text-xl">{space.title}</h3>
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