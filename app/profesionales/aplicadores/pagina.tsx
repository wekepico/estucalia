// app/profesionales/aplicadores/page.tsx - Server Component
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
  getApplicatorsPage,
  type Lang,
} from "@/services/applicatorsPageService";
import AplicadoresClient from "./AplicadoresClient";

export const dynamic = "force-dynamic";

const normalizeLang = (raw?: string): Lang =>
  raw === "en" || raw === "fr" ? raw : "es";

const getCachedApplicatorsPage = unstable_cache(
  async (lang: Lang) => getApplicatorsPage(lang),
  ["applicators-page"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["applicators"] },
);

const FALLBACK_TITLE = "Grupo Estucalia | Aplicadores";
const FALLBACK_DESCRIPTION =
  "Formación y soporte técnico para aplicadores profesionales. Conviértete en aplicador certificado de morteros de alta calidad.";

async function safeGet(lang: Lang) {
  try {
    return await getCachedApplicatorsPage(lang);
  } catch (error) {
    console.error(`[aplicadores] getApplicatorsPage failed (${lang}):`, error);
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
        "https://www.grupoestucalia.com/profesionales/aplicadores",
      languages: {
        es: "https://www.grupoestucalia.com/profesionales/aplicadores?lang=es",
        en: "https://www.grupoestucalia.com/profesionales/aplicadores?lang=en",
        fr: "https://www.grupoestucalia.com/profesionales/aplicadores?lang=fr",
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

export default async function Aplicadores({ searchParams }: SearchParams) {
  const lang = normalizeLang(searchParams?.lang);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    // Match con applicatorsKeys.detail(lang) → ["applicators-page", lang]
    queryKey: ["applicators-page", lang],
    queryFn: () => getCachedApplicatorsPage(lang),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AplicadoresClient />
    </HydrationBoundary>
  );
}
