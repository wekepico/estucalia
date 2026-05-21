// app/acabados/page.tsx - Server Component
//
// SSR + cache de fetch (20 min por lang). El listado de acabados y el SEO de la
// página se traen en el server, así Google ve el HTML completo y los meta
// tags ya rellenos desde el primer pintado.

import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { BACKEND_CACHE_REVALIDATE } from "@/lib/revalidate";

import { getFinishes, type FinishUI } from "@/services/finishesService";
import { getFinishesPage } from "@/services/finishesPageService";
import AcabadosClient from "./AcabadosClient";

export const dynamic = "force-dynamic";

type Lang = "es" | "en" | "fr";

const normalizeLang = (raw?: string): Lang =>
  raw === "en" || raw === "fr" ? raw : "es";

const getCachedFinishes = unstable_cache(
  async () => getFinishes(),
  ["finishes-list"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["finishes"] },
);

const getCachedFinishesPage = unstable_cache(
  async (lang: Lang) => getFinishesPage(lang),
  ["finishes-page"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["finishes", "pages"] },
);

const FALLBACK_TITLE = "Grupo Estucalia | Acabados";
const FALLBACK_DESCRIPTION =
  "Descubre nuestra colección de acabados para construcción: texturas, colores y diseños exclusivos para tus proyectos.";

async function safeGetFinishesPage(lang: Lang) {
  try {
    return await getCachedFinishesPage(lang);
  } catch (error) {
    console.error(`[acabados] getFinishesPage failed (${lang}):`, error);
    return null;
  }
}

async function safeGetFinishes(): Promise<FinishUI[]> {
  try {
    return await getCachedFinishes();
  } catch (error) {
    console.error("[acabados] getFinishes failed:", error);
    return [];
  }
}

type SearchParams = { searchParams?: { lang?: string } };

export async function generateMetadata({
  searchParams,
}: SearchParams): Promise<Metadata> {
  const lang = normalizeLang(searchParams?.lang);
  const page = await safeGetFinishesPage(lang);
  const seo = page?.seo;

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
        seo?.meta?.canonical || "https://www.grupoestucalia.com/acabados",
      languages: {
        es: "https://www.grupoestucalia.com/acabados?lang=es",
        en: "https://www.grupoestucalia.com/acabados?lang=en",
        fr: "https://www.grupoestucalia.com/acabados?lang=fr",
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

export default async function AcabadosPage() {
  const finishes = await safeGetFinishes();
  return <AcabadosClient finishes={finishes} />;
}
