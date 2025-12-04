'use client'
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLanguage } from '../../context/LanguageContext';
import { useHome } from '@/api/useHome';

export default function AplicationSection() {
  const { t, language } = useLanguage();
  const { data: homeData } = useHome();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  
  // Fallback estático de categorías
  const fallbackCategories = [
    t('home.applications.categories.coatings'),
    t('home.applications.categories.plasters'),
    t('home.applications.categories.masonry'),
    t('home.applications.categories.tiles'),
    t('home.applications.categories.thermal'),
    t('home.applications.categories.waterproofing'),
    t('home.applications.categories.dehumidification')
  ];

  // Fallback estático de espacios
  const fallbackSpaces = [
    {
      id:"balconies",
      image: "/img/aplicaciones/balcones.jpg",
      title: t('home.applications.spaces.balconies'),
      categories: `${t('home.applications.categories.coatings')},${t('home.applications.categories.plasters')},${t('home.applications.categories.tiles')},${t('home.applications.categories.plasters')},${t('home.applications.categories.waterproofing')},${t('home.applications.categories.masonry')}`
    },
    {
      id:"kitchens",
      image: "/img/aplicaciones/cocina exterior.jpg",
      title: t('home.applications.spaces.kitchens'),
      categories: `${t('home.applications.categories.coatings')},${t('home.applications.categories.plasters')},${t('home.applications.categories.tiles')},${t('home.applications.categories.masonry')},${t('home.applications.categories.waterproofing')}`
    },
    {
      id:"facades",
      image: "/img/aplicaciones/fachada.jpg",
      title: t('home.applications.spaces.facades'),
      categories: `${t('home.applications.categories.coatings')},${t('home.applications.categories.plasters')},${t('home.applications.categories.masonry')},${t('home.applications.categories.thermal')},${t('home.applications.categories.waterproofing')},${t('home.applications.categories.dehumidification')}`
    },
    {
      id:"walls",
      image: "/img/aplicaciones/paredes.jpg",
      title: t('home.applications.spaces.walls'),
      categories: `${t('home.applications.categories.coatings')},${t('home.applications.categories.plasters')},${t('home.applications.categories.masonry')},${t('home.applications.categories.tiles')},${t('home.applications.categories.thermal')},${t('home.applications.categories.waterproofing')},${t('home.applications.categories.dehumidification')}`
    },
    {
      id:"patios",
      image: "/img/aplicaciones/patios y lucernarios.jpg",
      title: t('home.applications.spaces.patios'),
      categories: `${t('home.applications.categories.coatings')},${t('home.applications.categories.plasters')},${t('home.applications.categories.masonry')},${t('home.applications.categories.tiles')},${t('home.applications.categories.waterproofing')},${t('home.applications.categories.dehumidification')}`
    },
    {
      id:"floors",
      image: "/img/aplicaciones/pavimentos.jpg",
      title: t('home.applications.spaces.floors'),
      categories: `${t('home.applications.categories.coatings')},${t('home.applications.categories.tiles')},${t('home.applications.categories.waterproofing')},${t('home.applications.categories.dehumidification')}`
    },
    {
      id:"pools",
      image: "/img/aplicaciones/piscina.jpg",
      title: t('home.applications.spaces.pools'),
      categories: `${t('home.applications.categories.coatings')},${t('home.applications.categories.tiles')},${t('home.applications.categories.waterproofing')}`
    },
    {
      id:"terraces",
      image: "/img/aplicaciones/terraza.jpg",
      title: t('home.applications.spaces.terraces'),
      categories: `${t('home.applications.categories.coatings')},${t('home.applications.categories.plasters')},${t('home.applications.categories.masonry')},${t('home.applications.categories.tiles')},${t('home.applications.categories.thermal')},${t('home.applications.categories.waterproofing')}`
    }
  ];

  // Transformar datos del backend a formato esperado por el componente
  const transformBackendData = useMemo(() => {
    if (!homeData?.applications_items || !Array.isArray(homeData.applications_items) || homeData.applications_items.length === 0) {
      return {
        categories: fallbackCategories,
        spaces: fallbackSpaces
      };
    }

    // Intentar extraer categorías del backend
    // Asumimos que applications_items puede tener diferentes estructuras
    let backendCategories: string[] = [];
    let backendSpaces: any[] = [];

    try {
      // Probar diferentes estructuras posibles
      const items = homeData.applications_items;
      
      // Si el primer item tiene una estructura específica, procesarla
      if (items.length > 0) {
        // Intentar extraer categorías únicas si vienen en los items
        items.forEach((item: any) => {
          if (item.categories && Array.isArray(item.categories)) {
            item.categories.forEach((cat: any) => {
              const catName = typeof cat === 'string' ? cat : (cat.name || cat.title || '');
              if (catName && !backendCategories.includes(catName)) {
                backendCategories.push(catName);
              }
            });
          }
        });

        // Transformar items a formato de espacios
        backendSpaces = items.map((item: any) => {
          // Intentar diferentes estructuras del backend
          return {
            id: item.id || item.slug || item.title?.toLowerCase().replace(/\s+/g, '-') || `space-${Math.random()}`,
            image: item.image || item.image_url || item.photo || item.img || '/img/default.jpg',
            title: item.title || item.name || item.title_es || item.name_es || '',
            categories: Array.isArray(item.categories) 
              ? item.categories.map((c: any) => typeof c === 'string' ? c : (c.name || c.title || '')).join(',')
              : (item.category || '')
          };
        }).filter((space: any) => space.title && space.image);
      }
    } catch (error) {
      console.error('Error procesando datos del backend:', error);
    }

    // Si no se pudieron extraer datos válidos, usar fallback
    return {
      categories: backendCategories.length > 0 ? backendCategories : fallbackCategories,
      spaces: backendSpaces.length > 0 ? backendSpaces : fallbackSpaces
    };
  }, [homeData, fallbackCategories, fallbackSpaces]);

  // Usar datos del backend si están disponibles, sino usar fallback
  const categories = transformBackendData.categories;
  const spaces = transformBackendData.spaces;

  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || '');

  // Actualizar selectedCategory cuando cambien las categorías
  useEffect(() => {
    if (categories.length > 0 && !categories.includes(selectedCategory)) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const filteredSpaces = spaces.filter(product =>
    product.categories.includes(selectedCategory)
  );

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
        <h2 className="text-2xl font-[600] mb-4 md:mb-6">{t('home.applications.title')}</h2>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Categories Scroll */}
          <ScrollArea className="w-full whitespace-nowrap mb-4">
            <div className="flex space-x-4 md:space-x-9 pb-2" role="tablist">
              {categories.map((category) => (
                <button
                  key={category}
                  role="tab"
                  aria-selected={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-[1rem]  p-0 pb-1 transition-colors ${selectedCategory === category
                      ? 'border-b-2 border-black font-medium'
                      : 'hover:border-b hover:border-gray-400'
                    }`}
                >
                  {category}
                </button>
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
            {filteredSpaces.map((space) => (
              <Card
                key={space.title}
                className="flex flex-col border-none cursor-pointer shadow-none carousel-card"
                style={{
                  minWidth: `calc(${100 / visibleCards}% - ${(visibleCards - 1) * 16}px)`,
                  scrollSnapAlign: 'start'
                }}
                onClick={() =>window.location.href = "/espacios/" + space.id}
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