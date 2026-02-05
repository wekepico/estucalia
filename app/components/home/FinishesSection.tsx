"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProductCard } from "./components/ProductCard";
import { useLanguage } from "../../context/LanguageContext";
import { getFinishes, type FinishUI } from "@/services/finishesService";
import { Loader } from "lucide-react";

import MorteroCal from "../../../public/img/mortero-cal.svg";
import MorteroMonocapa from "../../../public/img/mortero-monocapa.svg";
import MorteroImpreso from "../../../public/img/mortero-impreso.svg";
import Piedra from "../../../public/img/mortero-piedra.svg";
import MorteroProtectorAgua from "../../../public/img/mortero-protector-agua.svg";

type Lang = "es" | "en" | "fr";

const stripHtml = (value?: string | null) => {
  if (!value) return "";

  // ✅ En cliente: DOMParser quita tags y decodifica entidades
  if (typeof window !== "undefined") {
    const doc = new DOMParser().parseFromString(value, "text/html");
    return (doc.body.textContent || "").trim();
  }

  // ✅ Fallback (SSR)
  return value.replace(/<[^>]*>/g, "").trim();
};


function pickLang(
  lang: Lang,
  es?: string | null,
  en?: string | null,
  fr?: string | null,
) {
  if (lang === "es") return es || en || fr || "";
  if (lang === "fr") return fr || en || es || "";
  return en || es || fr || "";
}

// Opcional: para mantener los mismos nombres “bonitos” del home (traducciones)
const NAME_KEY_BY_CATEGORY_SLUG: Record<string, string> = {
  "lime-mortar": "home.finishes.products.lime",
  "stamped-mortar": "home.finishes.products.printed",
  "single-layer-mortar": "home.finishes.products.monocapa",
  "stone-mortar": "home.finishes.products.stone",
  // water-protector -> si no tienes key, hará fallback al nombre del backend
};

// Opcional: para mantener iconos idénticos a los que ya tenías
const ICON_BY_CATEGORY_SLUG: Record<string, any> = {
  "lime-mortar": MorteroCal,
  "stamped-mortar": MorteroImpreso,
  "single-layer-mortar": MorteroMonocapa,
  "stone-mortar": Piedra,
  "water-protector": MorteroProtectorAgua,
};

export default function FinishesSection() {
  const { t, language } = useLanguage() as any;
  const lang: Lang = (language || "es") as Lang;

  const [finishes, setFinishes] = useState<FinishUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFinishId, setSelectedFinishId] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getFinishes(); // ✅ EL ENDPOINT REAL

        if (!mounted) return;

        const active = (data || [])
          .filter((f: any) => f?.is_active !== false)
          .sort((a: any, b: any) => (a?.order ?? 0) - (b?.order ?? 0));

        setFinishes(active);
        setSelectedFinishId(active[0]?.id ?? null);
      } catch (e) {
        console.error("Error loading finishes (home):", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const tabs = finishes;

  const selectedFinish = useMemo(() => {
    if (!tabs.length) return null;
    return tabs.find((f) => f.id === selectedFinishId) || tabs[0];
  }, [tabs, selectedFinishId]);

  const finishTitle = useMemo(() => {
    if (!selectedFinish) return "";
    const f: any = selectedFinish;

    // en tu JSON el "name" es ES, y name_en / name_fr vienen separados
    return pickLang(lang, f.name_es ?? f.name, f.name_en, f.name_fr);
  }, [selectedFinish, lang]);

  const cards = useMemo(() => {
    const f: any = selectedFinish;
    const cats = f?.categories;
    if (!Array.isArray(cats)) return [];

    // opcional ordenar por order si existe
    return cats
      .filter((c: any) => c?.is_active !== false)
      .sort((a: any, b: any) => (a?.order ?? 0) - (b?.order ?? 0));
  }, [selectedFinish]);

  if (loading) {
    return (
      <section className="py-8 md:py-16 md:px-15 sm:px-10 px-5 lg:px-20 bg-white">
        <div className="mx-auto flex items-center gap-3">
          <Loader className="animate-spin" width={22} height={22} />
          <span>Loading...</span>
        </div>
      </section>
    );
  }

  if (!selectedFinish) return null;

  return (
    <section className="py-8 md:py-16 md:px-15 sm:px-10 px-5 lg:px-20 bg-white">
      <div className="mx-auto">
        <h2 className="text-xl md:text-2xl font-[600] mb-4">
          {t("home.finishes.title")}
        </h2>

        {/* ✅ Tabs = FINISHES (Acabados) */}
        <ScrollArea className="w-full whitespace-nowrap mb-4">
          <div className="flex space-x-4 md:space-x-8 pb-2" role="tablist">
            {tabs.map((f: any) => {
            const label = stripHtml(
              pickLang(lang, f.name_es ?? f.name, f.name_en, f.name_fr),
            );


              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={selectedFinishId === f.id}
                  onClick={() => setSelectedFinishId(f.id)}
                  className={`text-base md:text-xl p-0 pb-1 transition-colors ${
                    selectedFinishId === f.id
                      ? "border-b-2 border-black font-medium"
                      : "hover:border-b hover:border-gray-400"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* ✅ Cards = categories del acabado seleccionado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {cards.map((c: any) => {
            const slug =
              (lang === "en"
                ? c.slug_en
                : lang === "fr"
                  ? c.slug_fr
                  : c.slug) || c.slug;

            // Nombre: si tienes key, usa traducción; sino fallback a nombre backend
            const nameKey = NAME_KEY_BY_CATEGORY_SLUG[c.slug];
            const name =
              (nameKey ? t(nameKey) : "") ||
              pickLang(lang, c.name_es ?? c.name, c.name_en, c.name_fr) ||
              c.name ||
              slug;

            // Icono: usa mapping para que se vea EXACTO como antes
            const icon = ICON_BY_CATEGORY_SLUG[c.slug] || MorteroMonocapa;

            return (
              <div key={slug}>
                <ProductCard id={slug} icon={icon} name={name} />
              </div>
            );
          })}
        </div>

        {/* Si no hay categories en ese acabado */}
        {cards.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            {t("home.finishes.noProducts")}
          </p>
        )}
      </div>
    </section>
  );
}
