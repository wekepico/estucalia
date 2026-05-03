// app/page.tsx (Home page) - Server Component
//
// SSR dinámico + cache de fetch: cada request renderiza con el ?lang= correcto
// y trae el SEO actualizado, pero el backend solo se golpea una vez por hora
// por idioma (unstable_cache). Equivalente a ISR pero compatible con
// searchParams (que rompen el cache de ruta de Next 13).

import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { unstable_cache } from "next/cache";

import { getHome, type Lang } from "@/services/homeService";
import HomeClient from "./HomeClient";

// La página depende de ?lang=, así que se renderiza dinámicamente.
// El cache real está en unstable_cache (debajo), no en la ruta.
export const dynamic = "force-dynamic";

// Cache de los datos del backend por idioma. TTL 1h. Cuando expire, la
// próxima request regenera y vuelve a cachear.
const getCachedHome = unstable_cache(
  async (lang: Lang) => {
    return await getHome(lang);
  },
  ["home"],
  { revalidate: 3600, tags: ["home"] },
);

type SearchParams = { searchParams?: { lang?: string } };

const normalizeLang = (raw?: string): Lang =>
  raw === "en" || raw === "fr" ? raw : "es";

const FALLBACK_TITLE = "Grupo Estucalia | Morteros de Alta Gama";
const FALLBACK_DESCRIPTION =
  "Más de 25 años desarrollando y fabricando morteros de alta gama para la construcción. Calidad y experiencia en revestimientos.";

async function safeGetHome(lang: Lang) {
  try {
    return await getCachedHome(lang);
  } catch (error) {
    // Si el backend cae, no rompemos la página: devolvemos null y el
    // HomeClient pintará con sus fallbacks de traducción.
    console.error("[home/page.tsx] getHome failed:", error);
    return null;
  }
}

export async function generateMetadata({
  searchParams,
}: SearchParams): Promise<Metadata> {
  const lang = normalizeLang(searchParams?.lang);
  const home = await safeGetHome(lang);
  const seo = home?.seo;

  const title = seo?.meta?.title || FALLBACK_TITLE;
  const description = seo?.meta?.description || FALLBACK_DESCRIPTION;
  const ogImage = seo?.og?.image || undefined;

  return {
    title,
    description,
    keywords: seo?.meta?.keywords || undefined,
    robots: seo?.meta?.robots || "index, follow",
    authors: seo?.meta?.author ? [{ name: seo.meta.author }] : undefined,
    alternates: {
      canonical: seo?.meta?.canonical || "https://www.grupoestucalia.com",
      languages: {
        es: "https://www.grupoestucalia.com?lang=es",
        en: "https://www.grupoestucalia.com?lang=en",
        fr: "https://www.grupoestucalia.com?lang=fr",
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

export default async function HomePage({ searchParams }: SearchParams) {
  const lang = normalizeLang(searchParams?.lang);

  // Prefetch del /v1/home para que React Query del cliente arranque
  // con los datos ya cargados (sin spinner, sin doble request).
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["home", lang],
    queryFn: () => getCachedHome(lang),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
}
