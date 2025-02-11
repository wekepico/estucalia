'use client';

import React from 'react';
import Image from 'next/image';
import { Linkedin, Facebook, Instagram, Youtube, FacebookIcon } from 'lucide-react';
import Link from 'next/link';
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black text-sm flex justify-center text-white py-20">
      <div className="container max-w-[120rem] ">
        <div className="flex relative max-lg:flex-col flex-wrap justify-center max-sm:items-start max-sm:pl-8 items-center w-full max-sm:text-sm gap-20 ">
          {/* Logo Column */} 
          <div className="flex">
            <Image
              src="/img/logo.png"
              alt="Grupo Estucalia"
              width={200}
              height={100}
              className="mb-6 max-sm:-ml-3 h-14 w-auto absolute"
            />
            <p className="mt-36  text-gray-100">Copyright©2025</p>
          </div>

          <div className=' flex gap-10 lg:pl-40 max-sm:flex-col'>
            {/* Legal Texts */}
            <div className='w-max'>
              <h3 className="text-sm text-white font-bold mb-2">TEXTOS LEGALES</h3>
              <ul className="text-gray-200">
                <li><a href="#" className="hover:text-white transition-colors">Aviso Legal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Cookies</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className=" font-bold mb-2">EMPRESA</h3>
              <ul className=" text-gray-200">
                <li><Link href="/blog" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
                <li><Link href="/trabaja-con-nosotros" className="hover:text-white transition-colors">Trabaja con nosotros</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
              </ul>
            </div>

            {/* Products */}
            <div className='w-max'>
              <h3 className="font-bold mb-2 ">PRODUCTOS</h3>
              <ul className="text-gray-200">
                <li><a href="#" className="hover:text-white transition-colors">Morteros monocapa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Morteros cola</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mortero de cal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mortero polivalente para juntas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mortero impreso vertical</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Protector de agua</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mortero de reparación</a></li>
              </ul>
            </div>

          </div>


          <div className='flex gap-16 md:ml-14  max-sm:flex-col'>
            {/* Contact */}
            <div>
              <h3 className="font-bold mb-2">CONTACTO</h3>
              <p className="text-gray-200 mb-6">
                Cno Viejo de Fortuna, 40 Matanzas<br />
                30148, Santomera, Murcia (SPAIN).
              </p>
              <div className="mb-4">
                <p className=" text-gray-200">+34 968 862 467</p>
                <p className=" text-gray-200">+34 663 519 854</p>
                <a href="mailto:grupoestucalia@grupoestucalia.com" className="text-gray-200 hover:text-white transition-colors">
                  grupoestucalia@grupoestucalia.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-2 ">
              <h3 className="font-bold mb-2">SÍGUENOS</h3>
              <Link href="#" className="text-gray-200 flex gap-2 hover:text-white transition-colors">
                <FaLinkedin className="w-6 h-6 rounded-full" />
                <p>Linkedin</p>
              </Link>
              <Link href="#" className="text-gray-200 flex gap-2 hover:text-white transition-colors">
                <FaFacebook className="w-6 h-6" />
                <p>Facebook</p>
              </Link>
              <Link href="#" className="text-gray-200 flex gap-2 hover:text-white transition-colors">
                <FaInstagramSquare className="w-6 h-6 rounded-full" />
                <p>Instagram</p>
              </Link>
              <Link href="#" className="text-gray-200 flex gap-2 hover:text-white transition-colors">
                <FaSquareYoutube className="w-6 h-6 rounded-full " />
                <p>Youtube</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}