// app/espacios/[slug]/page.tsx - Server Component
//
// SSR + cache de fetch (20 min por slug+lang). Devuelve metadata y datos del
// espacio al HTML antes de que llegue al navegador, así Google indexa cada
// espacio con su SEO real desde Filament.

import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { unstable_cache } from "next/cache";
import { BACKEND_CACHE_REVALIDATE } from "@/lib/revalidate";

import { getSpaceBySlug } from "@/services/spacesService";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

type Lang = "es" | "en" | "fr";

const normalizeLang = (raw?: string): Lang =>
  raw === "en" || raw === "fr" ? raw : "es";

const getCachedSpace = unstable_cache(
  async (slug: string, lang: Lang) => getSpaceBySlug(slug, lang),
  ["space-detail"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["spaces"] },
);

type Params = {
  params: { slug: string };
  searchParams?: { lang?: string };
};

const FALLBACK_TITLE = "Grupo Estucalia | Espacios";
const FALLBACK_DESCRIPTION =
  "Descubre cómo nuestros morteros se adaptan a diferentes espacios: fachadas, interiores, exteriores y más soluciones constructivas.";

async function safeGetSpace(slug: string, lang: Lang) {
  try {
    return await getCachedSpace(slug, lang);
  } catch (error) {
    console.error(
      `[espacios/[slug]] getSpaceBySlug failed (${slug}/${lang}):`,
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
    (obj[field] as string | null | undefined) ||
    null
  );
};

export async function generateMetadata({
  params,
  searchParams,
}: Params): Promise<Metadata> {
  const lang = normalizeLang(searchParams?.lang);
  const slug = decodeURIComponent(params.slug);
  const result = await safeGetSpace(slug, lang);
  const space = result?.data;
  const seo = space?.seo;

  const fallbackTitle = pickByLang(space, "title", lang);
  const fallbackDesc = pickByLang(space, "description", lang);

  const title = seo?.meta?.title || fallbackTitle || FALLBACK_TITLE;
  const description =
    seo?.meta?.description || fallbackDesc || FALLBACK_DESCRIPTION;
  const ogImage = seo?.og?.image || space?.image_url || undefined;

  const buildLangUrl = (l: Lang) => {
    const localizedSlug =
      (l === "es" && space?.slug) ||
      (l === "en" && (space?.slug_en || space?.slug)) ||
      (l === "fr" && (space?.slug_fr || space?.slug)) ||
      slug;
    return `https://www.grupoestucalia.com/espacios/${localizedSlug}?lang=${l}`;
  };

  return {
    title,
    description,
    keywords: seo?.meta?.keywords || undefined,
    robots: seo?.meta?.robots || "index, follow",
    alternates: {
      canonical:
        seo?.meta?.canonical ||
        `https://www.grupoestucalia.com/espacios/${slug}`,
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

export default async function Page({ params, searchParams }: Params) {
  const lang = normalizeLang(searchParams?.lang);
  const slug = decodeURIComponent(params.slug);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    // Match con spaceKeys.detail(slug, lang) → ["spaces", "detail", slug, lang]
    queryKey: ["spaces", "detail", slug, lang],
    queryFn: () => getCachedSpace(slug, lang),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage />
    </HydrationBoundary>
  );
}
