// app/profesionales/constructores-arquitectos/page.tsx - Server Component
//
// SSR + cache de fetch (20 min por lang). Devuelve metadata desde el SEO de
// Filament y prefetcha los datos para que el HTML llegue ya pintado.

import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { unstable_cache } from "next/cache";
import { BACKEND_CACHE_REVALIDATE } from "@/lib/revalidate";

import {
  getBuildersArchitectsPage,
  type Lang,
} from "@/services/buildersArchitectsPageService";
import ConstructoresArquitectosClient from "./ConstructoresArquitectosClient";

export const dynamic = "force-dynamic";

const normalizeLang = (raw?: string): Lang =>
  raw === "en" || raw === "fr" ? raw : "es";

const getCachedBuildersArchitectsPage = unstable_cache(
  async (lang: Lang) => getBuildersArchitectsPage(lang),
  ["builders-architects-page"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["builders-architects"] },
);

const FALLBACK_TITLE = "Grupo Estucalia | Constructores y Arquitectos";
const FALLBACK_DESCRIPTION =
  "Soluciones constructivas para profesionales. Morteros de alta calidad para constructores y arquitectos. Asesoramiento técnico especializado.";

async function safeGet(lang: Lang) {
  try {
    return await getCachedBuildersArchitectsPage(lang);
  } catch (error) {
    console.error(
      `[constructores-arquitectos] getBuildersArchitectsPage failed (${lang}):`,
      error,
    );
    return null;
  }
}

type SearchParams = { searchParams?: { lang?: string } };

export async function generateMetadata({
  searchParams,
}: SearchParams): Promise<Metadata> {
  const lang = normalizeLang(searchParams?.lang);
  const data = await safeGet(lang);
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
        seo?.meta?.canonical ||
        "https://www.grupoestucalia.com/profesionales/constructores-arquitectos",
      languages: {
        es: "https://www.grupoestucalia.com/profesionales/constructores-arquitectos?lang=es",
        en: "https://www.grupoestucalia.com/profesionales/constructores-arquitectos?lang=en",
        fr: "https://www.grupoestucalia.com/profesionales/constructores-arquitectos?lang=fr",
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

export default async function ConstructoresArquitectos({
  searchParams,
}: SearchParams) {
  const lang = normalizeLang(searchParams?.lang);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    // Match con buildersArchitectsKeys.detail(lang) → ["builders-architects-page", lang]
    queryKey: ["builders-architects-page", lang],
    queryFn: () => getCachedBuildersArchitectsPage(lang),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConstructoresArquitectosClient />
    </HydrationBoundary>
  );
}
