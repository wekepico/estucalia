'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';
import { useEmpresa } from '@/api/useEmpresa';

import Creatividad from '../../../public/img/creatividad-img.png'


export default function AboutSection() {
  const { t, language } = useLanguage();
const { data: empresa } = useEmpresa();

const aboutTitle = empresa?.about.title || t("company.about.title");
const aboutText = empresa?.about.text || t("company.about.description");
const missionTitle = empresa?.mission.title || t("company.about.mission.title");
const missionText =
  empresa?.mission.text || t("company.about.mission.description");


  

  return (
    <div>
      {/* Top Section */}
      <section className="relative md:px-15 sm:px-10 px-5 lg:px-20 bg-white">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 max-sm:gap-y-8 items-center">
            {/* Text Content */}
            <div className="">
              <div dangerouslySetInnerHTML={{ __html: aboutTitle }} />
              <div dangerouslySetInnerHTML={{ __html: aboutText }} />
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="relative  aspect-square">
                <Image
                  src={empresa?.about.illustration || Creatividad}
                  alt={
                    empresa?.about.illustration_alt ||
                    t("company.about.imageAlt")
                  }
                  title={empresa?.about.illustration_title || undefined}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-36 px-5 bg-[#f1e9e9]">
        <div className="mx-auto  max-sm:px-0 text-center">
          <div dangerouslySetInnerHTML={{ __html: missionTitle }} />
          <div dangerouslySetInnerHTML={{ __html: missionText }} />
        </div>
      </section>
    </div>
  );
}