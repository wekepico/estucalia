"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function DropdownIdioma() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div className="relative hidden lg:block " ref={dropdownRef}>
      {/* Botón para abrir/cerrar */}
      <button
        onClick={handleToggle}
        className="text-white hover:text-gray-400 transition-colors"
      >
        Idioma
      </button>

      {/* Menú: siempre presente en el DOM, pero con clases condicionales */}
      <div
        className={`
          absolute top-full rounded-lg left-0 flex flex-col items-center justify-center mt-2 w-12 bg-black border border-gray-700 shadow-md 
          z-50 overflow-hidden 
          transition-all duration-300 ease-in-out transform origin-top
          ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}
        `}
      >
        <ul>
          <li>
            <div
              className="block px-4 py-2 text-white cursor-pointer hover:bg-gray-800"
              onClick={()=>  setIsOpen(false)}
            >
              EN
            </div>
          </li>
          <li>
          <div
              className="block px-4 py-2 text-white cursor-pointer hover:bg-gray-800"
              onClick={()=>  setIsOpen(false)}
            >
              ES
            </div>
          </li>
          <li>
          <div
              className="block px-4 py-2 text-white cursor-pointer hover:bg-gray-800"
              onClick={()=>  setIsOpen(false)}
            >
              FR
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
