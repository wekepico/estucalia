'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RxInstagramLogo } from "react-icons/rx";
import { FaFacebook, FaSquareYoutube, FaYoutube } from "react-icons/fa6";
import { TiSocialLinkedin, TiSocialFacebook } from "react-icons/ti";
import { useLanguage } from '@/app/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

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
            <p className="mt-36 text-gray-100">{t('footer.copyright')}</p>
          </div>

          <div className='flex gap-10 lg:pl-32 max-sm:flex-col'>
            {/* Legal Texts */}
            <div className='w-max'>
              <h3 className="text-sm text-white font-[600] mb-2">{t('footer.legal.title')}</h3>
              <ul className="text-gray-200">
                <li><a href="/aviso-legal" className="hover:text-white transition-colors">{t('footer.legal.legalNotice')}</a></li>
                <li><a href="/politica-privacidad" className="hover:text-white transition-colors">{t('footer.legal.privacyPolicy')}</a></li>
                <li><a href="/politica-cookies" className="hover:text-white transition-colors">{t('footer.legal.cookiePolicy')}</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-[600] mb-2">{t('footer.company.title')}</h3>
              <ul className="text-gray-200">
                <li><Link href="/empresa" className="hover:text-white transition-colors">{t('footer.company.about')}</Link></li>
                <li><Link href="/trabaja-con-nosotros" className="hover:text-white transition-colors">{t('footer.company.careers')}</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">{t('footer.company.blog')}</Link></li>
                <li><Link href="/contacto" className="hover:text-white transition-colors">{t('footer.company.contact')}</Link></li>
              </ul>
            </div>

            {/* Products */}
            <div className='w-max'>
              <h3 className="font-[600] mb-2">{t('footer.products.title')}</h3>
              <ul className="text-gray-200">
                <li><Link href="/producto/singleLayerMortar" className="hover:text-white transition-colors">{t('footer.products.monocapa')}</Link></li>
                <li><Link href="/producto/tileAdhesive" className="hover:text-white transition-colors">{t('footer.products.tileAdhesive')}</Link></li>
                <li><Link href="/producto/limeMortar" className="hover:text-white transition-colors">{t('footer.products.limeMortar')}</Link></li>
                <li><Link href="/producto/groutMortar" className="hover:text-white transition-colors">{t('footer.products.multipurposeMortar')}</Link></li>
                <li><Link href="/producto/stampedMortar" className="hover:text-white transition-colors">{t('footer.products.verticalPrinted')}</Link></li>
                <li><Link href="/producto/waterProtector" className="hover:text-white transition-colors">{t('footer.products.waterProtector')}</Link></li>
                <li><Link href="/producto/bondingBridge" className="hover:text-white transition-colors">{t('footer.products.repairMortar')}</Link></li>
              </ul>
            </div>
          </div>

          <div className='flex gap-16 md:ml-14 max-sm:flex-col'>
            {/* Contact */}
            <div>
              <h3 className="font-[600] mb-2">{t('footer.contact.title')}</h3>
              <p className="text-gray-200 mb-6" dangerouslySetInnerHTML={{ __html: t('footer.contact.address') }}>
              </p>
              <div className="mb-4">
                <a href="tel:+34968862467" className="text-gray-200 hover:text-white transition-colors">+34 968 862 467</a>
                <br />
                <a href="tel:+34663519854" className="text-gray-200 hover:text-white transition-colors">+34 663 519 854</a>
                <br />
                <a href="mailto:grupoestucalia@grupoestucalia.com" className="text-gray-200 hover:text-white transition-colors">
                  grupoestucalia@grupoestucalia.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-start justify-center gap-2">
              <h3 className="font-[600] mb-2">{t('footer.social.title')}</h3>
              <Link target='_blank' href="https://www.linkedin.com/in/grupo-estucalia-182653368" className="text-gray-200 items-center flex gap-2 hover:text-white transition-colors">
                <div className='p-1 mx-auto rounded-full bg-white text-black'>
                  <TiSocialLinkedin className="w-5 h-5 rounded-full" />
                </div>
                <p>Linkedin</p>
              </Link>
              <Link target='_blank' href="https://www.facebook.com/share/162F9HDKtA/?mibextid=wwXIfr" className="text-gray-200 flex items-center gap-2 hover:text-white transition-colors">
                <div className='p-1 mx-auto rounded-full bg-white text-black'>
                  <TiSocialFacebook className="w-5 h-5" />
                </div>
                <p>Facebook</p>
              </Link>
              <Link href="#" className="text-gray-200 flex gap-2 hover:text-white items-center transition-colors">
                <div className='p-1 mx-auto rounded-full bg-white text-black'>
                  <RxInstagramLogo className="w-5 h-5 rounded-full" />
                </div>
                <p>Instagram</p>
              </Link>
              <Link target='_blank' href="https://www.youtube.com/channel/UCyFIm8KQCuF_YQZVN7XM05A" className="text-gray-200 flex gap-2 items-center hover:text-white transition-colors">
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