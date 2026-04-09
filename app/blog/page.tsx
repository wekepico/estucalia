"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useBlogPage } from "@/api/useBlogPage";
import SeoHead from "@/components/SeoHead";
import { useEffect } from "react";
import HeroSection from "../components/blog/HeroSection";
import NewsGrid from "../components/blog/NewsGrid";

export default function BlogListPage() {
  const { language, setLanguage } = useLanguage();
  const { data, isLoading, isError } = useBlogPage();

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  if (isError)
    return (
      <div className="text-red-500 text-center py-10">
        Error al cargar las noticias
      </div>
    );

  const blogs = data?.blogs ?? [];
  const seo = data?.seo ?? null;
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <SeoHead
        seo={seo}
        url={currentUrl}
        fallbackTitle="Blog | Grupo Estucalia"
        fallbackDescription="Últimas noticias y novedades"
      />
      <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32">
        <HeroSection />
        <NewsGrid blogs={blogs} />
      </main>
    </>
  );
}
