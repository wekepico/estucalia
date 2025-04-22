import './globals.css';
import Footer from './components/Footer';
import ClientNavigation from './components/ClientNavigation';
import { LanguageProvider } from './context/LanguageContext';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: 'Modern Architecture Studio',
  description: 'Creating spaces that inspire and transform lives',
  metadataBase: new URL("https://example.com"),
  keywords: ["word", "word", "word", "word"],
  openGraph: {
    title: "Modern Architecture Studio",
    description: "Creating spaces that inspire and transform lives.",
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
        <link rel="icon" href="./img/logo-nav.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet" />
      </head>
      <body
        style={{ fontFamily: "Titillium Web" }}
      >
        <LanguageProvider>
          <ClientNavigation />
          <div className="max-w-[240rem] mx-auto tracking-tight">
            {children}
          </div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}