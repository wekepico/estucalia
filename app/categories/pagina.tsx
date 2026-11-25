// app/categories/pagina.tsx - Server Component
//
// Catálogo de categorías con metadata propia y datos prefetcheados para que el
// HTML llegue completo.

import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { BACKEND_CACHE_REVALIDATE } from "@/lib/revalidate";
import { buildAlternates, toSeoLang, SeoLang } from "@/lib/seo";

import { getCategoriesPage } from "@/services/categoriesPageService";
import CategoriesPage from "@/app/components/categories/CategoriesPage";

export const dynamic = "force-dynamic";

const getCachedCategoriesPage = unstable_cache(
  async (lang: SeoLang) => getCategoriesPage(lang),
  ["categories-page"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["categories"] },
);

const FALLBACK: Record<SeoLang, { title: string; description: string }> = {
  es: {
    title: "Catálogo de productos | Grupo Estucalia",
    description:
      "Morteros, revestimientos y soluciones para la construcción de Grupo Estucalia.",
  },
  en: {
    title: "Product catalogue | Grupo Estucalia",
    description: "Mortars, renders and construction solutions by Grupo Estucalia.",
  },
  fr: {
    title: "Catalogue de produits | Grupo Estucalia",
    description:
      "Mortiers, enduits et solutions pour la construction de Grupo Estucalia.",
  },
};

type SearchParams = { searchParams?: { lang?: string } };

export async function generateMetadata({
  searchParams,
}: SearchParams): Promise<Metadata> {
  const lang = toSeoLang(searchParams?.lang);
  let seo = null;
  try {
    seo = (await getCachedCategoriesPage(lang))?.seo ?? null;
  } catch (error) {
    console.error(`[categories] getCategoriesPage failed (${lang}):`, error);
  }

  const title = seo?.meta?.title || FALLBACK[lang].title;
  const description = seo?.meta?.description || FALLBACK[lang].description;
  const ogImage = seo?.og?.image || undefined;

  return {
    title,
    description,
    keywords: seo?.meta?.keywords || undefined,
    robots: seo?.meta?.robots || "index, follow",
    alternates: buildAlternates(lang, "/categories"),
    openGraph: {
      title: seo?.og?.title || title,
      description: seo?.og?.description || description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: "website",
      siteName: "Grupo Estucalia",
      locale: lang === "en" ? "en_US" : lang === "fr" ? "fr_FR" : "es_ES",
    },
  };
}

// La lista de categorías se precarga en el layout (la usa también el menú).
export default function Categories() {
  return <CategoriesPage />;
}
