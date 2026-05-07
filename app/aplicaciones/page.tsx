// app/aplicaciones/page.tsx - Server Component
//
// La ruta /aplicaciones no tiene contenido propio: redirige al detalle de la
// primera aplicación. Se hace en el server con redirect() para que la
// navegación sea inmediata (sin pintado intermedio).

import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";

import { getApplications } from "@/services/applicationsService";

export const dynamic = "force-dynamic";

type SearchParams = { searchParams?: { lang?: string } };
type Lang = "es" | "en" | "fr";

const normalizeLang = (raw?: string): Lang =>
  raw === "en" || raw === "fr" ? raw : "es";

// Slug de respaldo si la API no responde.
const FALLBACK_SLUG = "coatings";

const getCachedApplications = unstable_cache(
  async () => getApplications(),
  ["applications-list-redirect"],
  { revalidate: 3600, tags: ["applications"] },
);

async function getFirstSlug(lang: Lang): Promise<string> {
  try {
    const { data } = await getCachedApplications();
    const first = data?.[0];
    if (!first) return FALLBACK_SLUG;
    const localized =
      (lang === "es" && (first.slug_es || first.slug)) ||
      (lang === "en" && (first.slug_en || first.slug)) ||
      (lang === "fr" && (first.slug_fr || first.slug)) ||
      first.slug;
    return localized || FALLBACK_SLUG;
  } catch (error) {
    console.error("[aplicaciones] getApplications failed:", error);
    return FALLBACK_SLUG;
  }
}

export default async function AplicacionesIndex({
  searchParams,
}: SearchParams) {
  const lang = normalizeLang(searchParams?.lang);
  const slug = await getFirstSlug(lang);
  const target =
    lang === "es"
      ? `/aplicaciones/${slug}`
      : `/aplicaciones/${slug}?lang=${lang}`;
  redirect(target);
}
