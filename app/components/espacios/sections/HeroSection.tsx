"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ProductCard } from "../../home/components/ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLanguage } from "@/app/context/LanguageContext";

interface Product {
  id: string;
  name: string;
  icon: string; // URL (category.image_url)
  appKey: string; // para filtrar por tab
}

interface ApplicationTab {
  key: string; // slug ES (estable)
  label: string; // nombre localizado
}

interface HeroSectionProps {
  category: string; // puede venir como HTML (<h1 ...>...</h1>)
  img: string;
  description: string; // puede venir como HTML (<p ...>...</p>)
  products: Product[];
  aplicaciones: ApplicationTab[];
  onTabChange?: (key: string) => void;
}

// ✅ Para usar alt/title en texto plano aunque category venga con HTML
const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();

export const HeroSection: React.FC<HeroSectionProps> = ({
  description,
  category,
  products,
  img,
  aplicaciones,
  onTabChange,
}) => {
  const { t } = useLanguage();
  // Inicializamos con la primera aplicación SINCRÓNICAMENTE para que el SSR
  // pueda renderizar el contenido. Si no, useEffect no corre en SSR y el
  // componente devuelve null → el HTML que ve Google queda vacío.
  const [selectedAplicacion, setSelectedAplicacion] = useState<string | null>(
    aplicaciones?.[0]?.key ?? null,
  );

  useEffect(() => {
    if (!aplicaciones?.length) return;

    const keys = new Set(aplicaciones.map((a) => a.key));

    // ✅ si ya hay selección y sigue existiendo, NO TOQUES NADA
    if (selectedAplicacion && keys.has(selectedAplicacion)) return;

    // ✅ si no hay selección (primera carga) o ya no existe, setea la primera
    const first = aplicaciones[0].key;
    setSelectedAplicacion(first);
    onTabChange?.(first);
  }, [aplicaciones, selectedAplicacion, onTabChange]);

  const filteredProducts = useMemo(() => {
    if (!selectedAplicacion) return [];
    return products.filter((p) => p.appKey === selectedAplicacion);
  }, [products, selectedAplicacion]);

  const categoryText = useMemo(() => stripHtml(category || ""), [category]);

  if (!selectedAplicacion) return null;

  return (
    <div className="flex flex-col gap-16 md:gap-28 px-5 sm:px-10 md:px-15 lg:px-20">
      {/* Hero */}
      <div className="w-full flex flex-col md:flex-row h-auto md:h-[480px]">
        <div className="flex w-full md:w-[43%] gap-6 bg-gray-200 px-6 py-8 md:px-12 md:py-16 flex-col">
          {/* ✅ renderiza HTML tal cual viene del backend */}
          <div dangerouslySetInnerHTML={{ __html: category || "" }} />
          <div dangerouslySetInnerHTML={{ __html: description || "" }} />
        </div>

        <div className="relative w-full md:w-[57%] h-64 md:h-auto bg-slate-500">
          <Image
            src={img}
            alt={categoryText || "Space"}
            title={categoryText || "Space"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Tabs + Grid */}
      <div>
        <h2 className="text-2xl font-[600] mb-4 md:mb-6">
          {t("heroSection.applications")}
        </h2>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <ScrollArea className="w-full md:flex-1">
            <div className="flex min-w-max pb-5" role="tablist">
              {aplicaciones.map((a) => {
                const labelText = stripHtml(a.label || ""); // ✅ limpia HTML y evita que se muestren tags

                return (
                  <button
                    key={a.key}
                    role="tab"
                    aria-selected={selectedAplicacion === a.key}
                    onClick={() => {
                      setSelectedAplicacion(a.key);
                      onTabChange?.(a.key);
                    }}
                    className={`text-base md:text-xl p-0 mr-3 md:mr-6 pb-1 transition-colors whitespace-nowrap ${
                      selectedAplicacion === a.key
                        ? "border-b-2 border-black font-medium"
                        : "hover:border-b hover:border-gray-400"
                    }`}
                  >
                    {labelText}
                  </button>
                );
              })}
            </div>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <ProductCard
                id={product.id}
                icon={product.icon}
                name={product.name}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            {t("heroSection.noProducts")}
          </p>
        )}
      </div>
    </div>
  );
};
