'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from 'next/link';

const categories = ["Revestimientos", "Revocos y enlucidos",
  "Albañilería", "Baldosas", "Recrecidos", "Aislamiento térmico",
  "Impermeabilización", "Deshumidificación"];

const spaces = [
  {
    image: "/img/aplicaciones/balcones.jpg",
    title: "Balcones"
  },
  {
    image: "/img/aplicaciones/cocina exterior.jpg",
    title: "Cocina exterior"
  },
  {
    image: "/img/aplicaciones/fachada.jpg",
    title: "Fachada"
  },
  {
    image: "/img/aplicaciones/paredes.jpg",
    title: "Paredes"
  },
  {
    image: "/img/aplicaciones/patios y lucernarios.jpg",
    title: "Patios y lucernarios"
  },
  {
    image: "/img/aplicaciones/pavimentos.jpg",
    title: "Pavimentos"
  },
  {
    image: "/img/aplicaciones/piscina.jpg",
    title: "Piscina"
  },
  {
    image: "/img/aplicaciones/terraza.jpg",
    title: "Terraza"
  },
];

export default function AplicationSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3); // Número de tarjetas visibles

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1); // 1 tarjeta en móvil
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2); // 2 tarjetas en tablet
      } else {
        setVisibleCards(3); // 3 tarjetas en desktop
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);

    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth / visibleCards;

      container.scrollTo({
        left: direction === 'right'
          ? container.scrollLeft + cardWidth + 28
          : container.scrollLeft - (cardWidth + 28),
        behavior: 'smooth'
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleScroll('right');
    }
    if (touchEnd - touchStart > 50) {
      handleScroll('left');
    }
  };

  return (
    <section className="py-16 md:py-32 md:px-15 sm:px-10 px-5 lg:px-20  bg-white">
      <div className="mx-auto">
        <h2 className="text-2xl font-bold mb-4 md:mb-6">Aplicaciones</h2>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Categories Scroll */}
          <ScrollArea className="w-full md:flex-1">
            <div className="flex min-w-max pb-5">
              {categories.map((category) => (
                <div key={category}>
                  <Link
                    className='text-base md:text-xl p-0 mr-3 md:mr-6 hover:border-b pb-1 hover:border-black'
                    href={"/#"}
                  >
                    {category}
                  </Link>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {/* Navigation Arrows */}
          <div className='flex gap-2 self-end md:self-auto'>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleScroll('left')}
              className="w-10 h-10 md:w-12 md:h-12"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleScroll('right')}
              className="w-10 h-10 md:w-12 md:h-12"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
        {/* Image Cards */}
        <div
          ref={scrollContainerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative overflow-x-hidden scroll-smooth"
        >
          <div className="flex gap-8 md:gap-14">
            {spaces.map((space) => (
              <Card
                key={space.title}
                className="flex flex-col border-none shadow-none carousel-card"
                style={{
                  minWidth: `calc(${100 / visibleCards}% - ${(visibleCards - 1) * 16}px)`,
                  scrollSnapAlign: 'start'
                }}
              >
                <CardContent className="p-0">
                  <div className="relative h-[380px] md:h-[550px] group">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${space.image}')`
                      }}
                    />
                    <div className="absolute top-0 left-0 right-0 p-4 md:p-6 text-right">
                      <h3 className="text-black text-lg md:text-xl font-medium backdrop-blur-sm inline-block px-4 py-2 rounded-lg">
                        {space.title}
                      </h3>
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