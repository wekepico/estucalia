'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RxInstagramLogo } from "react-icons/rx";
import { FaFacebook, FaSquareYoutube, FaYoutube } from "react-icons/fa6";

import { TiSocialLinkedin,TiSocialFacebook } from "react-icons/ti";

export default function Footer() {
  return (
    <footer className="bg-black text-sm mx-auto w-full text-white py-20">
      <div className="max-w-[240rem] mx-auto md:px-15 sm:px-10 px-5 lg:px-20 ">
        <div className="flex relative max-lg:flex-col flex-wrap items-center max-sm:items-start w-full max-sm:text-sm justify-between gap-y-12">
          {/* Logo Column */}
          <div className="flex">
            <Image
              src="/img/logo.png"
              alt="Grupo Estucalia"
              width={200}
              height={100}
              className="mb-6 -ml-2 h-14 w-auto absolute"
            />
            <p className="mt-36 text-gray-100">Copyright©2025</p>
          </div>

          <div className=' flex gap-10 lg:pl-32 max-sm:flex-col'>
            {/* Legal Texts */}
            <div className='w-max'>
              <h3 className="text-sm text-white font-[600] mb-2">TEXTOS LEGALES</h3>
              <ul className="text-gray-200">
                <li><a href="/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</a></li>
                <li><a href="/politica-privacidad" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                <li><a href="/politica-cookies" className="hover:text-white transition-colors">Política de Cookies</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className=" font-[600] mb-2">EMPRESA</h3>
              <ul className=" text-gray-200">
                <li><Link href="/empresa" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
                <li><Link href="/trabaja-con-nosotros" className="hover:text-white transition-colors">Trabaja con nosotros</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
              </ul>
            </div>

            {/* Products */}
            <div className='w-max'>
              <h3 className="font-[600] mb-2 ">PRODUCTOS</h3>
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
              <h3 className="font-[600] mb-2">CONTACTO</h3>
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
            <div className="flex flex-col items-start justify-center gap-2 ">
              <h3 className="font-[600] mb-2">SÍGUENOS</h3>
              <Link href="#" className="text-gray-200 items-center flex gap-2 hover:text-white transition-colors">
                <div className='p-1 mx-auto rounded-full bg-white text-black'>
                  <TiSocialLinkedin className="w-5 h-5 rounded-full" />
                </div>
                <p>Linkedin</p>
              </Link>
              <Link href="#" className="text-gray-200 flex items-center gap-2 hover:text-white transition-colors">
              <div className='p-1 mx-auto rounded-full bg-white text-black'>
                <TiSocialFacebook className="w-5 h-5" />
              </div>
                <p>Facebook</p>
              </Link>
              <Link href="#"  className="text-gray-200 flex gap-2 hover:text-white items-center transition-colors">
                <div className='p-1 mx-auto rounded-full bg-white text-black'>
                  <RxInstagramLogo className="w-5 h-5 rounded-full" />
                </div>
                <p>Instagram</p>
              </Link>
              <Link href="#" className="text-gray-200 flex gap-2 items-center hover:text-white transition-colors">
                <div className='p-1 mx-auto rounded-full bg-white text-black'>
                  <FaYoutube className="w-5 h-5 rounded-full bg-white" />
                </div>
                <p>Youtube</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}