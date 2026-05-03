"use client";

import { useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useWorkWithUsPage } from "@/api/useWorkWithUsPage";

import HeroSection from "../components/trabaja-con-nosotros/HeroSection";
import ApplicationForm from "../components/trabaja-con-nosotros/ApplicationForm";
import BottomSection from "../components/trabaja-con-nosotros/BottomSection";

export default function TrabajaConNosotrosClient() {
  const { language } = useLanguage();
  const { data, isLoading, isError } = useWorkWithUsPage();

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  if (isLoading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Cargando…</div>
      </div>
    );
  }

  if (isError && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error cargando la página
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <ApplicationForm />
      <BottomSection />
    </main>
  );
}
