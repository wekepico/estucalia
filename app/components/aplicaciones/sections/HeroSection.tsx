"use client";

import Image from "next/image";
import { ProductCard } from "../../home/components/ProductCard";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useLanguage } from "@/app/context/LanguageContext";

interface Product {
  id: string;
  name: string;
  icon: string | StaticImport;
}

interface HeroSectionProps {
  category: string | null; // puede venir como HTML (<h1...>...</h1>) o texto
  img: string | null;
  description: string | null; // puede venir como HTML (<p...>...</p>) o texto
  products: Product[] | null;
  imageAlt?: string | null;
  imageTitle?: string | null;
}

const isHtml = (value?: string | null) =>
  !!value && /<\/?[a-z][\s\S]*>/i.test(value);
const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();

export const HeroSection: React.FC<HeroSectionProps> = ({
  description,
  category,
  products,
  img,
  imageAlt,
  imageTitle,
}) => {
  const { t } = useLanguage();

  // alt/title: si category viene como HTML, usa texto plano
  const categoryText = category
    ? isHtml(category)
      ? stripHtml(category)
      : category
    : "";

  // Usar alt y title del backend si están disponibles, sino usar category como fallback
  const imgAlt = imageAlt
    ? isHtml(imageAlt)
      ? stripHtml(imageAlt)
      : imageAlt
    : categoryText || "";

  const imgTitle = imageTitle
    ? isHtml(imageTitle)
      ? stripHtml(imageTitle)
      : imageTitle
    : categoryText || "";

  return (
    <div className="flex flex-col gap-16 md:gap-28 px-5 pt-16 sm:px-10 md:px-15 lg:px-20">
      {/* Contenedor principal */}
      <div className="w-full flex flex-col md:flex-row h-auto md:h-[480px]">
        {/* Contenedor de texto */}
        <div className="flex w-full md:w-[43%] gap-6 bg-gray-200 px-6 py-8 md:px-12 md:py-16 flex-col">
          {/* ✅ Category: si viene HTML lo renderizamos; si no, lo mostramos como siempre */}
          {isHtml(category) ? (
            <div dangerouslySetInnerHTML={{ __html: category || "" }} />
          ) : (
            <h1 className="font-semibold sm:text-xl   lg:text-4xl md:text-2xl">
              {category}
            </h1>
          )}

          {/* ✅ Description: si viene HTML lo renderizamos; si no, lo envolvemos en <p> con clases */}
          {isHtml(description) ? (
            <div dangerouslySetInnerHTML={{ __html: description || "" }} />
          ) : (
            <p className="text-base xl:text-lg md:text-sm">{description}</p>
          )}
        </div>

        {/* Contenedor de la imagen */}
        <div className="relative w-full md:w-[57%] h-64 md:h-auto bg-slate-500">
          <Image
            src={img || ""}
            alt={imgAlt}
            title={imgTitle}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16">
        {products?.map((product) => (
          <div key={product.id}>
            <ProductCard
              id={product.id}
              icon={product.icon}
              name={product.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
