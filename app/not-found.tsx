import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold">404</h2>
            <p>Page not found</p>
            <Link 
                href="/"
                className="text-blue-500 hover:text-blue-700"
            >
                Return Home
            </Link>
        </main>
    );
} 



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'export',
//     images: {
//       unoptimized: true,
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: '**',
//         },
//       ],
//     },
//     trailingSlash: true,
//     experimental: {
//       optimizeCss: true,
//       optimizePackageImports: ['@heroicons/react']
//     },
//     eslint: {
//       ignoreDuringBuilds: true,
//     },
//   };
  
//   module.exports = nextConfig;
  