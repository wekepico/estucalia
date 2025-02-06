'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function ClientNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Cierra el sidebar
  };

  // Array de enlaces para el menú
  const menuLinks = [
    { href: "/empresa", label: "Empresa" },
    { href: "/productos", label: "Productos", submenu: ["Tipo 1", "Tipo 2", "Tipo 3"] },
    { href: "/aplicaiones", label: "Aplicaciones", submenu: ["Aplicación 1", "Aplicación 2"] },
    { href: "/espacios", label: "Espacios", submenu: ["Espacio 1", "Espacio 2"] },
    { href: "/acabados", label: "Acabados", submenu: ["Acabado 1", "Acabado 2"] },
    { href: "/inspiracion", label: "Inspiración", submenu: ["Acabado 1", "Acabado 2"] },
    { href: "/profesionales", label: "Profesionales y Técnicos", submenu: ["Acabado 1", "Acabado 2", "Acabado 2", "Acabado 2", "Acabado 2"] },
    { href: "#", label: "Idiomas" },
  ];

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname()

  return (
    <header onClick={() => setHoveredMenu(null)} className="fixed   top-0 left-0 right-0 z-50 bg-black">
      <div className="container relative  font-[600] text-lg mx-auto">
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
        <nav className="border-t  border-gray-500 mx-8">
          <div className="lg:flex items-center justify-center px-8 py-6 hidden">
            <NavigationMenu>
              <NavigationMenuList className='flex w-full gap-8'>
                {menuLinks.map((link, index) => (
                  <>
                    <NavigationMenuItem
                      key={index + "nav-Link"}
                      onMouseEnter={() => setHoveredMenu(link.label)}

                    >
                      {link.label !== "Empresa" && link.label !== "Idiomas" && (
                        <div
                          key={index}
                          className="relative group"
                          onMouseEnter={() => setHoveredLink(link.label)}
                          onMouseLeave={() => setHoveredLink(null)}
                        >
                          <Link
                            href={link.href}
                            className="text-white pb-2 relative"
                          >
                            {link.label}
                            <div className={`
                                 absolute bottom-0 left-0 w-full h-[2px] bg-white 
                                 origin-center transform transition-transform duration-300 
                               ${(hoveredLink === link.label || pathname === link.href) ? 'scale-x-100' : 'scale-x-0'}
                               `}>
                            
                            </div>
                          </Link>
                        </div>

                      )}
                    </NavigationMenuItem>
                    {link.submenu && (
                      <div className={`absolute ${hoveredMenu === link.label ? "opacity-100 visible" : "opacity-0 invisible"
                        } transition-all duration-300 ease-in-out top-full mx-auto pt-10 text-center w-[100vw] h-[350px] mt-6 backdrop-blur-[2px]  backdrop-opacity-80"`}
                        style={{
                          background: "rgba(0, 5, 0, 0.6)", // Fondo negro con opacidad del 80%
                        }}
                        onMouseLeave={() => setHoveredMenu(null)}
                      >
                        <ul className="py-2">
                          {link.submenu.map((subItem, subIndex) => (
                            <li key={subIndex + "nab-subLink"} className="px-4 py-2 hover:underline">
                              <Link href="#" className="text-white block">
                                {subItem}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
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