'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

export default function ClientNavigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="container mx-auto">
        <div className="flex justify-between items-center px-4 py-2">
          <Link href="/empresa" className="text-white hover:text-gray-300 transition-colors">
            Empresa
          </Link>
          <Button variant="ghost" className="text-white hover:text-gray-300">
            Idiomas
          </Button>
        </div>
        <nav className="border-t border-gray-800">
          <div className="flex justify-between items-center px-4 py-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-gray-300 bg-transparent hover:bg-transparent">
                    Productos
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-white">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/productos/morteros-monocapa" className="block p-3 hover:bg-gray-100">
                            Morteros monocapa
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/productos/morteros-cola" className="block p-3 hover:bg-gray-100">
                            Morteros cola
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-gray-300 bg-transparent hover:bg-transparent">
                    Aplicaciones
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-white">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/aplicaciones/fachadas" className="block p-3 hover:bg-gray-100">
                            Fachadas
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/aplicaciones/interiores" className="block p-3 hover:bg-gray-100">
                            Interiores
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/espacios" className="text-white hover:text-gray-300 transition-colors">
                    Espacios
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="block">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/acabados" className="text-white hover:text-gray-300 transition-colors">
                    Acabados
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/inspiracion" className="text-white hover:text-gray-300 transition-colors">
                    Inspiración
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/profesionales" className="text-white hover:text-gray-300 transition-colors">
                    Profesionales y Técnicos
                  </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
      </div>
    </header>
  );
}