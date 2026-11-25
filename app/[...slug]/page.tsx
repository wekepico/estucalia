// app/[...slug]/page.tsx
//
// Ruta comodín que agrupa las páginas "simples" (sin parámetro dinámico) en UNA
// sola Serverless Function. En Vercel Hobby el límite es de 12 funciones por
// despliegue y cada page.tsx dinámico cuenta como una.
//
// Cada página sigue viviendo en su carpeta como `pagina.tsx` (no es ruta por
// sí sola) con su generateMetadata y su componente igual que antes: aquí solo
// se reparte según la URL. Las URLs, el ?lang= y el SEO no cambian.
//
// Para añadir una página nueva: crear `app/<ruta>/pagina.tsx` (no page.tsx) y
// registrarla en PAGINAS (sin parámetro) o PAGINAS_PARAM (con un parámetro).

import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: { slug: string[] };
  searchParams?: { lang?: string };
};

type PaginaModule = {
  default: (props: any) => any;
  generateMetadata?: (props: any, parent: ResolvingMetadata) => Promise<Metadata>;
};

const PAGINAS: Record<string, () => Promise<PaginaModule>> = {
  acabados: () => import("../acabados/pagina"),
  aplicaciones: () => import("../aplicaciones/pagina"),
  "aviso-legal": () => import("../aviso-legal/pagina"),
  blog: () => import("../blog/pagina"),
  categories: () => import("../categories/pagina"),
  contacto: () => import("../contacto/pagina"),
  empresa: () => import("../empresa/pagina"),
  espacios: () => import("../espacios/pagina"),
  inspiracion: () => import("../inspiracion/pagina"),
  "politica-cookies": () => import("../politica-cookies/pagina"),
  "politica-privacidad": () => import("../politica-privacidad/pagina"),
  "trabaja-con-nosotros": () => import("../trabaja-con-nosotros/pagina"),
  "profesionales/aplicadores": () =>
    import("../profesionales/aplicadores/pagina"),
  "profesionales/certificaciones": () =>
    import("../profesionales/certificaciones/pagina"),
  "profesionales/constructores-arquitectos": () =>
    import("../profesionales/constructores-arquitectos/pagina"),
  "profesionales/servicios": () => import("../profesionales/servicios/pagina"),
};

// Rutas con un parámetro: /<prefijo>/<valor> -> params[<nombre>] = valor.
const PAGINAS_PARAM: Record<
  string,
  { param: string; load: () => Promise<PaginaModule> }
> = {
  aplicaciones: { param: "id", load: () => import("../aplicaciones/[id]/pagina") },
  blog: { param: "id", load: () => import("../blog/[id]/pagina") },
  categories: { param: "slug", load: () => import("../categories/[slug]/pagina") },
  espacios: { param: "slug", load: () => import("../espacios/[slug]/pagina") },
  producto: { param: "id", load: () => import("../producto/[id]/pagina") },
};

type Resuelta = { mod: PaginaModule; params: Record<string, string> };

async function cargar(slug: string[]): Promise<Resuelta | null> {
  const simple = PAGINAS[slug.join("/")];
  if (simple) return { mod: await simple(), params: {} };
  const conParam = slug.length === 2 ? PAGINAS_PARAM[slug[0]] : undefined;
  if (conParam) {
    return {
      mod: await conParam.load(),
      params: { [conParam.param]: slug[1] },
    };
  }
  return null;
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const r = await cargar(props.params.slug);
  if (!r?.mod.generateMetadata) return {};
  return r.mod.generateMetadata({ ...props, params: r.params }, parent);
}

export default async function PaginaSimple(props: Props) {
  const r = await cargar(props.params.slug);
  if (!r) notFound();
  return r.mod.default({ ...props, params: r.params });
}
