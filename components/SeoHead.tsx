// components/SeoHead.tsx
"use client";

import { useEffect } from "react";
import { SeoData } from "@/services/empresaService";

interface SeoHeadProps {
  seo: SeoData | null;
  url?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export default function SeoHead({
  seo,
  url,
  fallbackTitle = "Grupo Estucalia",
  fallbackDescription = "Más de 25 años desarrollando y fabricando morteros de alta gama.",
}: SeoHeadProps) {
  useEffect(() => {
    if (!seo) return;

    console.log("🔄 Actualizando SEO con:", {
      title: seo.meta?.title,
      description: seo.meta?.description,
      ogTitle: seo.og?.title,
    });

    // 1. Actualizar título
    const title = seo.meta?.title || fallbackTitle;
    document.title = title;

    // 2. Función helper para actualizar o crear meta tags
    const updateMeta = (
      selector: string,
      content: string | null | undefined,
      isProperty = false,
    ) => {
      if (!content) return;

      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        if (isProperty) {
          const propName = selector.match(/property="([^"]+)"/)?.[1];
          if (propName) meta.setAttribute("property", propName);
        } else {
          const nameAttr = selector.match(/name="([^"]+)"/)?.[1];
          if (nameAttr) meta.setAttribute("name", nameAttr);
        }
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    // 3. Actualizar meta tags básicos
    if (seo.meta?.description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", seo.meta.description);
    }

    if (seo.meta?.keywords) {
      let meta = document.querySelector('meta[name="keywords"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "keywords");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", seo.meta.keywords);
    }

    if (seo.meta?.robots) {
      let meta = document.querySelector('meta[name="robots"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "robots");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", seo.meta.robots);
    }

    if (seo.meta?.author) {
      let meta = document.querySelector('meta[name="author"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "author");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", seo.meta.author);
    }

    if (seo.meta?.publisher) {
      let meta = document.querySelector('meta[name="publisher"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "publisher");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", seo.meta.publisher);
    }

    // 4. Open Graph
    const ogTitle = seo.og?.title || seo.meta?.title;
    if (ogTitle) {
      let meta = document.querySelector('meta[property="og:title"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", "og:title");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", ogTitle);
    }

    const ogDescription = seo.og?.description || seo.meta?.description;
    if (ogDescription) {
      let meta = document.querySelector('meta[property="og:description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", "og:description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", ogDescription);
    }

    if (seo.og?.image) {
      let meta = document.querySelector('meta[property="og:image"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", "og:image");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", seo.og.image);
    }

    if (seo.og?.type) {
      let meta = document.querySelector('meta[property="og:type"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", "og:type");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", seo.og.type);
    }

    // 5. Twitter
    if (seo.twitter?.card) {
      let meta = document.querySelector('meta[name="twitter:card"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "twitter:card");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", seo.twitter.card);
    }

    const twitterTitle = seo.twitter?.title || seo.meta?.title;
    if (twitterTitle) {
      let meta = document.querySelector('meta[name="twitter:title"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "twitter:title");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", twitterTitle);
    }

    const twitterDescription =
      seo.twitter?.description || seo.meta?.description;
    if (twitterDescription) {
      let meta = document.querySelector('meta[name="twitter:description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "twitter:description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", twitterDescription);
    }

    if (seo.twitter?.image) {
      let meta = document.querySelector('meta[name="twitter:image"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "twitter:image");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", seo.twitter.image);
    }

    // 6. Canonical URL
    const canonicalUrl = seo.meta?.canonical || url;
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", canonicalUrl);
    }
  }, [seo, url, fallbackTitle, fallbackDescription]);

  return null;
}
