"use client";

import { useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useBlogPage } from "@/api/useBlogPage";
import HeroSection from "../components/blog/HeroSection";
import NewsGrid from "../components/blog/NewsGrid";

export default function BlogListClient() {
  const { language } = useLanguage();
  const { data, isLoading, isError } = useBlogPage();

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  // Solo bloqueamos el render si NO hay datos del cache prefetched.
  if (isLoading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <span className="ml-3">Cargando noticias...</span>
      </div>
    );
  }

  if (isError && !data) {
    return (
      <div className="text-red-500 text-center py-10">
        Error al cargar las noticias
      </div>
    );
  }

  const blogs = data?.blogs ?? [];

  return (
    <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32">
      <HeroSection />
      <NewsGrid blogs={blogs} />
    </main>
  );
}
