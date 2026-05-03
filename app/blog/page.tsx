// app/blog/page.tsx - Server Component
//
// SSR + cache de fetch (1h por lang). Devuelve metadata desde el SEO de
// Filament y prefetcha el listado de blogs para que el HTML llegue ya
// pintado con todas las noticias (clave para SEO orgánico).

import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { unstable_cache } from "next/cache";

import { getBlogPage } from "@/services/bolgsServices";
import BlogListClient from "./BlogListClient";

export const dynamic = "force-dynamic";

type Lang = "es" | "en" | "fr";

const normalizeLang = (raw?: string): Lang =>
  raw === "en" || raw === "fr" ? raw : "es";

const getCachedBlogPage = unstable_cache(
  async (lang: Lang) => getBlogPage(lang),
  ["blog-page"],
  { revalidate: 3600, tags: ["blog"] },
);

const FALLBACK_TITLE = "Blog | Grupo Estucalia";
const FALLBACK_DESCRIPTION =
  "Últimas noticias y novedades de Grupo Estucalia: morteros, revestimientos y soluciones constructivas.";

async function safeGet(lang: Lang) {
  try {
    return await getCachedBlogPage(lang);
  } catch (error) {
    console.error(`[blog] getBlogPage failed (${lang}):`, error);
    return null;
  }
}

type SearchParams = { searchParams?: { lang?: string } };

export async function generateMetadata({
  searchParams,
}: SearchParams): Promise<Metadata> {
  const lang = normalizeLang(searchParams?.lang);
  const data = await safeGet(lang);
  const seo = data?.seo ?? null;

  const title = seo?.meta?.title || FALLBACK_TITLE;
  const description = seo?.meta?.description || FALLBACK_DESCRIPTION;
  const ogImage = seo?.og?.image || undefined;

  return {
    title,
    description,
    keywords: seo?.meta?.keywords || undefined,
    robots: seo?.meta?.robots || "index, follow",
    alternates: {
      canonical: seo?.meta?.canonical || "https://www.grupoestucalia.com/blog",
      languages: {
        es: "https://www.grupoestucalia.com/blog?lang=es",
        en: "https://www.grupoestucalia.com/blog?lang=en",
        fr: "https://www.grupoestucalia.com/blog?lang=fr",
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

export default async function BlogList({ searchParams }: SearchParams) {
  const lang = normalizeLang(searchParams?.lang);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["blog-page", lang],
    queryFn: () => getCachedBlogPage(lang),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogListClient />
    </HydrationBoundary>
  );
}
