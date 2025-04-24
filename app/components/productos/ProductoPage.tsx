"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductCard } from "./components/ProductCard";
import { ProductDetail } from "./components/ProductDetail";
import { InspirationSectionAplication } from "../aplicaciones/sections/InspirationSectionAplication";
import ProjectHelpSection from "../contacto/ProjectHelpSection";
import { useLanguage } from "@/app/context/LanguageContext";

const inspirationImages = [
  {
    url: "/img/img-1.jpg",
    alt: "Modern facade detail"
  },
  {
    url: "/img/Home.jpg",
    alt: "Urban architecture"
  },
  {
    url: "/img/img-3.jpg",
    alt: "Minimalist building design"
  },
  {
    url: "/img/img-4.jpg",
    alt: "Contemporary architecture"
  },
  {
    url: "/img/img3.jpg",
    alt: "Modern facade detail"
  },
  {
    url: "/img/img-8.jpg",
    alt: "Urban architecture"
  },
  {
    url: "/img/img1.jpg",
    alt: "Minimalist building design"
  },
  {
    url: "/img/image1.jpg",
    alt: "Contemporary architecture"
  },
];


interface ProductCategoryPageProps {
  category: any;
}

export default function ProductCategoryPage({ category }: ProductCategoryPageProps) {
  const { t } = useLanguage();
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(0);

  const selectedProduct =
    selectedProductIndex !== null
      ? category.productos[selectedProductIndex]
      : null;

  return (
    <>
      <section className="md:px-15 sm:px-10 px-5 lg:px-20 pt-32 flex flex-col gap-24">
        {/* Category section: Image + Category description */}
        <section className="flex w-full gap-8">
          <div className="md:w-2/5  h-[28rem] flex text-center items-center gap-3 flex-col justify-center bg-gray-300">
            <Image
              src={category.imagen}
              alt={category.titulo}
              width={150}
              height={150}
            />
            <p className="font-[600] text-lg line-clamp-2 w-36">
              {category.titulo.toLocaleUpperCase()}
            </p>
          </div>

          <label className="p-8 md:w-3/5">
            <h2 className="font-[600] text-3xl pb-5">
              {category.titulo}
            </h2>
            <div className="flex gap-2 flex-col">
              <p className="font-[600] text-lg">{category.descripcion}</p>
              <p >{category.descripcion1}</p>
            </div>
            
          </label>
        </section>

        {/* Applications / Finishes */}
        <section className="flex gap-12">
          {/* Aplicaciones */}
          {category.aplicaciones && (
            <div>
              <h2 className="font-[600] text-xl mb-4">
                {t("productsSection.applications")}
              </h2>
              <ul className="list-disc ml-5">
                {category.aplicaciones.map((item: any, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Acabados */}
          {category.acabados && (
            <div>
              <h2 className="font-[600] text-xl mb-4">
                {t("productsSection.finishes")}
              </h2>
              <div className="flex flex-wrap gap-8">
                {category.acabados.map((acabado: any, index: number) => (
                  <div key={index} className="flex flex-col items-start">
                    <h3 className="text-lg">{acabado.nombre}</h3>
                    <Image
                      alt={acabado.nombre}
                      src={acabado.imagen}
                      width={200}
                      height={140}
                      className="bg-gray-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Products section */}
        <section className="flex flex-col gap-12">
          <h2 className="font-[600] text-2xl mb-5">
            {t("productsSection.products")}
          </h2>
          <div className="flex flex-col gap-10">
            {/* Product carousel */}
            <div className="flex gap-6">
              {category.productos.map((producto: any, index: number) => (
                <ProductCard
                  key={index}
                  product={producto}
                  isSelected={index === selectedProductIndex}
                  onSelect={() => setSelectedProductIndex(index)}
                />
              ))}
            </div>

            {/* Selected product details */}
            {selectedProduct && <ProductDetail product={selectedProduct} />}
          </div>
        </section>
      </section>

      {/* Extra section: inspiration + help */}
      <InspirationSectionAplication images={inspirationImages} />
      <ProjectHelpSection />
    </>
  );
}