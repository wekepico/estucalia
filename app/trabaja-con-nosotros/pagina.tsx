// app/trabaja-con-nosotros/page.tsx - Server Component
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

import { getWorkWithUsPage } from "@/services/workWithUsPageService";
import TrabajaConNosotrosClient from "./TrabajaConNosotrosClient";

export const dynamic = "force-dynamic";

type Lang = "es" | "en" | "fr";

const normalizeLang = (raw?: string): Lang =>
  raw === "en" || raw === "fr" ? raw : "es";

const getCachedWorkWithUs = unstable_cache(
  async (lang: Lang) => getWorkWithUsPage(lang),
  ["work-with-us-page"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["work-with-us"] },
);

const FALLBACK_TITLE = "Grupo Estucalia | Trabaja con Nosotros";
const FALLBACK_DESCRIPTION =
  "Únete a nuestro equipo. Buscamos talento apasionado por la construcción y los morteros de alta calidad. Envía tu CV y forma parte de Grupo Estucalia.";

async function safeGet(lang: Lang) {
  try {
    return await getCachedWorkWithUs(lang);
  } catch (error) {
    console.error(
      `[trabaja-con-nosotros] getWorkWithUsPage failed (${lang}):`,
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
  const seo = (data as any)?.seo ?? null;

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
        "https://www.grupoestucalia.com/trabaja-con-nosotros",
      languages: {
        es: "https://www.grupoestucalia.com/trabaja-con-nosotros?lang=es",
        en: "https://www.grupoestucalia.com/trabaja-con-nosotros?lang=en",
        fr: "https://www.grupoestucalia.com/trabaja-con-nosotros?lang=fr",
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

export default async function TrabajaConNosotros({
  searchParams,
}: SearchParams) {
  const lang = normalizeLang(searchParams?.lang);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    // Match con workWithUsKeys.detail(lang) → ["work-with-us-page", lang]
    queryKey: ["work-with-us-page", lang],
    queryFn: () => getCachedWorkWithUs(lang),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TrabajaConNosotrosClient />
    </HydrationBoundary>
  );
}
