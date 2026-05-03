// app/robots.ts
//
// Next sirve esto automáticamente en /robots.txt. Le decimos a los bots:
// - Pueden crawlear todo el sitio
// - Excepto rutas internas /api/ (no hay nada público útil ahí)
// - Y aquí tienes el sitemap

import type { MetadataRoute } from "next";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.grupoestucalia.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
