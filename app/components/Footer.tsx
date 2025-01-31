import React from 'react';
import Image from 'next/image';
import { Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo Column */}
          <div className="md:col-span-1">
            <Image
              src="/logo.png"
              alt="Grupo Estucalia"
              width={150}
              height={50}
              className="mb-6"
            />
            <p className="text-sm text-gray-400 mt-auto">Copyright©2025</p>
          </div>

          {/* Legal Texts */}
          <div>
            <h3 className="text-sm font-medium mb-4">TEXTOS LEGALES</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Aviso Legal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Cookies</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-medium mb-4">EMPRESA</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trabaja con nosotros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-medium mb-4">PRODUCTOS</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Morteros monocapa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Morteros cola</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mortero de cal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mortero polivalente para juntas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mortero impreso vertical</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Protector de agua</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mortero de reparación</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium mb-4">CONTACTO</h3>
            <p className="text-sm text-gray-400 mb-2">
              Cno Viejo de Fortuna, 40 Matanzas<br />
              30148, Santomera, Murcia (SPAIN).
            </p>
            <div className="space-y-1 mb-4">
              <p className="text-sm text-gray-400">+34 968 862 467</p>
              <p className="text-sm text-gray-400">+34 663 519 854</p>
              <a href="mailto:grupoestucalia@grupoestucalia.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                grupoestucalia@grupoestucalia.com
              </a>
            </div>
            
            {/* Social Links */}
            <h3 className="text-sm font-medium mb-4">SÍGUENOS</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}