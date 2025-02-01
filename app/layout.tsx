import './globals.css';
import { Inter } from 'next/font/google';
import Footer from './components/Footer';
import ClientNavigation from './components/ClientNavigation';

const inter = Inter({ subsets: ['latin'] });

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
      </head>
      <body className={inter.className}
        style={{ fontFamily: "Titillium Web Regular" }}
      >
        <ClientNavigation />
        <div className="pt-28 tracking-tight">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}