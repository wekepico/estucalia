// app/sitemap.xml/route.ts
//
// Sitemap en /sitemap.xml con una URL por idioma y sus hreflang.
// Lee del backend todas las categorías, aplicaciones, espacios y noticias
// y emite cada URL con sus 3 variantes de idioma (hreflang). Cache 20 min.
//
// Si en producción se cambia de dominio, basta con poner la env:
//   NEXT_PUBLIC_SITE_URL=https://otro-dominio.com

import { unstable_cache } from "next/cache";
import { BACKEND_CACHE_REVALIDATE } from "@/lib/revalidate";

import { getCategories } from "@/services/categoriesService";
import { getApplications } from "@/services/applicationsService";
import { getSpaces } from "@/services/spacesService";
import { getBlogPage } from "@/services/bolgsServices";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.grupoestucalia.com";

type Lang = "es" | "en" | "fr";

type Entry = {
  url: string;
  lastModified: Date;
  changeFrequency: "weekly" | "monthly";
  priority?: number;
  alternates: { languages: Record<Lang, string> };
};

export const revalidate = 1200;

const LANGS: Lang[] = ["es", "en", "fr"];

// Páginas estáticas (mismas URLs para los 3 idiomas, distinguidas por ?lang=).
const STATIC_PATHS: { path: string; priority?: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/empresa", priority: 0.8 },
  { path: "/contacto", priority: 0.7 },
  { path: "/trabaja-con-nosotros", priority: 0.6 },
  { path: "/blog", priority: 0.8 },
  { path: "/categories", priority: 0.8 },
  { path: "/acabados", priority: 0.7 },
  { path: "/inspiracion", priority: 0.6 },
  { path: "/profesionales/aplicadores", priority: 0.6 },
  { path: "/profesionales/certificaciones", priority: 0.6 },
  { path: "/profesionales/constructores-arquitectos", priority: 0.6 },
  { path: "/profesionales/servicios", priority: 0.6 },
  { path: "/aviso-legal", priority: 0.3 },
  { path: "/politica-privacidad", priority: 0.3 },
  { path: "/politica-cookies", priority: 0.3 },
];

// Cacheamos los fetches al backend por 20 min igual que el resto del sitio.
// Si alguna llamada falla, devolvemos [] y el sitemap se sigue generando con
// el resto.
const getSitemapData = unstable_cache(
  async () => {
    const [categoriesRes, applicationsRes, spacesRes, blogRes] =
      await Promise.allSettled([
        getCategories(),
        getApplications(),
        getSpaces(),
        getBlogPage("es"),
      ]);

    return {
      categories:
        categoriesRes.status === "fulfilled" ? categoriesRes.value.data : [],
      applications:
        applicationsRes.status === "fulfilled"
          ? applicationsRes.value.data
          : [],
      spaces: spacesRes.status === "fulfilled" ? spacesRes.value.data : [],
      posts: blogRes.status === "fulfilled" ? blogRes.value.blogs : [],
    };
  },
  ["sitemap-data"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["sitemap"] },
);

// Construye un objeto de alternates por idioma. Si el slug por idioma no
// existe, usa el slug base (igual que el sitio en runtime).
function buildLangAlternates(buildPath: (lang: Lang) => string) {
  return {
    languages: LANGS.reduce<Record<string, string>>((acc, lang) => {
      acc[lang] = `${BASE}${buildPath(lang)}?lang=${lang}`;
      return acc;
    }, {}),
  };
}

const safeDate = (raw?: string | null): Date => {
  if (!raw) return new Date();
  const d = new Date(raw);
  return isNaN(d.getTime()) ? new Date() : d;
};

async function buildEntries(): Promise<Entry[]> {
  const { categories, applications, spaces, posts } = await getSitemapData();
  const now = new Date();

  // ===== Estáticas =====
  const staticEntries: Entry[] = STATIC_PATHS.map(
    ({ path, priority }) => ({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority,
      alternates: buildLangAlternates(() => path),
    }),
  );

  // ===== Categorías (URLs canónicas usando /categories/[slug]) =====
  const categoryEntries: Entry[] = categories.map((cat) => ({
    url: `${BASE}/categories/${cat.slug}`,
    lastModified: safeDate(cat.updated_at),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: buildLangAlternates((lang) => {
      const localized =
        (lang === "es" && (cat.slug_es || cat.slug)) ||
        (lang === "en" && (cat.slug_en || cat.slug)) ||
        (lang === "fr" && (cat.slug_fr || cat.slug)) ||
        cat.slug;
      return `/categories/${localized}`;
    }),
  }));

  // ===== Aplicaciones =====
  const applicationEntries: Entry[] = applications.map((app) => ({
    url: `${BASE}/aplicaciones/${app.slug}`,
    lastModified: safeDate(app.updated_at),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: buildLangAlternates((lang) => {
      const localized =
        (lang === "es" && (app.slug_es || app.slug)) ||
        (lang === "en" && (app.slug_en || app.slug)) ||
        (lang === "fr" && (app.slug_fr || app.slug)) ||
        app.slug;
      return `/aplicaciones/${localized}`;
    }),
  }));

  // ===== Espacios =====
  const spaceEntries: Entry[] = spaces.map((sp) => ({
    url: `${BASE}/espacios/${sp.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: buildLangAlternates((lang) => {
      const localized =
        (lang === "es" && sp.slug) ||
        (lang === "en" && (sp.slug_en || sp.slug)) ||
        (lang === "fr" && (sp.slug_fr || sp.slug)) ||
        sp.slug;
      return `/espacios/${localized}`;
    }),
  }));

  // ===== Blog posts =====
  const blogEntries: Entry[] = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: safeDate(post.createdAt),
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: buildLangAlternates((lang) => {
      const localized =
        (lang === "es" && post.slug) ||
        (lang === "en" && (post.slug_en || post.slug)) ||
        (lang === "fr" && (post.slug_fr || post.slug)) ||
        post.slug;
      return `/blog/${localized}`;
    }),
  }));

  return [
    ...staticEntries,
    ...categoryEntries,
    ...applicationEntries,
    ...spaceEntries,
    ...blogEntries,
  ];
}

const escapeXml = (value: string) =>
  encodeURI(decodeURI(value))
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const entries = await buildEntries();

  const urls = entries.flatMap((entry) => {
    const alternates = [
      ...LANGS.map((l) => [l, entry.alternates.languages[l]]),
      ["x-default", entry.alternates.languages.es],
    ]
      .map(
        ([l, href]) =>
          `    <xhtml:link rel="alternate" hreflang="${l}" href="${escapeXml(href)}"/>`,
      )
      .join("\n");

    return LANGS.map((l) =>
      [
        "  <url>",
        `    <loc>${escapeXml(entry.alternates.languages[l])}</loc>`,
        alternates,
        `    <lastmod>${entry.lastModified.toISOString()}</lastmod>`,
        `    <changefreq>${entry.changeFrequency}</changefreq>`,
        `    <priority>${entry.priority ?? 0.5}</priority>`,
        "  </url>",
      ].join("\n"),
    );
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
