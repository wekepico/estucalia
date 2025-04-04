"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

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

export default function ClientNavigation() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setHoveredMenu(null);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Función para generar slugs consistentes con las traducciones
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s]+/g, '-')
      .replace(/--+/g, '-');
  };

  const menuLinks = [
    {
      href: "/productos",
      label: "navigation.products.label",
      submenu: t("navigation.products.submenu").split(', ').map(item => ({
        label: item.trim(),
        href: generateSlug(item.trim())
      }))
    },
    {
      href: "/aplicaciones",
      label: "navigation.applications.label",
      submenu: t("navigation.applications.submenu").split(', ').map(item => ({
        label: item.trim(),
        href: item.trim()
      }))
    },
    {
      href: "/espacios",
      label: "navigation.spaces.label", 
      submenu: t("navigation.spaces.submenu").split(', ').map(item => ({
        label: item.trim(),
        href: item.trim()
      }))
    },
    {
      href: "/acabados",
      label: "navigation.finishes",
      submenu: [],
    },
    {
      href: "/inspiracion",
      label: "navigation.inspiration",
      submenu: [],
    },
    {
      href: "/profesionales",
      label: "navigation.professionals",
      submenu: [
        { label: "Constructores y arquitectos", href: "constructores-arquitectos" },
        { label: "Aplicadores", href: "aplicadores" },
        { label: "Servicio Integral de Proyectos", href: "servicio-integral" },
        { label: "Certificaciones y documentación", href: "certificaciones" },
      ],
    },

  ];

  if (!mounted) {
    return null;
  }

  return (
    <>
      <header
        onClick={() => setHoveredMenu(null)}
        className={`w-full bg-black ${isScrolled ? "" : "mb-0"}`}
      >
        <div className="relative font-[600] max-w-[240rem] text-lg mx-auto">
          <div className="flex justify-between items-center border-gray-500 md:px-15 sm:px-10 px-5 lg:px-20 py-6">
            <DropdownEmpresa />

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
              <DropdownIdioma />
              <Button className="lg:hidden" onClick={toggleSidebar}>
                {isOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
          <div className="h-[1px] bg-gray-500 md:mx-15 sm:mx-10 mx-5 lg:mx-20"></div>

          <nav ref={headerRef} className={`top-0 w-full left-0 right-0 z-10 bg-black ${
            isScrolled
              ? "fixed animate-fade-in-down shadow-lg"
              : "flex justify-center relative"
          }`}>
            <div className={`absolute z-[-1] ${
              hoveredMenu ? "opacity-100 visible" : "opacity-0 invisible"
            } transition-all duration-300 ease-in-out top-[2.85rem] w-[102vw] h-[420px] mt-2 backdrop-blur-[3.5px] backdrop-opacity-90`}
              style={{
                background: "rgba(0, 5, 0, 0.6)",
              }}
              onMouseLeave={() => setHoveredMenu(null)}
            ></div>
            <div className={`lg:flex items-center relative justify-center py-2 hidden`}>
              <NavigationMenu>
                <NavigationMenuList className="flex gap-8">
                  {menuLinks.map((link, index) => (
                    <div className="relative w-full min-w-max" key={index + "Navigation"}>
                      <NavigationMenuItem
                        key={index + "nav-Link"}
                        onMouseEnter={link.submenu.length === 0 ? undefined : () => setHoveredMenu(link.label)}
                      >
                        <div
                          key={index}
                          onMouseEnter={() => setHoveredLink(link.label)}
                          onMouseLeave={() => setHoveredLink(null)}
                          onClick={link.submenu.length === 0 ? () => window.location.href = link.href : undefined}
                        >
                          <div
                            className={`${
                              link.submenu.length === 0 ? "cursor-pointer" : "cursor-default"
                            } text-white pb-2`}
                          >
                            {t(link.label)}
                            <div className={`
                              bottom-0 left-0 h-[2px] bg-white 
                              origin-center transform transition-transform duration-300 
                              ${(hoveredLink === link.label || pathname.includes(link.href)) ? 'scale-x-100' : 'scale-x-0'}
                            `}></div>
                          </div>
                        </div>
                      </NavigationMenuItem>

                      {link.submenu.length > 0 && (
                        <div
                          className={`absolute left-0 ${
                            hoveredMenu === link.label ? "opacity-100 visible" : "opacity-0 invisible"
                          } transition-all w-max duration-300 ease-in-out top-full flex flex-col mt-2 bg-transparent h-[400px]`}
                          onMouseLeave={() => setHoveredMenu(null)}
                        >
                          <ul className="font-[400] flex flex-col py-4 space-y-4">
                            {link.submenu.map((subItem, subIndex) => (
                              <li
                                key={subIndex}
                                className="hover:underline"
                              >
                                <Link 
                                  href={`${link.href}/${subItem.href}`} 
                                  className="text-white block"
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </nav>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

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
                <div className="text-white border-b border-white font-semibold">{t("navigation.company")}</div>
                <div className="ml-3 mb-4">
                  <ul className="space-y-2 text-white">
                    <li>
                      <Link href="/empresa" key={"/about-us"} onClick={handleLinkClick}>
                        {t("navigation.about")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/trabaja-con-nosotros" key='work with us' onClick={handleLinkClick}>
                        {t("navigation.workWithUs")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" key='blog' onClick={handleLinkClick}>
                        {t("navigation.blog")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/contacto" key='contact' onClick={handleLinkClick}>
                        {t("navigation.contact")}
                      </Link>
                    </li>
                  </ul>
                </div>

                {menuLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className="text-white hover:border-b pb-1 hover:border-white transition-colors"
                    >
                      {t(link.label)}
                    </Link>
                    {link.submenu.length > 0 && (
                      <ul className="ml-4 mt-2 space-y-2">
                        {link.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={`${link.href}/${subItem.href}`}
                              onClick={handleLinkClick}
                              className="text-white text-sm"
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
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