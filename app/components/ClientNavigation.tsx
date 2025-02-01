'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

export default function ClientNavigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="container mx-auto">
        <div className="flex justify-between items-center px-8 py-4">
          <Link href="/empresa" className="text-white hover:text-gray-300 transition-colors">
            Empresa
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="block">
                <Image
                  src="/img/logo.png"
                  alt="Logo"
                  width={180}
                  height={100}
                  className="h-14 w-auto"
                />
              </Link>
            </div>
          <Button variant="link" className="text-white hover:text-gray-300">
            Idiomas
          </Button>
        </div>
        <nav className="border-t border-gray-500 mx-8" >
          <div className="flex items-center justify-center px-8 py-6">
            <NavigationMenu>
              <NavigationMenuList className='flex gap-8'>
                <NavigationMenuItem>
                  <Link href="/acabados" className="text-white hover:text-gray-300 hover:underline transition-colors">
                    Productos
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/acabados" className="text-white hover:underline hover:text-gray-300 transition-colors">
                    Aplicaciones
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/acabados" className="text-white hover:underline hover:text-gray-300 transition-colors">
                    Espacos
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/acabados" className="text-white hover:underline hover:text-gray-300 transition-colors">
                    Acabados
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/inspiracion" className="text-white hover:underline hover:text-gray-300 transition-colors">
                    Inspiración
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/profesionales" className="text-white hover:underline hover:text-gray-300 transition-colors">
                    Profesionales y Tecnicos
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
      </div>
    </header>
  );
}