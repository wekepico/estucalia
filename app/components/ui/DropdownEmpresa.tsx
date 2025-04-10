"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

export default function DropdownEmpresa() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const { t } = useLanguage();

  // Distancia mínima en píxeles para cerrar el dropdown
  const CLOSE_DISTANCE = 100;
  // Tiempo de espera antes de verificar la posición
  const CLOSE_DELAY = 300;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    if (isOpen) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  const checkMouseDistance = () => {
    if (!dropdownRef.current) return false;
    
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const { x: mouseX, y: mouseY } = mousePositionRef.current;

    // Calcular distancia desde el dropdown
    const distanceFromTop = mouseY - dropdownRect.top;
    const distanceFromBottom = dropdownRect.bottom - mouseY;
    const distanceFromLeft = mouseX - dropdownRect.left;
    const distanceFromRight = dropdownRect.right - mouseX;

    return (
      distanceFromTop > CLOSE_DISTANCE ||
      distanceFromBottom > CLOSE_DISTANCE ||
      distanceFromLeft > CLOSE_DISTANCE ||
      distanceFromRight > CLOSE_DISTANCE
    );
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      if (checkMouseDistance()) {
        setIsOpen(false);
      }
    }, CLOSE_DELAY);
  };

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsOpen(true);
  };

  useEffect(() => {
    // Cerrar el dropdown al hacer scroll
    const handleScroll = () => setIsOpen(false);

    // Cerrar dropdown si se hace click fuera de él
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div 
      className="relative hidden lg:block"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="text-white hover:text-gray-400 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        {t('navigation.company')} {/* Traducción para "Empresa" */}
      </button>

      <div
        className={`absolute top-full left-0 mt-2 w-48 bg-black z-20 shadow-md transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul>
          <li>
            <Link
              href="/empresa"
              className="block px-4 py-2 text-white hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              {t('navigation.about')} {/* Traducción para "Sobre Nosotros" */}
            </Link>
          </li>
          <li>
            <Link
              href="/trabaja-con-nosotros"
              className="block px-4 py-2 text-white hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              {t('navigation.workWithUs')} {/* Traducción para "Trabaja con nosotros" */}
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="block px-4 py-2 text-white hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              {t('navigation.blog')} {/* Traducción para "Blog" */}
            </Link>
          </li>
          <li>
            <Link
              href="/contacto"
              className="block px-4 py-2 text-white hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              {t('navigation.contact')} {/* Traducción para "Contacto" */}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}