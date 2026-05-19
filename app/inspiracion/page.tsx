// app/inspiracion/page.tsx - Server Component
//
// SSR + cache de fetch (20 min por lang). Devuelve metadata y prefetch del
// listado de inspiración para que el HTML llegue ya renderizado.

import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { unstable_cache } from "next/cache";
import { BACKEND_CACHE_REVALIDATE } from "@/lib/revalidate";

import {
  getInspirationPageWithItems,
  type Lang,
} from "@/services/inspirationsService";
import InspirationPage from "../components/inspiraciones/InspirationPage";

export const dynamic = "force-dynamic";

const normalizeLang = (raw?: string): Lang =>
  raw === "en" || raw === "fr" ? raw : "es";

const getCachedInspirationPage = unstable_cache(
  async (lang: Lang) => getInspirationPageWithItems(lang),
  ["inspiration-page"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["inspiration"] },
);

const FALLBACK_TITLE = "Grupo Estucalia | Inspiración";
const FALLBACK_DESCRIPTION =
  "Descubre nuestra galería de inspiración con proyectos reales, acabados y soluciones constructivas con morteros de alta calidad.";

async function safeGetInspirationPage(lang: Lang) {
  try {
    return await getCachedInspirationPage(lang);
  } catch (error) {
    console.error(`[inspiracion] getInspirationPage failed (${lang}):`, error);
    return null;
  }
}

type SearchParams = { searchParams?: { lang?: string } };

export async function generateMetadata({
  searchParams,
}: SearchParams): Promise<Metadata> {
  const lang = normalizeLang(searchParams?.lang);
  const data = await safeGetInspirationPage(lang);
  const seo = data?.seo;

  const title = seo?.meta?.title || FALLBACK_TITLE;
  const description = seo?.meta?.description || FALLBACK_DESCRIPTION;
  const ogImage = seo?.og?.image || undefined;

  return {
    title,
    description,
    keywords: seo?.meta?.keywords || undefined,
    robots: seo?.meta?.robots || "index, follow",
    alternates: {
      canonical:
        seo?.meta?.canonical || "https://www.grupoestucalia.com/inspiracion",
      languages: {
        es: "https://www.grupoestucalia.com/inspiracion?lang=es",
        en: "https://www.grupoestucalia.com/inspiracion?lang=en",
        fr: "https://www.grupoestucalia.com/inspiracion?lang=fr",
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

export default async function Inspiraciones({ searchParams }: SearchParams) {
  const lang = normalizeLang(searchParams?.lang);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    // Match con inspirationKeys.detail(lang) → ["inspiration-page", lang]
    queryKey: ["inspiration-page", lang],
    queryFn: () => getCachedInspirationPage(lang),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="min-h-screen bg-white">
        <InspirationPage />
      </main>
    </HydrationBoundary>
  );
}
