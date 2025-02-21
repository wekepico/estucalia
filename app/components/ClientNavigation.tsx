"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import DropdownEmpresa from "./ui/DropdownEmpresa";
import DropdownIdioma from "./ui/DropdownIdioma";
import { Button } from "./ui/button";


// Importar tu dropdown


export default function ClientNavigation() {
  const [isOpen, setIsOpen] = useState(false); // Para el sidebar (mobile)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 77;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [isScrolled]);


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
    { href: "/aplicaiones", label: "Aplicaciones", submenu: ["Revestimientos", "Revocos y enlucidos","Albañilería","Baldosas","Recrecidos","Aislamiento térmico","Impermeabilización","Deshumidificación"] },
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
    <>

      <header
        onClick={() => setHoveredMenu(null)}
      
        className={`w-full   bg-black ${isScrolled?"":"mb-0"}`}
      >
        <div className=" relative font-[600] max-w-[120rem]   text-lg mx-auto">
          <div className="flex justify-between items-center  border-gray-500 md:px-15 sm:px-10 px-5 lg:px-20 py-6">
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
          <div className=" h-[1px]  bg-gray-500 md:mx-15 sm:mx-10 mx-5 lg:mx-20 " ></div>



          {/* NAV central (solo en desktop) */}
          <nav   ref={headerRef} className={`top-0 w-full left-0 right-0 z-50 bg-black ${
            isScrolled 
              ? "fixed animate-fade-in-down shadow-lg" 
              : "flex justify-center "
          }`}>
            <div className={`lg:flex items-center relative justify-center py-2 hidden `}>
              <NavigationMenu>
                <NavigationMenuList className="flex   gap-8">
                  {menuLinks.map((link, index) => (
                    <>
                      <NavigationMenuItem
                        key={index + "nav-Link"}
                        onMouseEnter={() => setHoveredMenu(link.label)}
                      >
                        {link.label !== "Empresa" && link.label !== "Idiomas" && (
                          <div
                            
                            key={index}
                            onMouseEnter={() => setHoveredLink(link.label)}
                            onMouseLeave={() => setHoveredLink(null)}
                          >
                            <div
                              className="text-white pb-2 cursor-default "
                            >
                              {link.label}
                              <div className={`
                                    bottom-0 left-0 h-[2px] bg-white 
                                  origin-center transform transition-transform duration-300 
                                ${(hoveredLink === link.label || pathname === link.href) ? 'scale-x-100' : 'scale-x-0'}
                                `}>
                              
                              </div>
                            </div>
                          </div>

                        )}
                      </NavigationMenuItem>
                      {link.submenu && (
                        <div className={`absolute  ${hoveredMenu === link.label ? "opacity-100 visible" : "opacity-0 invisible"
                          } transition-all duration-300 ease-in-out top-full mx-auto  pt-10 text-center w-[102vw] h-[350px] mt-2 backdrop-blur-[2px]  backdrop-opacity-80"`}
                          style={{
                            background: "rgba(0, 5, 0, 0.6)",
                          }}
                          onMouseLeave={() => setHoveredMenu(null)}
                        >
                          <ul className=" grid grid-cols-3 gap-3 md:px-48 lg:px-56 py-12">
                            {link.submenu.map((subItem, subIndex) => (
                              <li
                                key={subIndex}
                                className=" hover:underline"
                              >
                                <Link href={`/aplicaciones/${subItem.toLocaleLowerCase()}`} className="text-white block">
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
            <Button variant="outline" className="text-white rounded-full" onClick={toggleSidebar}>
              <X />
            </Button>
          </div>
          <nav className="p-4">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col items-start gap-4">
                {/* Empresa en móvil (sin dropdown, o lo que prefieras) */}
                <div className="text-white border-b border-white font-semibold">Empresa</div>
                <div className="ml-3 mb-4">
                  <ul className="space-y-2 text-white">
                    <li>
                      <Link href="/empresa" key={"/about-us"} onClick={handleLinkClick}>
                        Sobre Nosotros
                      </Link>
                    </li>
                    <li>
                      <Link href="/trabaja-con-nosotros" key='work with us' onClick={handleLinkClick}>
                        Trabaja con nosotros
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" key='blog' onClick={handleLinkClick}>
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/contacto" key='contact' onClick={handleLinkClick}>
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
      {isScrolled && <div style={{ height: headerHeight }} />}
    </>
  );
}
