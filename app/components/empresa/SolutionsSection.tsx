"use client";

import React from "react";
import Image from "next/image";

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

// Mapa de iconos por SLUG (ES / EN / FR). Resuelve por coincidencia exacta primero
// y luego por keyword, así soporta variaciones del backend en cualquier idioma.
const ICON_BY_SLUG: Record<string, any> = {
  // ES
  "mortero-cal": MorteroCal,
  "mortero-cola": MorteroCola,
  "mortero-monocapa": MorteroMonocapa,
  "mortero-impreso": MorteroImpreso,
  "mortero-juntas": MorteroPolivalente,
  "complementos-y-accesorios": AccesoriosHerramientas,
  "mortero-piedra-decorativa": MorteroPiedra,
  "protector-de-agua": MorteroProtector,
  "puente-de-union": MorteroUnion,
  // EN
  "lime-mortar": MorteroCal,
  "tile-adhesive": MorteroCola,
  "single-layer-mortar": MorteroMonocapa,
  "stamped-mortar": MorteroImpreso,
  "grout-mortar": MorteroPolivalente,
  "accessories-and-tools": AccesoriosHerramientas,
  "talisman-tools": AccesoriosHerramientas,
  "stone-mortar": MorteroPiedra,
  "decorative-stone-mortar": MorteroPiedra,
  "water-protector": MorteroProtector,
  "bonding-bridge": MorteroUnion,
  // FR
  "mortier-a-la-chaux": MorteroCal,
  "mortier-colle": MorteroCola,
  "mortier-monocouche": MorteroMonocapa,
  "mortier-imprime": MorteroImpreso,
  "mortier-pour-joints": MorteroPolivalente,
  "complements-et-accessoires": AccesoriosHerramientas,
  "mortier-pierre-decorative": MorteroPiedra,
  "protecteur-deau": MorteroProtector,
  "pont-dunion": MorteroUnion,
};

const getIconForSlug = (slug?: string | null) => {
  const key = (slug ?? "").toLowerCase();
  if (ICON_BY_SLUG[key]) return ICON_BY_SLUG[key];

  // Fallback por keyword si llega un slug desconocido / alterado
  if (key.includes("monocapa") || key.includes("monocouche") || key.includes("single-layer"))
    return MorteroMonocapa;
  if (key.includes("cola") || key.includes("adhesive") || key.includes("colle"))
    return MorteroCola;
  if (key.includes("impreso") || key.includes("stamped") || key.includes("imprime"))
    return MorteroImpreso;
  if (key.includes("junta") || key.includes("grout") || key.includes("joint"))
    return MorteroPolivalente;
  if (
    key.includes("accesorio") ||
    key.includes("complemento") ||
    key.includes("complement") ||
    key.includes("tool") ||
    key.includes("talisman")
  )
    return AccesoriosHerramientas;
  if (key.includes("piedra") || key.includes("stone") || key.includes("pierre"))
    return MorteroPiedra;
  if (
    key.includes("protector") ||
    key.includes("protecteur") ||
    key.includes("water") ||
    key.includes("agua") ||
    key.includes("eau")
  )
    return MorteroProtector;
  if (
    key.includes("union") ||
    key.includes("puente") ||
    key.includes("pont") ||
    key.includes("bonding") ||
    key.includes("bridge")
  )
    return MorteroUnion;
  if (key.includes("cal") || key.includes("lime") || key.includes("chaux"))
    return MorteroCal;

  return MorteroMonocapa;
};

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
          {list.map((item) => {
            const IconSrc = getIconForSlug(item.slug);

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
