"use client";

import React from "react";
import { ProductCard } from "./components/ProductCard";

export type HeroViewItem = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  categories: {
    slug: string;
    name: string;
    iconUrl: string | null;
  }[];
};

export const HeroSection: React.FC<{ data: HeroViewItem[] }> = ({ data }) => {
  return (
    <div className="flex flex-col gap-16 md:gap-28 px-5 sm:px-10 md:px-15 lg:px-20 pb-16">
      {data.map((element, index) => (
        <div
          key={element.id}
          className={`w-full flex flex-col ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } gap-8 md:gap-16 h-auto md:h-[520px]`}
        >
          {/* texto + categorías */}
          <div className="flex flex-col w-full md:w-2/5 gap-6 justify-between">
            <div className="flex flex-col gap-6">
              <h1 className="font-semibold text-3xl">{element.title}</h1>
              <p className="text-lg">{element.description}</p>
            </div>

            {!!element.categories.length && (
              <div className="flex gap-4 flex-wrap">
                {element.categories.map((cat) => (
                  <ProductCard
                    key={cat.slug}
                    slug={cat.slug}
                    name={cat.name}
                    iconUrl={cat.iconUrl}
                  />
                ))}
              </div>
            )}
          </div>

          {/* imagen derecha */}
          <div className="relative w-full md:w-3/5 h-64 md:h-auto bg-gray-100">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${element.image || ""}')` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
