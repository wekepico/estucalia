'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Menu, X } from 'lucide-react'; // Importa íconos para el menú

export default function ClientNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Cierra el sidebar
  };

  // Array de enlaces para el menú
  const menuLinks = [
    { href: "/empresa", label: "Empresa" }, // Agregado "Empresa"
    { href: "/acabados", label: "Productos" },
    { href: "/acabados", label: "Aplicaciones" },
    { href: "/acabados", label: "Espacios" },
    { href: "/acabados", label: "Acabados" },
    { href: "/inspiracion", label: "Inspiración" },
    { href: "/profesionales", label: "Profesionales y Técnicos" },
    { href: "#", label: "Idiomas" }, // Agregado "Idiomas"
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="container font-medium mx-auto">
        <div className="flex justify-between items-center px-8 py-6">
          {/* Enlace de "Empresa" solo en escritorio */}
          <Link href="/empresa" className="text-white hover:text-gray-400 transition-colors lg:block hidden">
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
          <div className="flex items-center">
            {/* Enlace de "Idiomas" solo en escritorio */}
            <Link href="#" className="text-white hover:text-gray-400 transition-colors mr-4 lg:block hidden">
              Idiomas
            </Link>
            {/* Botón de menú para móviles */}
            <Button className="lg:hidden" onClick={toggleSidebar}>
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        <nav className="border-t border-gray-500 mx-8">
          <div className="lg:flex items-center justify-center px-8 py-6 hidden">
            <NavigationMenu>
              <NavigationMenuList className='flex gap-8'>
                {menuLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    { (link.label !== "Empresa" && link.label !== "Idiomas") &&
                      <Link href={link.href} className="text-white hover:border-b pb-1 hover:border-white transition-colors">
                      {link.label}
                    </Link>}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
      </div>

      {/* Sidebar para móviles */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-black transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden z-50`}>
        <div className="flex justify-end p-4">
          <Button onClick={toggleSidebar}>
            <X />
          </Button>
        </div>
        <nav className="p-4">
          <NavigationMenu>
            <NavigationMenuList className='flex flex-col items-start gap-4'>
              {menuLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <Link href={link.href} onClick={handleLinkClick} className="text-white hover:border-b pb-1 hover:border-white transition-colors">
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
    </header>
  );
}