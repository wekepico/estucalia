// app/aplicaciones/[id]/page.tsx - Server Component
//
// SSR + cache de fetch (1h por slug+lang). Devuelve metadata y datos de la
// aplicación al HTML antes de que llegue al navegador, así Google indexa
// cada aplicación con su SEO real desde Filament.

import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { unstable_cache } from "next/cache";

import { getApplicationBySlug } from "@/services/applicationsService";
import AplicationClient from "./AplicationClient";

export const dynamic = "force-dynamic";

type Lang = "es" | "en" | "fr";

const normalizeLang = (raw?: string): Lang =>
  raw === "en" || raw === "fr" ? raw : "es";

// Cache 1h por (slug, lang). Cada combinación se cachea por separado.
const getCachedApplication = unstable_cache(
  async (slug: string, lang: Lang) => getApplicationBySlug(slug, lang),
  ["application-detail"],
  { revalidate: 3600, tags: ["applications"] },
);

type Params = {
  params: { id: string };
  searchParams?: { lang?: string };
};

const FALLBACK_TITLE = "Grupo Estucalia | Aplicaciones";
const FALLBACK_DESCRIPTION =
  "Descubre todas las aplicaciones de nuestros morteros: revestimientos, solados, alicatados, fachadas y más soluciones constructivas.";

async function safeGetApplication(slug: string, lang: Lang) {
  try {
    return await getCachedApplication(slug, lang);
  } catch (error) {
    console.error(
      `[aplicaciones/[id]] getApplicationBySlug failed (${slug}/${lang}):`,
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
  const result = await safeGetApplication(slug, lang);
  const app = result?.data;
  const seo = app?.seo;

  const fallbackName = pickByLang(app, "name", lang);
  const fallbackDesc =
    pickByLang(app, "short_description", lang) ||
    pickByLang(app, "description", lang);

  const title = seo?.meta?.title || fallbackName || FALLBACK_TITLE;
  const description =
    seo?.meta?.description || fallbackDesc || FALLBACK_DESCRIPTION;
  const ogImage = seo?.og?.image || app?.image_url || undefined;

  // URLs alternativas por idioma con los slugs traducidos del backend
  const buildLangUrl = (l: Lang) => {
    const localizedSlug =
      (l === "es" && (app?.slug_es || app?.slug)) ||
      (l === "en" && (app?.slug_en || app?.slug)) ||
      (l === "fr" && (app?.slug_fr || app?.slug)) ||
      slug;
    return `https://www.grupoestucalia.com/aplicaciones/${localizedSlug}?lang=${l}`;
  };

  return {
    title,
    description,
    keywords: seo?.meta?.keywords || undefined,
    robots: seo?.meta?.robots || "index, follow",
    alternates: {
      canonical:
        seo?.meta?.canonical ||
        `https://www.grupoestucalia.com/aplicaciones/${slug}`,
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

export default async function AplicationPage({
  params,
  searchParams,
}: Params) {
  const lang = normalizeLang(searchParams?.lang);
  const slug = decodeURIComponent(params.id);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    // Match con applicationKeys.detail(slug, lang)
    queryKey: ["applications", "detail", slug, lang],
    queryFn: () => getCachedApplication(slug, lang),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AplicationClient />
    </HydrationBoundary>
  );
}
