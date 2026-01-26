import './globals.css';
import Footer from './components/Footer';
import ClientNavigation from './components/ClientNavigation';
import { LanguageProvider } from './context/LanguageContext';
import { SpeedInsights } from "@vercel/speed-insights/next"
import QueryProvider from './providers/QueryProvider';

export const metadata = {
  title: 'Grupo estucalia',
  description: 'Más de 25 años desarrollando y fabricando morteros de alta gama.',
  metadataBase: new URL("https://www.grupoestucalia.com/"),
  keywords: ["word", "word", "word", "word"],
  openGraph: {
    title: "Grupo estucalia",
    description: "Más de 25 años desarrollando y fabricando morteros de alta gama.",
    images: [
      {
        url: "https://img.freepik.com/premium-photo/residential-building-sky-background-facade-modern-housing-construction-with-balconies_991208-12480.jpg",
        width: 800,
        height: 600,
        alt: "Image description",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet" />
      </head>
      <body
        style={{ fontFamily: "Titillium Web" }}
      >
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