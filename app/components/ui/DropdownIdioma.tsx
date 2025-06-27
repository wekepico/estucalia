"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from '../../context/LanguageContext';

export default function DropdownIdioma() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  // Distancia mínima en píxeles para cerrar el dropdown
  const CLOSE_DISTANCE = 50; 
  // Tiempo de espera antes de verificar la posición
  const CLOSE_DELAY = 200;

  // Detectar si es desktop
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lógica de hover para desktop
  useEffect(() => {
    if (!isDesktop) return;
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };
    if (isOpen) {
      document.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen, isDesktop]);

  const checkMouseDistance = () => {
    if (!dropdownRef.current) return false;
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const { x: mouseX, y: mouseY } = mousePositionRef.current;
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

  // Cerrar el dropdown al hacer click fuera (en ambos modos)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleLanguageChange = (lang: 'es' | 'en' | 'fr') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  // Handlers condicionales
  const eventHandlers = isDesktop
    ? {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      }
    : {};

  return (
    <div
      className="relative lg:block"
      ref={dropdownRef}
      {...eventHandlers}
    >
      <button
        className="text-white hover:text-gray-400 transition-colors"
        onClick={() => {
          if (!isDesktop) setIsOpen((prev) => !prev);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {language.toUpperCase()}
      </button>

      <div
        className={`absolute top-full left-0 mt-2 w-12 bg-black shadow-md z-20 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul>
          {['en', 'es', 'fr'].map((lang) => (
            <li key={lang}>
              <button
                className={`w-full px-4 py-2 text-white hover:bg-gray-800 transition-colors ${
                  language === lang ? 'bg-gray-800' : ''
                }`}
                onClick={() => handleLanguageChange(lang as 'es' | 'en' |'fr')}
              >
                {lang.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}