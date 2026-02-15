"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useRef } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { data, Aplication } from "../../data/aplicaciones";
import AplicationPage from "../../components/aplicaciones/AplicationsPage";
import { Loader } from "lucide-react";
import { useApplicationBySlug, useApplications } from "@/api/useApplications";
import {
  getLocalizedField,
  getLocalizedSlug,
  getImageUrl,
} from "@/lib/i18nHelpers";
import type { Application } from "@/services/applicationsService";

export default function AplicationClient() {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [applicationSlug, setApplicationSlug] = useState<string>("");
  const previousLanguageRef = useRef<typeof language | null>(null);
  const isFirstRenderRef = useRef(true);

  function slugForLang(app: Application, lang: "es" | "en" | "fr") {
    if (lang === "en") return app.slug_en || app.slug;
    if (lang === "fr") return app.slug_fr || app.slug;
    return app.slug; // ✅ ES = slug
  }

  // Obtener el slug de la URL
  useEffect(() => {
    setMounted(true);
    const id = pathname.split("/").pop();
    setApplicationSlug(id || "");
  }, [pathname]);

  // Consumir datos del backend
  const {
    data: backendData,
    isLoading,
    error,
  } = useApplicationBySlug(applicationSlug, mounted && !!applicationSlug);

  // Obtener todas las aplicaciones para encontrar la que coincide con el slug actual
  const { data: allApplicationsData } = useApplications();

  // Convertir datos del backend al formato esperado por el componente
  const applicationFromBackend = useMemo(() => {
    if (!backendData?.data) return null;

    const app: any = backendData.data;

    // Mapear las categorías del backend a productos
    const products = (app.categories || [])
      .slice()
      .sort((a: any, b: any) => (a?.pivot?.order ?? 0) - (b?.pivot?.order ?? 0))
      .map((category: any) => {
        const categoryName =
          getLocalizedField(category, "name", language as "es" | "en" | "fr") ||
          category.name ||
          "";

        return {
          id:
            getLocalizedSlug(category, language as "es" | "en" | "fr") ||
            category.slug,
          name: categoryName,
          icon: getImageUrl(category.image) || "/img/default-icon.svg",
          // ✅ usa image como icono
        };
      });
    return {
      id: app.slug,
      aplication:
        getLocalizedField(app, "name", language as "es" | "en" | "fr") || "",
      descripcion:
        getLocalizedField(app, "description", language as "es" | "en" | "fr") ||
        "",
      img: getImageUrl(app.image_url) || "/img/default.jpg",
      icon: getImageUrl(app.image_url) || "/img/default.jpg",
      // Campos de alt y title de imagen del backend (preparado para cuando el backend envíe datos)
      image_alt:
        app.image_alt_es || app.image_alt_en || app.image_alt_fr || null,
      image_title:
        app.image_title_es || app.image_title_en || app.image_title_fr || null,
      products: products,
    };
  }, [backendData, language]);

  // Fallback a datos locales si no hay datos del backend
  const localApplication = useMemo(() => {
    return data.find((a) => a.id === applicationSlug) || null;
  }, [applicationSlug]);

  // Determinar qué datos usar: backend si están disponibles, sino locales
  const application = applicationFromBackend || localApplication;

  // Detectar cambio de idioma y redirigir al slug correspondiente
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      previousLanguageRef.current = language;
      return;
    }

    // solo si cambió el idioma y ya no está cargando
    if (!mounted || previousLanguageRef.current === language || isLoading)
      return;

    let matchingApplication: Application | null = null;

    // Buscar en el listado completo
    if (allApplicationsData?.data) {
      matchingApplication =
        allApplicationsData.data.find(
          (app: Application) =>
            app.slug === applicationSlug ||
            app.slug_en === applicationSlug ||
            app.slug_fr === applicationSlug,
          // ✅ nota: ya NO hace falta slug_es aquí
        ) || null;
    }

    // fallback: usar el detalle actual
    if (!matchingApplication && backendData?.data) {
      matchingApplication = backendData.data;
    }

    if (matchingApplication) {
      const newSlug = slugForLang(matchingApplication, language as any);

      if (newSlug && newSlug !== applicationSlug) {
        router.replace(`/aplicaciones/${encodeURIComponent(newSlug)}`);
        return;
      }
    }

    previousLanguageRef.current = language;
  }, [
    language,
    mounted,
    isLoading,
    applicationSlug,
    allApplicationsData,
    backendData,
    router,
  ]);

  if (!mounted || isLoading) {
    return (
      <main className="min-h-screen gap-4 flex justify-center items-center bg-white md:pt-28 pt-16 lg:pt-32">
        <Loader width={50} height={50} /> Loading...
      </main>
    );
  }

  if (!application) {
    return (
      <div className="pt-32 px-5">
        <h1 className="text-2xl font-bold">{t("categoryNotFound")}</h1>
      </div>
    );
  }

  return (
    <AplicationPage
      aplication={application}
      backendData={applicationFromBackend}
    />
  );
}
