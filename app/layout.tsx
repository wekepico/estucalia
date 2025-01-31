import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
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
      <body className={inter.className}>
        <header className="fixed top-0 left-0 right-0 z-50 bg-black">
          <div className="container mx-auto">
            <div className="flex justify-between items-center px-4 py-2">
              <a href="#" className="text-white hover:text-gray-300">Empresa</a>
              <a href="#" className="text-white hover:text-gray-300">Idiomas</a>
            </div>
            <nav className="border-t border-gray-800">
              <div className="flex justify-between items-center px-4 py-4">
                <div className="flex space-x-6">
                  <a href="#" className="text-white hover:text-gray-300">Productos</a>
                  <a href="#" className="text-white hover:text-gray-300">Aplicaciones</a>
                  <a href="#" className="text-white hover:text-gray-300">Espacios</a>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <a href="/" className="block">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={120}
                      height={40}
                      className="h-10 w-auto"
                    />
                  </a>
                </div>

                <div className="flex space-x-6">
                  <a href="#" className="text-white hover:text-gray-300">Acabados</a>
                  <a href="#" className="text-white hover:text-gray-300">Inspiración</a>
                  <a href="#" className="text-white hover:text-gray-300">Profesionales y Técnicos</a>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <div className="pt-28">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}