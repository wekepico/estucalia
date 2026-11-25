// Datos estructurados (schema.org). Solo se publica lo que devuelve el backend.

import { SITE_URL, SeoLang, stripHtml } from "@/lib/seo";
import { getImageUrl } from "@/lib/i18nHelpers";
import type { ContactPageData } from "@/services/contactPageService";
import type { FooterApiResponse } from "@/services/footerService";

const BRAND = "Grupo Estucalia";

const absolute = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
};

export function organizationJsonLd(
  footer?: FooterApiResponse | null,
  contactPage?: ContactPageData | null,
) {
  const address = contactPage?.contact.address;
  const phones = [footer?.contact?.phone_1, footer?.contact?.phone_2].filter(
    Boolean,
  ) as string[];
  const sameAs = (footer?.follow?.links ?? [])
    .map((l) => l.url)
    .filter((url) => url?.startsWith("http"));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND,
    url: SITE_URL,
    logo: absolute(footer?.logo || "/img/logo.png"),
    email: footer?.contact?.email || undefined,
    telephone: phones[0],
    address: address?.line
      ? {
          "@type": "PostalAddress",
          streetAddress: stripHtml(address.line),
          addressLocality: address.city || undefined,
          addressRegion: address.region || undefined,
          addressCountry: address.country || undefined,
        }
      : undefined,
    contactPoint: phones.map((telephone) => ({
      "@type": "ContactPoint",
      telephone,
      contactType: "customer service",
    })),
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

/** Lista de productos de una categoría. */
export function productListJsonLd(
  category: any,
  products: any[] | undefined,
  lang: SeoLang,
  pageUrl: string,
) {
  if (!products?.length) return null;
  const pick = (obj: any, field: string): string =>
    obj?.[`${field}_${lang}`] || obj?.[`${field}_es`] || obj?.[field] || "";

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: pick(category, "name") || undefined,
    url: pageUrl,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: pick(product, "name"),
        description:
          stripHtml(pick(product, "description")).slice(0, 500) || undefined,
        image: absolute(getImageUrl(product.image_url)),
        category: pick(category, "name") || undefined,
        brand: { "@type": "Brand", name: BRAND },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  };
}
