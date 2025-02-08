'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const newsItems = [
  {
    image: "https://images.unsplash.com/photo-1582657233895-0f37a3f150c0?auto=format&fit=crop&q=80",
    title: "Misión Comercial Directa a Arabia Saudita",
    excerpt: "Grupo Estucalia continúa su expansión internacional con una importante misión comercial en Arabia Saudita, fortaleciendo su presencia en Oriente Medio.",
    date: "15 Oct 2023",
    category: "Internacional"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
    title: "Presentación de Morteros Monocapa en Marruecos",
    excerpt: "Exitosa presentación de nuestra línea de productos en el mercado marroquí, destacando la calidad y versatilidad de nuestros morteros monocapa.",
    date: "28 Sep 2023",
    category: "Productos"
  },
  {
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
    title: "Convención Internacional en Rabat",
    excerpt: "Participación destacada en el evento más importante del sector de la construcción en el norte de África, presentando las últimas innovaciones.",
    date: "15 Sep 2023",
    category: "Eventos"
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    title: "Nuevas Certificaciones de Calidad",
    excerpt: "Grupo Estucalia obtiene nuevas certificaciones que avalan la calidad de sus productos y procesos de fabricación.",
    date: "1 Sep 2023",
    category: "Empresa"
  }
];

export default function NewsGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {newsItems.map((item, index) => (
            <Card key={index} className="border-none shadow-none group cursor-pointer">
              <CardHeader className="p-0">
                <div className="relative aspect-[16/9] mb-6 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </CardHeader>
              <CardContent className="px-0 space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                    {item.category}
                  </Badge>
                  <span className="text-gray-400">{item.date}</span>
                </div>
                <h2 className="text-2xl font-medium group-hover:text-gray-600 transition-colors duration-300">
                  {item.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {item.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}