// app/profesionales/certificaciones/page.tsx - Server Component
//
// SSR + cache de fetch (20 min por lang). Devuelve metadata desde el SEO de
// Filament (estructura simple {title, description}) y prefetcha los datos
// para que el HTML llegue ya pintado.

import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { unstable_cache } from "next/cache";
import { BACKEND_CACHE_REVALIDATE } from "@/lib/revalidate";

import {
  getCertificationsDocumentationPage,
  type Lang,
} from "@/services/certificationsDocumentationPageService";
import CertificacionesClient from "./CertificacionesClient";

export const dynamic = "force-dynamic";

const normalizeLang = (raw?: string): Lang =>
  raw === "en" || raw === "fr" ? raw : "es";

const getCachedCertificationsPage = unstable_cache(
  async (lang: Lang) => getCertificationsDocumentationPage(lang),
  ["certifications-documentation-page"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["certifications"] },
);

const FALLBACK_TITLE = "Grupo Estucalia | Certificaciones y Documentación";
const FALLBACK_DESCRIPTION =
  "Certificados de calidad, documentación técnica y fichas de productos. Descarga toda la documentación oficial de Grupo Estucalia.";

async function safeGet(lang: Lang) {
  try {
    return await getCachedCertificationsPage(lang);
  } catch (error) {
    console.error(
      `[certificaciones] getCertificationsDocumentationPage failed (${lang}):`,
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
  // El backend devuelve SEO en formato anidado {meta, og, twitter} aunque el
  // tipo TS del servicio diga {title, description}. Hacemos cast a any para
  // leer el formato real sin romper tipos en otras partes del código.
  const seo = (data?.seo as any) ?? null;

  const title = seo?.meta?.title || seo?.title || FALLBACK_TITLE;
  const description =
    seo?.meta?.description || seo?.description || FALLBACK_DESCRIPTION;
  const ogImage = seo?.og?.image || undefined;

  return {
    title,
    description,
    keywords: seo?.meta?.keywords || undefined,
    robots: seo?.meta?.robots || "index, follow",
    alternates: {
      canonical:
        seo?.meta?.canonical ||
        "https://www.grupoestucalia.com/profesionales/certificaciones",
      languages: {
        es: "https://www.grupoestucalia.com/profesionales/certificaciones?lang=es",
        en: "https://www.grupoestucalia.com/profesionales/certificaciones?lang=en",
        fr: "https://www.grupoestucalia.com/profesionales/certificaciones?lang=fr",
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

export default async function Certificaciones({ searchParams }: SearchParams) {
  const lang = normalizeLang(searchParams?.lang);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    // Match con certificationsDocumentationKeys.detail(lang)
    // → ["certifications-documentation-page", lang]
    queryKey: ["certifications-documentation-page", lang],
    queryFn: () => getCachedCertificationsPage(lang),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CertificacionesClient />
    </HydrationBoundary>
  );
}
