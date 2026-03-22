// app/inspiracion/page.tsx
"use client";

import React, { useMemo } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useInspirationPage } from "@/api/useInspirationPage";
import SeoHead from "@/components/SeoHead";
import { Loader } from "lucide-react";
import { InspirationDTO, Lang } from "@/services/inspirationsService";
import ProjectHelpSection from "../contacto/ProjectHelpSection";

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

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse text-lg">Cargando inspiración…</div>
    </div>
  );
}

export default function InspirationPage() {
  const { t, language, setLanguage } = useLanguage();
  const lang: Lang = (language || "es") as Lang;
  const { data, isPending, isLoading, isError } = useInspirationPage();

  const loading = (isPending ?? isLoading) && !data;



  const page = data?.page ?? null;
  const items = data?.items ?? [];

  // ✅ Título HTML desde backend (con fallback a i18n)
  const titleHtml = useMemo(() => {
    if (!page) return `<h1 class="w-[36rem]">${t("inspiration.title")}</h1>`;

    const fromApi =
      pickLang(lang, page.title_es, page.title_en, page.title_fr) ||
      t("inspiration.title");

    const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(fromApi);

    return looksLikeHtml ? fromApi : `<h1 class="w-[36rem]">${fromApi}</h1>`;
  }, [page, lang, t]);

  // ✅ Mapear items del backend al shape del layout
  const viewItems = useMemo(() => {
    const pattern: Array<"large" | "medium" | "small" | "full"> = [
      "large",
      "medium",
      "small",
      "small",
      "full",
      "medium",
      "medium",
    ];

    return items.map((it: InspirationDTO, index: number) => {
      const alt = pickLang(lang, it.alt_es, it.alt_en, it.alt_fr) || "";
      const url = it.image_url || it.image_path || "";

      return {
        id: it.id ?? index,
        url,
        alt,
        size: pattern[index % pattern.length],
      };
    });
  }, [items, lang]);

  // Obtener URL actual
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";


    if (loading) return <PageLoader />;
  if (isError)
    return (
      <section className="bg-white min-h-screen flex flex-col items-center justify-center gap-4 px-5">
        <p className="text-lg font-semibold">
          No se pudo cargar la inspiración. Intenta de nuevo.
        </p>
        <button
          className="px-4 py-2 bg-black text-white rounded"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </section>
    ); 
  
  return (
    <>
      {/* 👇 SEO Dinámico - Se actualiza cuando cambia el idioma */}
      <SeoHead
        seo={data?.seo || null}
        url={currentUrl}
        fallbackTitle="Grupo Estucalia | Inspiración"
        fallbackDescription="Descubre nuestra galería de inspiración con proyectos reales, acabados y soluciones constructivas con morteros de alta calidad."
      />

      <section className="bg-white">
        {/* Header */}
        <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-20 pt-20 pb-16 text-5xl font-[600] text-left items-end flex bg-[#ffffff] text-black">
          <div dangerouslySetInnerHTML={{ __html: titleHtml }} />
        </div>

        {/* Grid */}
        <div className="md:px-15 sm:px-10 px-5 lg:px-20 grid grid-cols-4 auto-rows-[400px] grid-flow-dense pb-28 gap-4">
          {viewItems.map((image, index) => {
            const sizeClass =
              image.size === "large"
                ? "col-span-2 row-span-2"
                : image.size === "full"
                  ? "col-span-4 row-span-2"
                  : image.size === "medium"
                    ? "col-span-2 row-span-1"
                    : "col-span-1 row-span-1";

            return (
              <div
                key={image.id ?? index}
                className={`relative overflow-hidden group cursor-pointer ${sizeClass}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: image.url
                      ? `url("${encodeURI(image.url)}")`
                      : "none",
                  }}
                  role="img"
                  aria-label={image.alt}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            );
          })}
        </div>

        <ProjectHelpSection />
      </section>
    </>
  );
}
