// Utilidades SEO compartidas.

export const SITE_URL = "https://www.grupoestucalia.com";

export type SeoLang = "es" | "en" | "fr";

export const toSeoLang = (raw?: string | null): SeoLang =>
  raw === "en" || raw === "fr" ? raw : "es";

/**
 * Canonical y hreflang de una página: cada idioma declara como canonical su
 * propia URL pública con ?lang=. No se usa el canonical del backend.
 *
 * @param path ruta sin dominio, o función si el slug cambia según el idioma.
 */
export function buildAlternates(
  lang: SeoLang,
  path: string | ((l: SeoLang) => string),
) {
  const url = (l: SeoLang) =>
    `${SITE_URL}${typeof path === "function" ? path(l) : path}?lang=${l}`;

  return {
    canonical: url(lang),
    languages: {
      es: url("es"),
      en: url("en"),
      fr: url("fr"),
      "x-default": url("es"),
    },
  };
}

export const stripHtml = (value?: string | null): string =>
  String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
