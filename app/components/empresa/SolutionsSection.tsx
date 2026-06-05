"use client";

import React from "react";
import Image from "next/image";

import { useCategories } from "@/api/useCategories";

import MorteroCal from "../../../public/img/mortero-cal.svg";
import MorteroMonocapa from "../../../public/img/mortero-monocapa.svg";
import MorteroImpreso from "../../../public/img/mortero-impreso.svg";
import MorteroPolivalente from "../../../public/img/mortero-juntas.svg";
import MorteroProtector from "../../../public/img/mortero-protector-agua.svg";
import AccesoriosHerramientas from "../../../public/img/accerios-y-herramientas.svg";
import MorteroCola from "../../../public/img/mortero-cola.svg";
import MorteroPiedra from "../../../public/img/mortero-piedra.svg";
import MorteroUnion from "../../../public/img/mortero puente union.svg";

type ApiCategoryItem = {
  slug: string;
  label: string | null;
};

const splitText = (texto: string) => {
  const words = (texto ?? "").toLocaleUpperCase().split(" ");
  const middle = Math.ceil(words.length / 2);
  return (
    <>
      {words.slice(0, middle).join(" ")}
      <br />
      {words.slice(middle).join(" ")}
    </>
  );
};

// Mapa de iconos por POSICIÓN (layout idéntico 3x3)
const iconsByIndex = [
  MorteroMonocapa,
  MorteroCola,
  MorteroCal,
  MorteroPolivalente,
  MorteroImpreso,
  MorteroPiedra,
  MorteroProtector,
  MorteroUnion,
  AccesoriosHerramientas,
];

export default function SolutionsSection({
  titleHtml,
  introHtml,
  items,
}: {
  titleHtml: string | null;
  introHtml: string | null;
  items: ApiCategoryItem[];
}) {
  const list = (items ?? []).slice(0, 9);

  // Iconos por slug desde el backend (misma fuente que el menú: cat.image_url)
  const { data: categoriesData } = useCategories();
  const iconBySlug = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const cat of categoriesData?.data ?? []) {
      if (!cat.image_url) continue;
      // Registrar todas las variantes de slug para asegurar la coincidencia
      for (const s of [cat.slug, cat.slug_es, cat.slug_en, cat.slug_fr]) {
        if (s) map.set(s, cat.image_url);
      }
    }
    return map;
  }, [categoriesData]);

  return (
    <section className="py-40 bg-[#F5ECEB] flex flex-col items-center justify-center">
      <div className="mx-auto px-0 max-sm:px-2">
        <div className="text-center mb-16">
          <div
            className="text-3xl font-[600] mb-10"
            dangerouslySetInnerHTML={{ __html: titleHtml ?? "" }}
          />
          <div
            className="mt-4 text-base"
            dangerouslySetInnerHTML={{ __html: introHtml ?? "" }}
          />
        </div>

        <div className="grid items-center justify-center grid-row-3 grid-cols-3 gap-y-8 gap-x-[4rem]">
          {list.map((item, index) => {
            // Preferir el icono del backend por slug (igual que el menú);
            // si no hay coincidencia, usar el SVG local por posición.
            const IconSrc =
              iconBySlug.get(item.slug) ??
              iconsByIndex[index] ??
              MorteroMonocapa;

            return (
              <div
                key={item.slug}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() =>
                  (window.location.href = "/categories/" + item.slug)
                }
              >
                <div className="flex-shrink-0">
                  <Image
                    src={IconSrc}
                    alt={item.label ?? "Categoría"}
                    width={180}
                    height={100}
                    className="h-32 md:h-12 w-auto"
                    style={{ width: "auto" }}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-[600] leading-[1.05]">
                    {splitText(item.label ?? "")}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
