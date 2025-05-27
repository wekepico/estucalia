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
    url: "/convertedImages/img-1.webp",
    alt: "Modern facade detail"
  },
  {
    url: "/convertedImages/Home.webp",
    alt: "Urban architecture"
  },
  {
    url: "/convertedImages/img-3.webp",
    alt: "Minimalist building design"
  },
  {
    url: "/convertedImages/img-4.webp",
    alt: "Contemporary architecture"
  },
  {
    url: "/convertedImages/img3.webp",
    alt: "Modern facade detail"
  },
  {
    url: "/convertedImages/img-8.webp",
    alt: "Urban architecture"
  },
  {
    url: "/convertedImages/img1.webp",
    alt: "Minimalist building design"
  },
  {
    url: "/convertedImages/image1.webp",
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

    const handleDownload = () =>{
      window.open("/files/Moldes_cenefas_rodillos.pdf", "_blank", "noopener,noreferrer");
    }

  return (
    <>
      <section className="md:px-15 sm:px-10 px-5 lg:px-20 pt-32 flex flex-col gap-14">
        {/* Category section: Image + Category description */}
        <section className="flex w-full max-md:flex-col gap-8">
          <div className="md:w-2/6  h-[28rem] flex text-center items-center gap-3 flex-col justify-center bg-[#EAEAEA]">
            <Image
              src={category.imagen}
              alt={category.titulo}
              width={150}
              height={150}
            />
            <p className="font-[700] text-lg text-center ">
              {category.titulo.toLocaleUpperCase()}
            </p>
          </div>

          <label className="p-8 md:w-4/6">
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
                      width={acabado.nombre === "Liso" || acabado.nombre === "Smooth" ? 210 : 200}
                      height={160}
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
            <div className="flex max-sm:flex-wrap gap-6">
              {category.productos.map((producto: any, index: number) => (
                <ProductCard
                  key={index}
                  product={producto}
                  isSelected={index === selectedProductIndex}
                  onSelect={() => setSelectedProductIndex(index)}
                  onDownload={handleDownload}
                />
              ))}
            </div>


          </div>
        </section>
      </section>
      {selectedProduct.nombre !== "MOLDES CENEFAS RODILLOS"  && selectedProduct.nombre !== "HERRAMIENTAS" &&

        <div className="md:px-15 sm:px-10 px-5 bg-[#FAF9F9] lg:px-20 mt-14 py-12 flex flex-col">
          {/* Selected product details */}
          {selectedProduct && <ProductDetail product={selectedProduct} />}
        </div>
      }


      {/* Extra section: inspiration + help */}
      <InspirationSectionAplication images={inspirationImages} />
      <ProjectHelpSection />
    </>
  );
}