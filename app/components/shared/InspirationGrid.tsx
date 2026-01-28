"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  getInspirationPageWithItems,
  type InspirationDTO,
  type Lang,
} from "@/services/inspirationsService";

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

type Props = {
  limitOverride?: number;
  showAll?: boolean;
  showTitle?: boolean;
  className?: string;

  /** ✅ si lo pasas, el título será t(uiTitleKey) (ideal para Home/Products) */
  uiTitleKey?: string;

  /** ✅ controla tamaños del grid (por defecto “grande”) */
  rowHeight?: { base: number; md: number }; // px
  gap?: number; // Tailwind gap (ej 4, 6, 12)
};

export default function InspirationGrid({
  limitOverride,
  showAll = false,
  showTitle = true,
  className = "",
  uiTitleKey,
  rowHeight = { base: 220, md: 260 }, // 🔥 más grande que antes
  gap = 8, // 🔥 más parecido a tu look anterior
}: Props) {
  const { language, t } = useLanguage() as any;
  const lang: Lang = (language || "es") as Lang;

  const [pageTitle, setPageTitle] = useState<string>("");
  const [defaultLimit, setDefaultLimit] = useState<number>(8);
  const [items, setItems] = useState<InspirationDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getInspirationPageWithItems();
        if (!mounted) return;

        const page = data.page;
        setPageTitle(
          pickLang(lang, page?.title_es, page?.title_en, page?.title_fr),
        );

        const lim = page?.default_limit;
        setDefaultLimit(typeof lim === "number" ? lim : 8);

        setItems((data.items || []).filter((x) => x.is_active));
      } catch (e) {
        console.error("Error loading inspirations:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [lang]);

  const finalItems = useMemo(() => {
    if (showAll) return items;

    const limit = limitOverride ?? defaultLimit;
    if (!limit || limit <= 0) return items;

    return items.slice(0, limit);
  }, [items, showAll, limitOverride, defaultLimit]);

  const titleToShow = uiTitleKey ? t(uiTitleKey) : pageTitle;

  if (loading) {
    return (
      <section className={`bg-white ${className}`}>
        <div className="md:px-15 sm:px-10 px-5 lg:px-20 mx-auto">
          {showTitle && (
            <div className="h-7 w-64 bg-gray-100 animate-pulse rounded mb-8" />
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse rounded" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`bg-white ${className}`}>
      <div className="md:px-15 sm:px-10 px-5 lg:px-20 mx-auto">
        {showTitle && (
          <h2 className="text-2xl font-[600] mb-8">{titleToShow}</h2>
        )}

        {/* ✅ más parecido al “look anterior”: filas más altas + gap mayor */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {finalItems.map((it) => {
            const img = it.image_url || it.image_path || "";
            const alt =
              pickLang(lang, it.alt_es, it.alt_en, it.alt_fr) ||
              pickLang(lang, it.title_es, it.title_en, it.title_fr) ||
              "Inspiration";

            return (
              <div
                key={it.id}
                className="relative aspect-square overflow-hidden group cursor-pointer rounded"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${img}')` }}
                  role="img"
                  aria-label={alt}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
