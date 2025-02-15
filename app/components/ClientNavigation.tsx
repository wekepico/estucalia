"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import DropdownEmpresa from "./ui/DropdownEmpresa";
import DropdownIdioma from "./ui/DropdownIdioma";


// Importar tu dropdown


export default function ClientNavigation() {
  const [isOpen, setIsOpen] = useState(false); // Para el sidebar (mobile)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Cerrar el submenú de la navegación central al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setHoveredMenu(null);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false); // Cerrar el sidebar al hacer click
  };

  // Eliminamos la entrada de "Empresa" del menuLinks (porque ahora es un componente aparte)
  const menuLinks = [
    { href: "/productos", label: "Productos", submenu: ["Tipo 1", "Tipo 2", "Tipo 3"] },
    { href: "/aplicaiones", label: "Aplicaciones", submenu: ["Aplicación 1", "Aplicación 2"] },
    { href: "/espacios", label: "Espacios", submenu: ["Espacio 1", "Espacio 2"] },
    { href: "/acabados", label: "Acabados", submenu: ["Acabado 1", "Acabado 2"] },
    { href: "/inspiracion", label: "Inspiración", submenu: ["Acabado 1", "Acabado 2"] },
    {
      href: "/profesionales",
      label: "Profesionales y Técnicos",
      submenu: ["Acabado 1", "Acabado 2", "Acabado 2", "Acabado 2", "Acabado 2"],
    },
    { href: "#", label: "Idiomas" },
  ];

  return (
    <header
      onClick={() => setHoveredMenu(null)}
      className="fixed top-0 left-0 right-0 z-50  bg-black"
    >
      <div className=" relative font-[600] max-w-[120rem] text-lg mx-auto">
        <div className="flex justify-between items-center px-20 py-6">
          {/* Aquí se muestra el dropdown de Empresa (solo en desktop, ver el componente) */}
          <DropdownEmpresa />

          {/* LOGO en el centro */}
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

          {/* Idiomas en desktop + boton sidebar en mobile */}
          <div className="flex items-center">
          <DropdownIdioma />
            <Button className="lg:hidden" onClick={toggleSidebar}>
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* NAV central (solo en desktop) */}
        <nav className="border-t border-gray-500 mx-20">
          <div className="lg:flex items-center justify-center  px-8 py-6 hidden">
            <NavigationMenu>
              <NavigationMenuList className="flex w-full gap-8">
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
                      <div className={`absolute max-w-[120rem] ${hoveredMenu === link.label ? "opacity-100 visible" : "opacity-0 invisible"
                        } transition-all duration-300 ease-in-out top-full mx-auto pt-10 text-center w-[102vw] h-[350px] mt-6 backdrop-blur-[2px]  backdrop-opacity-80"`}
                        style={{
                          background: "rgba(0, 5, 0, 0.6)",
                        }}
                        onMouseLeave={() => setHoveredMenu(null)}
                      >
                        <ul className="py-2">
                          {link.submenu.map((subItem, subIndex) => (
                            <li
                              key={subIndex}
                              className="px-4 py-2 hover:underline"
                            >
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

      {/* Overlay para cerrar sidebar en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* SIDEBAR móvil */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden z-50`}
      >
        <div className="flex justify-end p-4">
          <Button onClick={toggleSidebar}>
            <X />
          </Button>
        </div>
        <nav className="p-4">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col items-start gap-4">
              {/* Empresa en móvil (sin dropdown, o lo que prefieras) */}
              <div className="text-white font-semibold">Empresa</div>
              <div className="ml-3 mb-4">
                <ul className="space-y-2">
                  <li>
                    <Link href="/sobre-nosotros" onClick={handleLinkClick}>
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="/trabaja-con-nosotros" onClick={handleLinkClick}>
                      Trabaja con nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" onClick={handleLinkClick}>
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/contacto" onClick={handleLinkClick}>
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resto de enlaces */}
              {menuLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className="text-white hover:border-b pb-1 hover:border-white transition-colors"
                  >
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
