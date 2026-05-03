// app/producto/[id]/page.tsx - Server Component
//
// SSR + cache de fetch (1h por slug+lang). Devuelve metadata y datos de la
// categoría / productos al HTML antes de que llegue al navegador, así Google
// indexa cada producto con su SEO real desde Filament.

import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { unstable_cache } from "next/cache";

import {
  getCategoryBySlug,
  getCategoryProducts,
} from "@/services/categoriesService";
import ProductClient from "./ProductClient";

export const dynamic = "force-dynamic";

type Lang = "es" | "en" | "fr";

const normalizeLang = (raw?: string): Lang =>
  raw === "en" || raw === "fr" ? raw : "es";

// Cache 1h por (slug, lang). Cada combinación se cachea por separado.
const getCachedCategory = unstable_cache(
  async (slug: string, lang: Lang) => getCategoryBySlug(slug, lang),
  ["category-detail"],
  { revalidate: 3600, tags: ["categories"] },
);

const getCachedCategoryProducts = unstable_cache(
  async (slug: string, lang: Lang) => getCategoryProducts(slug, lang),
  ["category-products"],
  { revalidate: 3600, tags: ["categories", "products"] },
);

type Params = {
  params: { id: string };
  searchParams?: { lang?: string };
};

const FALLBACK_TITLE = "Producto | Grupo Estucalia";
const FALLBACK_DESCRIPTION =
  "Catálogo de productos Grupo Estucalia: morteros de alta gama para la construcción.";

async function safeGetCategory(slug: string, lang: Lang) {
  try {
    return await getCachedCategory(slug, lang);
  } catch (error) {
    console.error(
      `[producto/[id]] getCategoryBySlug failed (${slug}/${lang}):`,
      error,
    );
    return null;
  }
}

async function safeGetCategoryProducts(slug: string, lang: Lang) {
  try {
    return await getCachedCategoryProducts(slug, lang);
  } catch (error) {
    console.error(
      `[producto/[id]] getCategoryProducts failed (${slug}/${lang}):`,
      error,
    );
    return null;
  }
}

const pickByLang = <T extends Record<string, any>>(
  obj: T | null | undefined,
  field: string,
  lang: Lang,
): string | null => {
  if (!obj) return null;
  return (
    (obj[`${field}_${lang}`] as string | null | undefined) ||
    (obj[`${field}_es`] as string | null | undefined) ||
    null
  );
};

export async function generateMetadata({
  params,
  searchParams,
}: Params): Promise<Metadata> {
  const lang = normalizeLang(searchParams?.lang);
  const slug = decodeURIComponent(params.id);
  const result = await safeGetCategory(slug, lang);
  const category = result?.data;
  const seo = category?.seo;

  const fallbackName = pickByLang(category, "name", lang);
  const fallbackDesc =
    pickByLang(category, "short_description", lang) ||
    pickByLang(category, "description", lang);

  const title = seo?.meta?.title || fallbackName || FALLBACK_TITLE;
  const description =
    seo?.meta?.description || fallbackDesc || FALLBACK_DESCRIPTION;
  const ogImage = seo?.og?.image || category?.image_url || undefined;

  // Construye URLs alternativas por idioma usando los slugs traducidos del backend
  const buildLangUrl = (l: Lang) => {
    const localizedSlug =
      (l === "es" && (category?.slug_es || category?.slug)) ||
      (l === "en" && (category?.slug_en || category?.slug)) ||
      (l === "fr" && (category?.slug_fr || category?.slug)) ||
      slug;
    return `https://www.grupoestucalia.com/producto/${localizedSlug}?lang=${l}`;
  };

  return {
    title,
    description,
    keywords: seo?.meta?.keywords || undefined,
    robots: seo?.meta?.robots || "index, follow",
    alternates: {
      canonical:
        seo?.meta?.canonical ||
        `https://www.grupoestucalia.com/producto/${slug}`,
      languages: {
        es: buildLangUrl("es"),
        en: buildLangUrl("en"),
        fr: buildLangUrl("fr"),
      },
    },
    openGraph: {
      title: seo?.og?.title || title,
      description: seo?.og?.description || description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: (seo?.og?.type as "website" | "article") || "website",
      siteName: "Grupo Estucalia",
      locale: lang === "en" ? "en_US" : lang === "fr" ? "fr_FR" : "es_ES",
    },
    twitter: {
      card:
        (seo?.twitter?.card as "summary" | "summary_large_image") ||
        "summary_large_image",
      title: seo?.twitter?.title || title,
      description: seo?.twitter?.description || description,
      images: seo?.twitter?.image ? [seo.twitter.image] : undefined,
    },
  };
}

export default async function ProductPage({ params, searchParams }: Params) {
  const lang = normalizeLang(searchParams?.lang);
  const slug = decodeURIComponent(params.id);

  // Prefetch en paralelo: la categoría (con su SEO + applications + finishes)
  // y los productos asociados. Ambos comparten cache de 1h.
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      // Match exacto con categoryKeys.detail(slug, lang) → ["categories", "detail", slug, lang]
      queryKey: ["categories", "detail", slug, lang],
      queryFn: () => getCachedCategory(slug, lang),
    }),
    queryClient.prefetchQuery({
      // Match con categoryKeys.products(slug, lang) → ["categories", "detail", slug, lang, "products"]
      queryKey: ["categories", "detail", slug, lang, "products"],
      queryFn: () => getCachedCategoryProducts(slug, lang),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductClient />
    </HydrationBoundary>
  );
}
