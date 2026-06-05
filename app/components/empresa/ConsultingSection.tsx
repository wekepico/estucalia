'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../../context/LanguageContext';
import { useEmpresa } from '@/api/useEmpresa';
import Link from 'next/link';

export default function ConsultingSection() {
  const { t, language } = useLanguage();
  const { data: empresa } = useEmpresa();

  const consultingTitle =
    empresa?.consulting.title || t("company.consulting.title");
  const consultingText =
    empresa?.consulting.text || t("company.consulting.description");
  const consultingCTA =
    empresa?.consulting.cta_text || t("company.consulting.button");

  const consultingBgImage =
    empresa?.consulting.bg_image || "/img/asesoramiento.jpg";

  const consultingBgImageAlt =
    empresa?.consulting.bg_image_alt || t("company.consulting.title");

  const consultingBgImageTitle =
    empresa?.consulting.bg_image_title || undefined;

  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
        style={{
          backgroundImage: `url(${consultingBgImage})`,
        }}
        role="img"
        aria-label={consultingBgImageAlt}
        title={consultingBgImageTitle}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div dangerouslySetInnerHTML={{ __html: consultingTitle }} />

          <div dangerouslySetInnerHTML={{ __html: consultingText }} />

          <Link href={empresa?.consulting.cta_url || "/contacto"}>
            <Button
              variant="outline"
              className="border-gray-200 pl-5 mt-10  pr-0  md:py-6 bg-transparent hover:text-black border-solid rounded-none"
            >
              <span dangerouslySetInnerHTML={{ __html: consultingCTA }} />
              <svg
                className="w-10 h-10 md:w-12 md:h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}