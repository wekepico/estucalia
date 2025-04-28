"use client";

import Image from "next/image";
import { FC } from "react";
import { Button } from "../../ui/button";
import { useLanguage } from "@/app/context/LanguageContext";

interface IProducto {
  nombre: string;
  subtitulo?: string;
  imagen?: string;
}

interface ProductCardProps {
  product: IProducto;
  isSelected?: boolean;
  onSelect: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({
  product,
  isSelected = false,
  onSelect,
}) => {
  const { t } = useLanguage();

  return (
    <div
      className = {`w-[180px] px-5 pt-20  pb-8 flex flex-col justify-between gap-7 items-center cursor-pointer
        ${isSelected ? "border-black border" : ""}
      `}
      onClick={onSelect}
    >
      <div className="mb-2 m-auto">
        <Image
          src={product.imagen || "/images/no-image.png"}
          alt={product.nombre}
          width={160}
          height={180}
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <h3 className="font-bold text-center text-sm">{product.nombre}</h3>
          {product.subtitulo && (
            <p className="text-center text-sm ">{product.subtitulo}</p>
          )}
        </div>

        <Button
          variant={isSelected ? "default" : `ghost`}
          className="relative pl-5 pr-12 py-2 md:py-2 border border-black  rounded-none"
          size={"sm"}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {/* Example usage of the translation for your button text */}
          <span>{t("productsSection.productInfo")}</span>
          <div className="absolute right-0">
            <svg
              className={`w-8 h-8 transition-all ${isSelected ? "rotate-90" : "rotate-0"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Button>

      </div>
    </div>
  );
};
