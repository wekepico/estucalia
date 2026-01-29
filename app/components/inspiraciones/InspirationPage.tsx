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

        // ✅ Si tu endpoint soporta lang, pásalo aquí.
        // Si no soporta todavía, déjalo sin params.
        const { page, items } = await getInspirationPageWithItems(/* lang */);

        if (!mounted) return;

        setPage(page);

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

  // ✅ Título HTML desde backend (con fallback a i18n)
  const titleHtml = useMemo(() => {
    if (!page) return `<h1 class="w-[36rem]">${t("inspiration.title")}</h1>`;

    const fromApi =
      pickLang(lang, page.title_es, page.title_en, page.title_fr) ||
      t("inspiration.title");

    // Si en Filament guardas <h1 ...> ya, esto se renderiza tal cual.
    // Si guardas texto plano, lo envolvemos con tu h1 y tu clase.
    const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(fromApi);

    return looksLikeHtml ? fromApi : `<h1 class="w-[36rem]">${fromApi}</h1>`;
  }, [page, lang, t]);

  // ✅ Mapear items del backend al shape del layout viejo
  // OJO: Tu DB no guarda size, así que lo reproducimos con el mismo patrón fijo.
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

    return items.map((it, index) => {
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
      {/* Header (idéntico) */}
      <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-20 pt-20 pb-16 text-5xl font-[600] text-left items-end flex bg-[#ffffff] text-black">
        {/* ✅ renderiza HTML del backend */}
        <div dangerouslySetInnerHTML={{ __html: titleHtml }} />
      </div>

      {/* Grid (idéntico al viejo) */}
      {/* Grid (igual visual, pero sin romperse al final) */}
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
  );
}
