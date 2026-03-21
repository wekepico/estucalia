// app/layout.tsx

import "./globals.css";
import Footer from "./components/Footer";
import ClientNavigation from "./components/ClientNavigation";
import { LanguageProvider } from "./context/LanguageContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import QueryProvider from "./providers/QueryProvider";
import { Metadata } from "next";

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
  alternates: {
    canonical: "https://www.grupoestucalia.com",
    languages: {
      es: "https://www.grupoestucalia.com?lang=es",
      en: "https://www.grupoestucalia.com?lang=en",
      fr: "https://www.grupoestucalia.com?lang=fr",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/img/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "Titillium Web" }}>
        <QueryProvider>
          <LanguageProvider>
            <ClientNavigation />
            <div className="max-w-[240rem] pt-28 mx-auto tracking-tight">
              {children}
            </div>
            <Footer />
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
