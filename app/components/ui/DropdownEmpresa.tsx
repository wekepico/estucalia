"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function DropdownEmpresa() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  // Manejar el hover sobre el botón
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  // Manejar el hover fuera del dropdown
  const handleMouseLeave = () => {
    setIsOpen(false);
  };


  useEffect(() => {
    // Cerrar el dropdown al hacer scroll
    const handleScroll = () => setIsOpen(false);

    // Cerrar dropdown si se hace click fuera de él
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Manejar el click en el "botón"
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Para que no dispare el clickOut
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative hidden lg:block " ref={dropdownRef}
    
    onMouseEnter={handleMouseEnter}
    >
      {/* Botón para abrir/cerrar */}
      <button
        onClick={handleToggle}
        className="text-white hover:text-gray-400 transition-colors"
      >
        Empresa
      </button>

      {/* Menú: siempre presente en el DOM, pero con clases condicionales */}
      <div
        className={`
          absolute top-full rounded-lg left-0 mt-2 w-48 bg-black border border-gray-700 shadow-md 
          z-50 overflow-hidden 
          transition-all duration-300 ease-in-out transform origin-top
          ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}
        `}
        onMouseLeave={handleMouseLeave}
      >
        <ul>
          <li>
            <Link
              href="/empresa"
              className="block px-4 py-2 text-white hover:bg-gray-800"
              onClick={()=>setIsOpen(false)}
            >
              Sobre Nosotros
            </Link>
          </li>
          <li>
            <Link
              href="/trabaja-con-nosotros"
              className="block px-4 py-2 text-white hover:bg-gray-800"
              onClick={()=>setIsOpen(false)}
            >
              Trabaja con nosotros
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="block px-4 py-2 text-white hover:bg-gray-800"
              onClick={()=>setIsOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/contacto"
              className="block px-4 py-2 text-white hover:bg-gray-800"
              onClick={()=>setIsOpen(false)}
            >
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
