"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/app/context/LanguageContext";
import { useHome } from "@/api/useHome";

export default function ProjectHelpSection() {
  const { t, language } = useLanguage();
  const { data: home } = useHome();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const title = home?.help?.title ?? t("contact.projectHelp.title");
  const description = home?.help?.text ?? t("contact.projectHelp.description");
  const buttonText = home?.help?.button ?? t("contact.projectHelp.button");
  const buttonUrl = home?.help?.url ?? "/contacto";

  const imageUrl = home?.help?.image?.url || "/img/helper.jpg";
  const imageAlt = home?.help?.image?.alt ?? t("contact.projectHelp.imageAlt");
  const imageTitle = home?.help?.image?.title ?? undefined;

  return (
    <section className="relative min-h-[520px] flex items-center">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
        role="img"
        aria-label={imageAlt}
        title={imageTitle}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative w-full px-5 sm:px-10 lg:px-20">
        <div className="w-full max-w-[520px] bg-white/75 backdrop-blur-sm rounded-none">
          <div className="p-10 sm:p-12">
            {/* Título */}
            <div
              className="text-[44px] leading-[1.05] font-semibold text-[#111] max-w-[420px]"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            {/* Descripción */}
            <div
              className="mt-6 text-[18px] leading-[1.8] text-[#111] max-w-[420px]"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {/* ✅ Botón alineado a la derecha como en la captura */}
            <div className="mt-10 flex justify-end">
              <Button
                variant="outline"
                onClick={() => (window.location.href = buttonUrl)}
                className="relative rounded-none border border-[#6b7280] bg-transparent px-8 pr-14 h-12 text-[14px] font-medium text-[#111] hover:bg-white/30"
              >
                <span dangerouslySetInnerHTML={{ __html: buttonText }} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
