"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Import your JSON with all categories
import data from "./components/data-es.json";
import data2 from "./components/data-en.json";

// Import your custom components
import { ProductCard } from "./components/ProductCard";
import { ProductDetail } from "./components/ProductDetail";
import { InspirationSectionAplication } from "../aplicaciones/sections/InspirationSectionAplication";
import ProjectHelpSection from "../contacto/ProjectHelpSection";

// Translation hook
import { useLanguage } from "@/app/context/LanguageContext";

const inspirationImages = [
  {
    url: "/img/img-1.jpg",
    alt: "Modern facade detail",
  },
  {
    url: "/img/Home.jpg",
    alt: "Urban architecture",
  },
  {
    url: "/img/img-3.jpg",
    alt: "Minimalist building design",
  },
  {
    url: "/img/img-4.jpg",
    alt: "Contemporary architecture",
  },
  {
    url: "/img/img3.jpg",
    alt: "Modern facade detail",
  },
  {
    url: "/img/img-8.jpg",
    alt: "Urban architecture",
  },
  {
    url: "/img/img1.jpg",
    alt: "Minimalist building design",
  },
  {
    url: "/img/image1.jpg",
    alt: "Contemporary architecture",
  },
];

interface ProductCategoryPageProps {
  categoryId: string;
}

export default function ProductCategoryPage({ categoryId }: ProductCategoryPageProps) {
  const { t, language } = useLanguage();
  // 1) Look up the category in JSON




  const foundCategory = language === "es" ? data.categorias.find((cat) => cat.titulo.toLocaleLowerCase() === categoryId.toLocaleLowerCase())
    : data2.categorias.find((cat) => cat.titulo.toLocaleLowerCase() === categoryId.toLocaleLowerCase());



  // 2) If category doesn't exist, render a message
  if (!foundCategory) {
    return (
      <div className="pt-32 px-5">
        <h1 className="text-2xl font-bold">
          {t("categoryNotFound")}
        </h1>
      </div>
    );
  }

  // 3) Manage the selected product
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(0);
  const selectedProduct =
    selectedProductIndex !== null
      ? foundCategory.productos[selectedProductIndex]
      : null;

  return (
    <>
      <section className="md:px-15 sm:px-10 px-5 lg:px-20 pt-32 flex flex-col gap-24">
        {/* Category section: Image + Category description */}
        <section className="flex w-full gap-8">
          <div className="w-1/3 h-96 flex text-center items-center gap-3 flex-col justify-center bg-gray-200">
            <Image
              src={foundCategory.imagen}
              alt={foundCategory.titulo}
              width={150}
              height={150}
            />
            <p className="font-[600] text-lg line-clamp-2 w-36">
              {foundCategory.titulo.toLocaleUpperCase()}
            </p>
          </div>

          <label className="p-8 w-2/3">
            <h2 className="font-[600] text-2xl pb-5">
              {foundCategory.titulo}
            </h2>
            <p>{foundCategory.descripcion}</p>
          </label>
        </section>

        {/* Applications / Finishes */}
        <section className="flex gap-12">
          {/* Aplicaciones */}
          {foundCategory.aplicaciones && (
            <div>
              <h2 className="font-[600] text-xl mb-4">
                {t("productsSection.applications")}
              </h2>
              <ul className="list-disc ml-5">
                {foundCategory.aplicaciones.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Acabados */}
          {foundCategory.acabados && (
            <div>
              <h2 className="font-[600] text-xl mb-4">
                {t("productsSection.finishes")}
              </h2>
              <div className="flex flex-wrap gap-8">
                {foundCategory.acabados.map((acabado, index) => (
                  <div key={index} className="flex flex-col items-start">
                    <h3 className="text-lg font-semibold">{acabado.nombre}</h3>
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
              {foundCategory.productos.map((producto, index) => (
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
