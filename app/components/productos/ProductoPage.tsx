"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
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
  backendData?: any; // Datos del backend si están disponibles
}

export default function ProductCategoryPage({ category, backendData }: ProductCategoryPageProps) {
  const { t } = useLanguage();

  // Asegurar que productos existe y es un array (usar useMemo para evitar cambios en cada render)
  const productos = useMemo(() => category?.productos || [], [category?.productos]);
  const aplicaciones = useMemo(() => {
    const apps = category?.aplicaciones || category?.applications || [];
    return apps
      .map((app: any) => {
        if (typeof app === "string") return app;
        return app?.nombre || app?.name || "";
      })
      .filter(Boolean);
  }, [category?.aplicaciones, category?.applications]);

  // Inicializar selectedProductIndex
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);


  // Actualizar selectedProductIndex cuando haya productos disponibles
  useEffect(() => {
    if (productos.length > 0 && selectedProductIndex === null) {
      setSelectedProductIndex(0);
    } else if (productos.length === 0) {
      setSelectedProductIndex(null);
    }
  }, [productos.length, selectedProductIndex]);

  // Calcular selectedProduct (antes del early return)
  const selectedProduct =
    selectedProductIndex !== null && productos.length > 0 && selectedProductIndex < productos.length
      ? productos[selectedProductIndex]
      : null;

  // Validar que category existe (después de todos los hooks)
  if (!category) {
    return (
      <div className="pt-32 px-5">
        <h1 className="text-2xl font-bold">
          {t("categoryNotFound") || "Category not found"}
        </h1>
      </div>
    );
  }

  // Determinar si usamos datos del backend o locales
  const categoryName = backendData ? (category?.nombre || '') : (category?.titulo || '');
  const categoryImage = backendData ? (category?.imagen || '/img/default.jpg') : (category?.imagen || '/img/default.jpg');
  const categoryDescription = backendData ? (category?.descripcion || '') : (category?.descripcion || '');
  const categoryDescription1 = backendData ? (category?.descripcionCorta || '') : (category?.descripcion1 || '');
  // Obtener alt y title de la imagen del backend, con fallback al nombre
  const categoryImageAlt = backendData ? (category?.image_alt || categoryName) : categoryName;
  const categoryImageTitle = backendData ? (category?.image_title || categoryName) : categoryName;

  const handleDownload = (producto: any) => {
    let link = null;
    for (const element of producto?.documentacion) {
      if (element.nombre == "Ficha Técnica") {
        link = element.enlace;
      }
    }
    window.open(link || "/files/Moldes_cenefas_rodillos.pdf", "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <section className="md:px-15 sm:px-10 px-5 lg:px-20 pt-32 flex flex-col gap-14">
        {/* Category section: Image + Category description */}
        <section className="flex w-full max-md:flex-col gap-8">
          <div className="md:w-2/6  h-[28rem] flex text-center items-center gap-3 flex-col justify-center bg-[#EAEAEA]">
            <Image
              src={categoryImage}
              alt={categoryImageAlt}
              title={categoryImageTitle}
              width={150}
              height={150}
            />
            <p className="font-[700] text-lg text-center ">
              {categoryName?.toLocaleUpperCase()}
            </p>
          </div>

          <label className="p-8 md:w-4/6">
            <h2 className="font-[600] text-3xl pb-5">
              {categoryName}
            </h2>
            <div className="flex gap-2 flex-col">
              <div
                className="font-[600] text-lg"
                dangerouslySetInnerHTML={{ __html: categoryDescription }}
              />
              <div dangerouslySetInnerHTML={{ __html: categoryDescription1 }} />
            </div>

          </label>
        </section>

        {/* Applications / Finishes */}
        <section className="flex gap-12">
          {/* Aplicaciones */}
          {aplicaciones.length > 0 && (
            <div>
              <h2 className="font-[600] text-xl mb-4">
                {t("productsSection.applications")}
              </h2>
              <ul className="list-disc ml-5">
                {aplicaciones.map((item: any, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Acabados */}
          {category?.acabados && Array.isArray(category.acabados) && category.acabados.length > 0 && (
            <div>
              <h2 className="font-[600] text-xl mb-4">
                {t("productsSection.finishes")}
              </h2>
              <div className="flex flex-wrap gap-8">
                {category.acabados.map((acabado: any, index: number) => (
                  <div key={index} className="flex flex-col items-start">
                    <h3 className="text-lg">{acabado?.nombre || ''}</h3>
                    <Image
                      alt={acabado?.nombre || ''}
                      src={acabado?.imagen || '/img/default.jpg'}
                      width={acabado?.nombre === "Liso" || acabado?.nombre === "Smooth" ? 210 : 200}
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
            {productos.length > 0 ? (
              <div className="flex max-sm:flex-wrap gap-6">
                {productos.map((producto: any, index: number) => (
                  <ProductCard
                    key={index}
                    product={producto}
                    isSelected={index === selectedProductIndex}
                    onSelect={() => setSelectedProductIndex(index)}
                    onDownload={() => handleDownload(producto)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">{t("productsSection.noProducts") || "No products available"}</p>
            )}


          </div>
        </section>
      </section>
      {selectedProduct && selectedProduct.nombre !== "MOLDES CENEFAS RODILLOS" && selectedProduct.nombre !== "HERRAMIENTAS" && (
        <div className="md:px-15 sm:px-10 px-5 bg-[#FAF9F9] lg:px-20 mt-14 py-12 flex flex-col">
          {/* Selected product details */}
          <ProductDetail product={selectedProduct} />
        </div>
      )}


      {/* Extra section: inspiration + help */}
      <InspirationSectionAplication images={inspirationImages} />
      <ProjectHelpSection />
    </>
  );
}