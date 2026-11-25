// app/layout.tsx

import "./globals.css";
import Footer from "./components/Footer";
import ClientNavigation from "./components/ClientNavigation";
import { LanguageProvider } from "./context/LanguageContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import QueryProvider from "./providers/QueryProvider";
import CookieConsent from "./components/analytics/CookieConsent";
import { Metadata } from "next";
import { headers } from "next/headers";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { unstable_cache } from "next/cache";
import JsonLd from "./components/seo/JsonLd";
import { BACKEND_CACHE_REVALIDATE } from "@/lib/revalidate";
import { SeoLang, toSeoLang } from "@/lib/seo";
import { organizationJsonLd } from "@/lib/structuredData";
import { getFooterData } from "@/services/footerService";
import { getCategories } from "@/services/categoriesService";
import { getApplications } from "@/services/applicationsService";
import { getSpaces } from "@/services/spacesService";
import { getContactPage } from "@/services/contactPageService";

// Metadata por defecto para toda la app (fallback)
export const metadata: Metadata = {
  title: {
    template: "%s", // 👈 Esto evita concatenar automáticamente
    default: "Grupo Estucalia",
  },
  description:
    "Más de 25 años desarrollando y fabricando morteros de alta gama.",
  metadataBase: new URL("https://www.grupoestucalia.com/"),
  keywords: ["morteros", "construcción", "revestimientos", "Grupo Estucalia"],
  authors: [{ name: "Grupo Estucalia" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Grupo Estucalia",
    description:
      "Más de 25 años desarrollando y fabricando morteros de alta gama.",
    images: [
      {
        url: "/og-image-default.jpg",
        width: 1200,
        height: 630,
        alt: "Grupo Estucalia",
      },
    ],
    type: "website",
    locale: "es_ES",
    siteName: "Grupo Estucalia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo Estucalia",
    description:
      "Más de 25 años desarrollando y fabricando morteros de alta gama.",
    images: ["/twitter-image-default.jpg"],
  },
};

const getCachedFooter = unstable_cache(
  async (lang: SeoLang) => getFooterData(lang),
  ["layout-footer"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["footer"] },
);

const getCachedContactInfo = unstable_cache(
  async (lang: SeoLang) => getContactPage(lang),
  ["layout-contact"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["contact"] },
);

const getCachedNavCategories = unstable_cache(
  async () => getCategories(),
  ["layout-categories"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["categories"] },
);

const getCachedNavApplications = unstable_cache(
  async () => getApplications(),
  ["layout-applications"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["applications"] },
);

const getCachedNavSpaces = unstable_cache(
  async () => getSpaces(),
  ["layout-spaces"],
  { revalidate: BACKEND_CACHE_REVALIDATE, tags: ["spaces"] },
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // El idioma llega desde middleware.ts (?lang=).
  const lang = toSeoLang(headers().get("x-lang"));

  // El pie y los datos de la empresa van en el HTML del servidor.
  const [footer, contactPage] = await Promise.all([
    getCachedFooter(lang).catch(() => null),
    getCachedContactInfo(lang).catch(() => null),
  ]);
  // El menú pide estas consultas antes que cualquier página, así que hay que
  // hidratarlas aquí arriba para que el servidor las pinte.
  const queryClient = new QueryClient();
  if (footer) queryClient.setQueryData(["footer", lang], footer);
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: () => getCachedNavCategories(),
    }),
    queryClient.prefetchQuery({
      queryKey: ["applications"],
      queryFn: () => getCachedNavApplications(),
    }),
    queryClient.prefetchQuery({
      queryKey: ["spaces"],
      queryFn: () => getCachedNavSpaces(),
    }),
  ]);

  return (
    <html lang={lang}>
      <head>
        <meta
          name="google-site-verification"
          content="SV_2XLxWI_yLYQ-jQj1GRBHpIIjhTSr2Tz5Ca4VpOdY"
        />
        <link rel="icon" href="/img/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "Titillium Web" }}>
        <JsonLd data={organizationJsonLd(footer, contactPage)} />
        <QueryProvider>
          <LanguageProvider>
            <HydrationBoundary state={dehydrate(queryClient)}>
            <ClientNavigation />
            <div className="max-w-[240rem] pt-28 mx-auto tracking-tight">
              {children}
            </div>
            <Footer />
            <CookieConsent />
            </HydrationBoundary>
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
