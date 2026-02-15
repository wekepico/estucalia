"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../../context/LanguageContext";
import { useEmpresa } from "@/api/useEmpresa";
import Link from "next/link";

export default function CertificationsSection() {
  const { t } = useLanguage();
  const { data: empresa } = useEmpresa();

  const certsTitle = empresa?.certs?.title || t("company.certifications.title");
  const certsText =
    empresa?.certs?.text || t("company.certifications.description");

  const ctaText =
    empresa?.certs?.cta_text || t("company.certifications.button");
  const ctaUrl = empresa?.certs?.cta_url || "/profesionales/certificaciones";

  // ✅ lo importante:
  const logos = empresa?.certs?.logos ?? [];

  return (
    <section
      className="py-32 bg-[#F5F5F5] px-5"
      style={{ backgroundColor: "rgba(222, 221, 221)" }}
    >
      <div className="mx-auto">
        <div className="max-w-4xl max-sm:px-2 mx-auto text-center">
          <div dangerouslySetInnerHTML={{ __html: certsTitle }} />
          <div dangerouslySetInnerHTML={{ __html: certsText }} />

          {/* ✅ Certificates Logos desde backend */}
          {Array.isArray(logos) && logos.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-10 mb-16 mt-10">
              {logos.map((l: any, idx: number) => {
                const src = l?.logo_url;
                if (!src) return null;

                const alt = l?.alt || l?.title || "Certification logo";

                return (
                  <div
                    key={src + idx}
                    className="relative w-[240px] h-[100px] md:w-[280px] md:h-[90px]"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-contain"
                      // si te da error por dominios en dev, abajo te digo cómo arreglarlo “bien”
                      unoptimized={src.includes("localhost")}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex w-full justify-end items-center pr-11">
          <Link href={ctaUrl}>
            <Button
              variant="outline"
              className="border-gray-500 py-4 bg-transparent pr-1 md:py-6 border-solid cursor-pointer rounded-none"
            >
              <span>{ctaText}</span>
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
