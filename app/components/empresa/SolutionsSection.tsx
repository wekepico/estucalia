'use client';

import React from 'react';
import { Shield } from 'lucide-react';
import MorteroCal from '../../../public/img/mortero-cal.svg'
import MorteroMonocapa from '../../../public/img/mortero-monocapa.svg'
import MorteroImpreso from '../../../public/img/mortero-impreso.svg'
import MorteroPolivalente from '../../../public/img/mortero-juntas.svg'
import MorteroProtector from '../../../public/img/mortero-protector-agua.svg'
import AccesoriosHerramientas from '../../../public/img/accerios-y-herramientas.svg'
import MorteroCola from '../../../public/img/mortero-cola.svg'
import MorteroPiedra from '../../../public/img/mortero-piedra.svg'
import MorteroUnion from '../../../public/img/mortero puente union.svg'
import { useLanguage } from '../../context/LanguageContext';

import Image from 'next/image';

const products = [
  {
    key: 'monocapa',
    icon: <Image
      src={MorteroMonocapa}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto font-[600]"
    />
  },
  {
    key: 'cola',
    icon: <Image
    src={MorteroCola}
    alt="Logo"
    width={180}
    height={100}
    className="h-32 md:h-12 w-auto"
    />
  },
  {
    key: 'cal',
    icon: <Image
    src={MorteroCal}
    alt="Logo"
    width={180}
    height={100}
    className="h-32 md:h-12 w-auto"
    />
  },
  {
    key: 'juntas',
    icon: <Image
      src={MorteroPolivalente}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
  {
    key: 'impreso',
    icon: <Image
      src={MorteroImpreso}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
  {
    key: 'piedra',
    icon: <Image
      src={MorteroPiedra}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
  {
    key: 'protector',
    icon: <Image
      src={MorteroProtector}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
  {
    key: 'union',
    icon: <Image
      src={MorteroUnion}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
  {
    key: 'accesorios',
    icon: <Image
      src={AccesoriosHerramientas}
      alt="Logo"
      width={180}
      height={100}
      className="h-32 md:h-12 w-auto"
    />
  },
];

export default function SolutionsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-40 bg-[#F5ECEB] flex flex-col items-center justify-center ">
      <div className=" mx-auto px-8 max-w-[44rem] max-sm:px-2">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-[600] mb-6">{t('company.solutions.title')}</h2>
          <p className="text-lg max-w-4xl mx-auto">
            {t('company.solutions.description')}
          </p>
        </div>

        <div className="grid md:grid-flow-col  items-center justify-center grid-rows-3 md:grid-rows-5 sm:grid-cols-1 lg:grid-rows-3 gap-y-8 gap-x-[5rem]">
            {products.map((product) => (
              <div key={product.key} 
                className="flex items-center gap-2 cursor-pointer"
                onClick={()=>window.location.href = "/producto/" +t(`company.solutions.products.${product.key}`)}
              >
                <div className=" flex-shrink-0">
                  {product.icon}
                </div>
                <div className='max-w-[110px]'>
                  <h3 className="text-lg  font-[600] leading-[1.1]">{t(`company.solutions.products.${product.key}`).toLocaleUpperCase()}</h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}