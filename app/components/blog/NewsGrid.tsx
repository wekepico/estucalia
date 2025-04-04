'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';

interface NewsItem {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

interface TranslatedNewsData {
  title: string;
  excerpt: string;
  date: string;
}

const newsItems = [
  {
    id: "mision-comercial-arabia-saudita",
    image: "https://images.unsplash.com/photo-1582657233895-0f37a3f150c0?auto=format&fit=crop&q=80",
    title: "Misión Comercial Directa a Arabia Saudita",
    excerpt: "Grupo Estucalia continúa su expansión internacional con una importante misión comercial en Arabia Saudita, fortaleciendo su presencia en Oriente Medio.",
    date: "15 Oct 2023",
    category: "internacional"
  },
  {
    id: "presentacion-morteros-marruecos",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
    title: "Presentación de Morteros Monocapa en Marruecos",
    excerpt: "Exitosa presentación de nuestra línea de productos en el mercado marroquí, destacando la calidad y versatilidad de nuestros morteros monocapa.",
    date: "28 Sep 2023",
    category: "productos"
  },
  {
    id: "convencion-internacional-rabat",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
    title: "Convención Internacional en Rabat",
    excerpt: "Participación destacada en el evento más importante del sector de la construcción en el norte de África, presentando las últimas innovaciones.",
    date: "15 Sep 2023",
    category: "events"
  },
  {
    id: "nuevas-certificaciones-calidad",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    title: "Nuevas Certificaciones de Calidad",
    excerpt: "Grupo Estucalia obtiene nuevas certificaciones que avalan la calidad de sus productos y procesos de fabricación.",
    date: "1 Sep 2023",
    category: "empresa"
  }
];

export default function NewsGrid() {
  const router = useRouter();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleViewNews = (id: string) => {
    router.push(`/blog/${id}`);
  };

  const translatedNewsItems = newsItems.map(item => {
    const translatedTitle = t(`blog.newsItems.${item.id}.title`);
    const translatedExcerpt = t(`blog.newsItems.${item.id}.excerpt`);
    const translatedDate = t(`blog.newsItems.${item.id}.date`);

    return {
      ...item,
      title: mounted ? (translatedTitle || item.title) : item.title,
      excerpt: mounted ? (translatedExcerpt || item.excerpt) : item.excerpt,
      date: mounted ? (translatedDate || item.date) : item.date
    };
  });

  if (!mounted) {
    return null;
  }

  return (
    <section className="lg:py-20 py-10">
      <div className="mx-auto px-20 md:pd-8 max-sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {translatedNewsItems.map((item, index) => (
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
                    {t(`blog.categories.${item.category}`)}
                  </Badge>
                  <span className="text-gray-400">{item.date}</span>
                </div>
                <h2 className="text-2xl font-medium group-hover:text-gray-600 transition-colors duration-300">
                  {item.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {item.excerpt}
                </p>
                <Button 
                  onClick={() => handleViewNews(item.id)}
                  className="mt-4"
                >
                  {t('blog.viewNews')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}