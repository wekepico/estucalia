"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProjectHelpSection from "../contacto/ProjectHelpSection";
import { useLanguage } from "@/app/context/LanguageContext";
import { Loader } from "lucide-react";
import {
  getInspirationPageWithItems,
  InspirationDTO,
  InspirationPageDTO,
  Lang,
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

// Layout “por ahora” (frontend)
// Si un día quieres controlarlo desde admin: agrega un campo `layout` en DB.
function getSizeByIndex(index: number): "large" | "full" | "medium" | "small" {
  // patrón parecido al ejemplo que mostraste:
  if (index === 0) return "large";
  if (index === 4) return "full";
  if (index % 7 === 0) return "large";
  if (index % 5 === 0) return "small";
  return "medium";
}

export default function InspirationPage() {
  const { t, language } = useLanguage() as any;
  const lang: Lang = (language || "es") as Lang;

  const [page, setPage] = useState<InspirationPageDTO | null>(null);
  const [items, setItems] = useState<InspirationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setErrorMsg(null);

        const { page, items } = await getInspirationPageWithItems();

        if (!mounted) return;

        setPage(page);

        // Si quieres respetar default_limit aquí en frontend:
        const limit =
          page?.default_limit && page.default_limit > 0
            ? page.default_limit
            : 0;

        setItems(limit > 0 ? items.slice(0, limit) : items);
      } catch (e: any) {
        console.error("Error loading inspiration page:", e);
        if (!mounted) return;
        setErrorMsg("No se pudo cargar la inspiración. Intenta de nuevo.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const title = useMemo(() => {
    // Si no existe page todavía, usa i18n actual como fallback
    if (!page) return t("inspiration.title");
    return (
      pickLang(lang, page.title_es, page.title_en, page.title_fr) ||
      t("inspiration.title")
    );
  }, [page, lang, t]);

  const viewItems = useMemo(() => {
    return items.map((it, index) => {
      const alt = pickLang(lang, it.alt_es, it.alt_en, it.alt_fr) || "";
      const size = getSizeByIndex(index);
      return {
        id: it.id,
        url: it.image_url || it.image_path || "",
        alt,
        size,
      };
    });
  }, [items, lang]);

  if (loading) {
    return (
      <main className="min-h-screen gap-4 flex justify-center items-center bg-white">
        <Loader width={50} height={50} /> Loading...
      </main>
    );
  }

  if (errorMsg) {
    return (
      <section className="bg-white min-h-screen flex flex-col items-center justify-center gap-4 px-5">
        <p className="text-lg font-semibold">{errorMsg}</p>
        <button
          className="px-4 py-2 bg-black text-white rounded"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </section>
    );
  }

  return (
    <section className="bg-white">
      {/* Header */}
      <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-20 pt-20 pb-16 text-5xl font-[600] text-left items-end flex bg-[#ffffff] text-black">
        <h1 className="w-[36rem]">{title}</h1>
      </div>

      {/* Grid */}
      {/* Image Grid */}
      <div
        className="md:px-15 sm:px-10 px-5 lg:px-20 grid grid-cols-2 md:grid-cols-4 gap-4 pb-16 mb-20
                auto-rows-[180px] md:auto-rows-[220px] grid-flow-dense"
      >
        {items.map((image, index) => {
          // Patrón de tamaños (repite en loop)
          const pattern: Array<"large" | "medium" | "small" | "full"> = [
            "large",
            "medium",
            "small",
            "small",
            "full",
            "medium",
            "medium",
          ];
          const size = pattern[index % pattern.length];

          const sizeClass =
            size === "large"
              ? "col-span-2 row-span-2"
              : size === "full"
                ? "col-span-2 md:col-span-4 row-span-2"
                : size === "medium"
                  ? "col-span-2 row-span-1"
                  : "col-span-1 row-span-1";

          return (
            <div
              key={image.id ?? index}
              className={`relative overflow-hidden group cursor-pointer ${sizeClass}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${image.image_url || ""}')` }}
                role="img"
                aria-label={image.alt || ""}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          );
        })}
      </div>

      <ProjectHelpSection />
    </section>
  );
}
