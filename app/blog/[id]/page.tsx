// app/blog/[id]/page.tsx - Server Component
//
// SSR + cache de fetch (20 min por slug+lang). Devuelve metadata desde el SEO de
// Filament y prefetcha el artículo para que el HTML llegue ya pintado con
// el contenido completo (esencial para SEO de cada noticia).

import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { unstable_cache } from "next/cache";
import { BACKEND_CACHE_REVALIDATE } from "@/lib/revalidate";

import { getBlogPostBySlug } from "@/services/bolgsServices";
import BlogClient from "./BlogClient";

export const dynamic = "force-dynamic";

type Lang = "es" | "en" | "fr";

const normalizeLang = (raw?: string): Lang =>
  raw === "en" || raw === "fr" ? raw : "es";

const getCachedBlogPost = unstable_cache(
  async (slug: string, lang: Lang) => getBlogPostBySlug(slug, lang),
  ["blog-post"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["blog"] },
);

type Params = {
  params: { id: string };
  searchParams?: { lang?: string };
};

const FALLBACK_TITLE = "Blog | Grupo Estucalia";
const FALLBACK_DESCRIPTION = "Noticia de Grupo Estucalia.";

async function safeGet(slug: string, lang: Lang) {
  try {
    return await getCachedBlogPost(slug, lang);
  } catch (error) {
    console.error(
      `[blog/[id]] getBlogPostBySlug failed (${slug}/${lang}):`,
      error,
    );
    return null;
  }
}

const pickTitle = (post: any, lang: Lang): string =>
  (lang === "en" && post?.title_en) ||
  (lang === "fr" && post?.title_fr) ||
  post?.title ||
  "";

const pickDescription = (post: any, lang: Lang): string => {
  const desc =
    (lang === "en" && post?.description_en) ||
    (lang === "fr" && post?.description_fr) ||
    post?.description ||
    "";
  return String(desc).replace(/<[^>]*>/g, "").substring(0, 160);
};

export async function generateMetadata({
  params,
  searchParams,
}: Params): Promise<Metadata> {
  const lang = normalizeLang(searchParams?.lang);
  const slug = decodeURIComponent(params.id);
  const post = await safeGet(slug, lang);
  const seo = post?.seo ?? null;

  const fallbackTitle = pickTitle(post, lang) || FALLBACK_TITLE;
  const fallbackDesc = pickDescription(post, lang) || FALLBACK_DESCRIPTION;

  const title = seo?.meta?.title || fallbackTitle;
  const description = seo?.meta?.description || fallbackDesc;
  const ogImage = seo?.og?.image || post?.photo_url || undefined;

  // URLs alternativas usando los slugs traducidos
  const buildLangUrl = (l: Lang) => {
    const localizedSlug =
      (l === "es" && post?.slug) ||
      (l === "en" && (post?.slug_en || post?.slug)) ||
      (l === "fr" && (post?.slug_fr || post?.slug)) ||
      slug;
    return `https://www.grupoestucalia.com/blog/${localizedSlug}?lang=${l}`;
  };

  return {
    title,
    description,
    keywords: seo?.meta?.keywords || undefined,
    robots: seo?.meta?.robots || "index, follow",
    authors: seo?.meta?.author ? [{ name: seo.meta.author }] : undefined,
    alternates: {
      canonical:
        seo?.meta?.canonical ||
        `https://www.grupoestucalia.com/blog/${slug}`,
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
      // Para artículos de blog, og:type "article" tiene más sentido
      type: (seo?.og?.type as "website" | "article") || "article",
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

export default async function NoticiaPage({ params, searchParams }: Params) {
  const lang = normalizeLang(searchParams?.lang);
  const slug = decodeURIComponent(params.id);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    // Match con la queryKey de useBlogPost → ["blog-post", slug, lang]
    queryKey: ["blog-post", slug, lang],
    queryFn: () => getCachedBlogPost(slug, lang),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogClient />
    </HydrationBoundary>
  );
}
