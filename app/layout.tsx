import './globals.css';
import { Inter } from 'next/font/google';
import Footer from './components/Footer';
import ClientNavigation from './components/ClientNavigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Modern Architecture Studio',
  description: 'Creating spaces that inspire and transform lives',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}
        style={{ fontFamily: "Orgon Light" }}
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