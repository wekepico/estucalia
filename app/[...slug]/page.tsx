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
// Para añadir una página simple nueva: crear `app/<ruta>/pagina.tsx` y
// registrarla en PAGINAS. Las rutas con parámetro ([id], [slug]) siguen
// siendo page.tsx normales.

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
  contacto: () => import("../contacto/pagina"),
  empresa: () => import("../empresa/pagina"),
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

async function cargar(slug: string[]): Promise<PaginaModule | null> {
  const loader = PAGINAS[slug.join("/")];
  return loader ? loader() : null;
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const mod = await cargar(props.params.slug);
  if (!mod?.generateMetadata) return {};
  return mod.generateMetadata(props, parent);
}

export default async function PaginaSimple(props: Props) {
  const mod = await cargar(props.params.slug);
  if (!mod) notFound();
  return mod.default(props);
}
