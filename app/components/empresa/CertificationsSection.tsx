'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../../context/LanguageContext';
import { useEmpresa } from '@/api/useEmpresa';
import Logos from "../../../public/img/logos-licencia.png"
import Link from 'next/link';

export default function CertificationsSection() {
  const { t, language } = useLanguage();
  const { data: empresa } = useEmpresa();

  const certsTitle = empresa?.certs.title || t("company.certifications.title");
  const certsText =
    empresa?.certs.text || t("company.certifications.description");

  const ctaText = empresa?.certs.cta_text || t("company.certifications.button");
  const ctaUrl = empresa?.certs.cta_url || "/profesionales/certificaciones";



  return (
    <section className="py-32 bg-[#F5F5F5] px-5" style={{ backgroundColor: "rgba(222, 221, 221)" }}>
      <div className="  mx-auto">
        <div className="max-w-4xl max-sm:px-2 mx-auto text-center">
          <div dangerouslySetInnerHTML={{ __html: certsTitle }} />

          <div dangerouslySetInnerHTML={{ __html: certsText }} />

          {/* Certificates */}
          <div className="flex justify-center items-center gap-12 mb-16">
            <div className="w-[26rem] h-[5.5rem] relative">
              <Image
                src={Logos}
                alt={t('company.certifications.imageAlt')}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end items-center pr-11">
          <Link href="/profesionales/certificaciones">
            <Button variant="outline" className="border-gray-500 py-4 bg-transparent pr-1   md:py-6 border-solid cursor-pointer rounded-none">
              <span>{t('company.certifications.button')}</span>
              <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}