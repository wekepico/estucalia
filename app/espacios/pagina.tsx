// app/espacios/pagina.tsx - Server Component
//
// /espacios no tiene contenido propio (daba 404): redirige al primer espacio,
// igual que hace /aplicaciones.

import { notFound, redirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import { BACKEND_CACHE_REVALIDATE } from "@/lib/revalidate";
import { toSeoLang } from "@/lib/seo";

import { getSpaces } from "@/services/spacesService";

export const dynamic = "force-dynamic";

type SearchParams = { searchParams?: { lang?: string } };

const getCachedSpaces = unstable_cache(
  async () => getSpaces(),
  ["spaces-list-redirect"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["spaces"] },
);

export default async function EspaciosIndex({ searchParams }: SearchParams) {
  const lang = toSeoLang(searchParams?.lang);
  const first: any = (await getCachedSpaces().catch(() => null))?.data?.[0];
  if (!first) notFound();

  const slug = (lang !== "es" && first[`slug_${lang}`]) || first.slug;
  redirect(
    lang === "es" ? `/espacios/${slug}` : `/espacios/${slug}?lang=${lang}`,
  );
}
