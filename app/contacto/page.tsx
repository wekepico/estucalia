// app/contacto/page.tsx - Server Component
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

import { getContactPage, type Lang } from "@/services/contactPageService";
import ContactoClient from "./ContactoClient";

export const dynamic = "force-dynamic";

const normalizeLang = (raw?: string): Lang =>
  raw === "en" || raw === "fr" ? raw : "es";

const getCachedContact = unstable_cache(
  async (lang: Lang) => getContactPage(lang),
  ["contact-page"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["contact"] },
);

const FALLBACK_TITLE = "Grupo Estucalia | Contacto";
const FALLBACK_DESCRIPTION =
  "Contacta con nosotros para consultas, proyectos o solicitar información sobre nuestros morteros y revestimientos. Estamos en Murcia, España.";

async function safeGet(lang: Lang) {
  try {
    return await getCachedContact(lang);
  } catch (error) {
    console.error(`[contacto] getContactPage failed (${lang}):`, error);
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
        seo?.meta?.canonical || "https://www.grupoestucalia.com/contacto",
      languages: {
        es: "https://www.grupoestucalia.com/contacto?lang=es",
        en: "https://www.grupoestucalia.com/contacto?lang=en",
        fr: "https://www.grupoestucalia.com/contacto?lang=fr",
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

export default async function Contacto({ searchParams }: SearchParams) {
  const lang = normalizeLang(searchParams?.lang);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    // Match con contactPageKeys.detail(lang) → ["contact-page", lang]
    queryKey: ["contact-page", lang],
    queryFn: () => getCachedContact(lang),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ContactoClient />
    </HydrationBoundary>
  );
}
