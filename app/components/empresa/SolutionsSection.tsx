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
import { useEmpresa } from '@/api/useEmpresa';

import Image from 'next/image';

const products = [
  {
    id:"singleLayerMortar",
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
    id:"tileAdhesive",
    key: 'cola',
    icon: <Image
    src={MorteroCola}
    alt="Logo"
    width={180}
    height={100}
    className="h-32 md:h-12 w-auto"
    style={{ width: 'auto' }}
    />
  },
  {
    id:"limeMortar",
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
    id:"groutMortar",
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
    id:"stampedMortar",
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
    id:"stoneMortar",
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
    id:"waterProtector",
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
    id:"bondingBridge",
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
    id:"accessoriesAndTools",
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

const splitText = (texto:string) => {
  const words = texto.toLocaleUpperCase().split(' ');
  const middle = Math.ceil(words.length / 2);
  return (
    <>
      {words.slice(0, middle).join(' ')}<br/>
      {words.slice(middle).join(' ')}
    </>
  );
};

export default function SolutionsSection() {
  const { t, language } = useLanguage();
  const { data: empresaData } = useEmpresa();

  // Obtener título Solutions del API según idioma
  const getSolutionsTitle = () => {
    if (!empresaData) return t('company.solutions.title');

    switch (language) {
      case 'es':
        return empresaData.solutions_title_es || t('company.solutions.title');
      case 'en':
        return empresaData.solutions_title_en || t('company.solutions.title');
      case 'fr':
        return empresaData.solutions_title_fr || t('company.solutions.title');
      default:
        return empresaData.solutions_title_es || t('company.solutions.title');
    }
  };

  // Obtener intro Solutions del API según idioma
  const getSolutionsIntro = () => {
    if (!empresaData) return t('company.solutions.description');

    switch (language) {
      case 'es':
        return empresaData.solutions_intro_es || t('company.solutions.description');
      case 'en':
        return empresaData.solutions_intro_en || t('company.solutions.description');
      case 'fr':
        return empresaData.solutions_intro_fr || t('company.solutions.description');
      default:
        return empresaData.solutions_intro_es || t('company.solutions.description');
    }
  };

  const solutionsTitle = getSolutionsTitle();
  const solutionsIntro = getSolutionsIntro();

  return (
    <section className="py-40 bg-[#F5ECEB] flex flex-col items-center justify-center ">
      <div className=" mx-auto px-8 max-sm:px-2">
        <div className="text-center mb-16">
          <div dangerouslySetInnerHTML={{ __html: solutionsTitle }} />
          <div dangerouslySetInnerHTML={{ __html: solutionsIntro }} />
        </div>

        <div className="grid  items-center justify-center grid-row-3 grid-cols-3  gap-y-8 gap-x-[4rem]">
            {products.map((product, index) => (
              <div key={index} 
                className="flex items-center gap-2 cursor-pointer"
                onClick={()=>window.location.href = "/producto/" + product.id}
              >
                <div className="flex-shrink-0">
                  {product.icon}
                </div>
                <div >
                  <h3 className='text-lg font-[600] leading-[1.05]'>{splitText(t(`company.solutions.products.${product.key}`))}</h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}