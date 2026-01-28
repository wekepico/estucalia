"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLanguage } from "../../context/LanguageContext";
import {
  useApplicationsTabs,
  useSpacesWithApplications,
} from "@/api/useApplicationsAndSpaces";
import type { Application } from "@/services/applicationsService";
import type { Space } from "@/services/spacesService";

export default function AplicationSection() {
  const { t, language } = useLanguage();

  const { data: appsRes } = useApplicationsTabs();
  const { data: spacesRes } = useSpacesWithApplications();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // Helpers de idioma
  const appLabel = (a: Application) => {
    if (language === "en") return a.name_en ?? a.name_es ?? "";
    if (language === "fr") return a.name_fr ?? a.name_es ?? "";
    return a.name_es ?? "";
  };

  const spaceTitle = (s: Space) => {
    if (language === "en") return s.title_en ?? s.title ?? "";
    if (language === "fr") return s.title_fr ?? s.title ?? "";
    return s.title ?? "";
  };

  const spaceSlugForRoute = (s: Space) => {
    if (language === "en") return s.slug_en ?? s.slug;
    if (language === "fr") return s.slug_fr ?? s.slug;
    return s.slug;
  };

  // Datos base
  const applications = appsRes?.data ?? [];
  const spaces = spacesRes?.data ?? [];

  // selected app = 1ra app disponible
  const [selectedAppSlug, setSelectedAppSlug] = useState<string>("");

  useEffect(() => {
    if (!selectedAppSlug && applications.length > 0) {
      setSelectedAppSlug(applications[0].slug);
    }
    // si cambian las apps y el seleccionado ya no existe
    if (
      selectedAppSlug &&
      applications.length > 0 &&
      !applications.some((a) => a.slug === selectedAppSlug)
    ) {
      setSelectedAppSlug(applications[0].slug);
    }
  }, [applications, selectedAppSlug]);

  // Filtrado: spaces que incluyan esa application (viene en /spaces/{slug} con applications)
  const filteredSpaces = useMemo(() => {
    if (!selectedAppSlug) return [];
    return spaces.filter((s) => {
      const apps = s.applications ?? [];
      return apps.some((a: any) => a?.slug === selectedAppSlug);
    });
  }, [spaces, selectedAppSlug]);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.offsetWidth / visibleCards;

    container.scrollTo({
      left:
        direction === "right"
          ? container.scrollLeft + cardWidth + 28
          : container.scrollLeft - (cardWidth + 28),
      behavior: "smooth",
    });
  };

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) handleScroll("right");
    if (touchEnd - touchStart > 50) handleScroll("left");
  };

  return (
    <section className="py-16 md:py-32 md:px-15 sm:px-10 px-5 lg:px-20 bg-white">
      <div className="mx-auto">
        <h2 className="text-2xl font-[600] mb-4 md:mb-6">
          {t("home.applications.title")}
        </h2>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Tabs = Applications */}
          <ScrollArea className="w-full whitespace-nowrap mb-4">
            <div className="flex space-x-4 md:space-x-9 pb-2" role="tablist">
              {(applications.length ? applications : []).map((app) => {
                const label = appLabel(app);
                return (
                  <button
                    key={app.slug}
                    role="tab"
                    aria-selected={selectedAppSlug === app.slug}
                    onClick={() => setSelectedAppSlug(app.slug)}
                    className={`text-[1rem] p-0 pb-1 transition-colors ${
                      selectedAppSlug === app.slug
                        ? "border-b-2 border-black font-medium"
                        : "hover:border-b hover:border-gray-400"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Flechas */}
          <div className="flex gap-2 self-end md:self-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleScroll("left")}
              className="w-10 h-10 md:w-12 md:h-12"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleScroll("right")}
              className="w-10 h-10 md:w-12 md:h-12"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
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
        </div>

        {/* Cards = Spaces filtrados por app */}
        <div
          ref={scrollContainerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative overflow-x-hidden scroll-smooth"
        >
          <div className="flex gap-8 md:gap-14">
            {filteredSpaces.map((space) => {
              const title = spaceTitle(space);
              const image = space.image_url ?? "/img/default.jpg";
              const routeSlug = spaceSlugForRoute(space);

              return (
                <Card
                  key={space.slug}
                  className="flex flex-col border-none cursor-pointer shadow-none carousel-card"
                  style={{
                    minWidth: `calc(${100 / visibleCards}% - ${(visibleCards - 1) * 16}px)`,
                    scrollSnapAlign: "start",
                  }}
                  onClick={() =>
                    (window.location.href = "/espacios/" + routeSlug)
                  }
                >
                  <CardContent className="p-0">
                    <div className="relative h-[380px] md:h-[550px] group">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${image}')` }}
                      />
                      <div className="absolute top-0 left-0 right-0 p-4 md:p-6 text-right">
                        <h3 className="text-black text-lg md:text-xl font-medium backdrop-blur-sm inline-block px-4 py-2 rounded-lg">
                          {title}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
