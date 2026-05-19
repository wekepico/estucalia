// app/categories/[slug]/CategoryClient.tsx
"use client";

import ProductCategoryPage from "@/app/components/productos/ProductoPage";
import { useLanguage } from "@/app/context/LanguageContext";
import { useCategoriesPage } from "@/api/useCategoriesPage"; // 👈 NUEVO
import SeoHead from "@/components/SeoHead"; // 👈 NUEVO
import { Loader } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useRef } from "react";
import data from "@/app/components/productos/components/data-es.json";
import data2 from "@/app/components/productos/components/data-en.json";
import data3 from "@/app/components/productos/components/data-fr.json";
import {
  useCategoryBySlug,
  useCategoryProducts,
  useCategories,
  useCategoryApplications,
} from "@/api/useCategories";
import {
  getLocalizedField,
  getLocalizedSlug,
  getImageUrl,
} from "@/lib/i18nHelpers";
import type { Category } from "@/services/categoriesService";
import { htmlToText } from "@/lib/utils";

export default function CategoryClient() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const previousLanguageRef = useRef<typeof language | null>(null);
  const isFirstRenderRef = useRef(true);

  // 👇 Obtener SEO general para categorías (mismo para todas)
  const { data: seoData } = useCategoriesPage();

  // Slug calculado sincrónicamente desde el pathname. Necesario para que en
  // SSR la queryKey coincida con la que prefetcheamos en el server component
  // y los hooks devuelvan los datos del cache desde el primer render
  // (sin "Loading..." en el HTML que recibe Google).
  const categorySlug = useMemo(() => {
    const slugEncoded = pathname.split("/").pop();
    return decodeURIComponent(slugEncoded || "");
  }, [pathname]);

  // mounted se usa solo para diferir efectos client-side (cambio de idioma).
  useEffect(() => {
    setMounted(true);
  }, []);

  // Consumir datos del backend. Sin `mounted &&` para que en SSR los hooks
  // ya lean el cache prefetched por el server component.
  const {
    data: backendCategoryData,
    isLoading,
    error,
  } = useCategoryBySlug(categorySlug, !!categorySlug);

  // Obtener todas las categorías para encontrar la que coincide con el slug actual
  const { data: allCategoriesData } = useCategories();

  // Obtener productos de la categoría del backend
  const { data: backendProductsData } = useCategoryProducts(
    categorySlug,
    !!categorySlug,
  );

  // Obtener aplicaciones de la categoría del backend
  const { data: backendApplicationsData } = useCategoryApplications(
    categorySlug,
    !!categorySlug,
  );

  // Convertir datos del backend al formato esperado
  const categoryFromBackend = useMemo(() => {
    if (!backendCategoryData?.data) return null;

    const cat: Category = backendCategoryData.data;

    const nombre =
      getLocalizedField(cat, "name", language as "es" | "en" | "fr") ||
      (language === "es"
        ? cat.name_es
        : language === "en"
          ? cat.name_en
          : cat.name_fr) ||
      "";

    const descripcion =
      getLocalizedField(cat, "description", language as "es" | "en" | "fr") ||
      (language === "es"
        ? cat.description_es
        : language === "en"
          ? cat.description_en
          : cat.description_fr) ||
      "";

    const descripcionCorta =
      getLocalizedField(
        cat,
        "short_description",
        language as "es" | "en" | "fr",
      ) ||
      (language === "es"
        ? cat.short_description_es
        : language === "en"
          ? cat.short_description_en
          : cat.short_description_fr) ||
      "";

    const getLocalizedValue = (
      value:
        | { es?: string; en?: string; fr?: string }
        | string
        | null
        | undefined,
      lang: "es" | "en" | "fr",
    ): string | null => {
      if (!value) return null;
      if (typeof value === "string") return value;
      return value[lang] || null;
    };

    const productos =
      backendProductsData?.data?.map((prod) => {
        const prodNombre =
          getLocalizedField(prod, "name", language as "es" | "en" | "fr") ||
          prod[`name_${language}`] ||
          (language === "es"
            ? prod.name_es
            : language === "en"
              ? prod.name_en
              : prod.name_fr) ||
          prod.name ||
          "";
        const prodDescripcion =
          getLocalizedField(
            prod,
            "description",
            language as "es" | "en" | "fr",
          ) ||
          prod[`description_${language}`] ||
          (language === "es"
            ? prod.description_es
            : language === "en"
              ? prod.description_en
              : prod.description_fr) ||
          "";

        return {
          id: prod.slug,
          nombre: prodNombre,
          descripcion: prodDescripcion,
          imagen:
            getImageUrl(prod.image_url || prod.image) || "/img/default.jpg",
          image_alt_es: getLocalizedValue(prod.image_alt, "es"),
          image_alt_en: getLocalizedValue(prod.image_alt, "en"),
          image_alt_fr: getLocalizedValue(prod.image_alt, "fr"),
          image_title_es: getLocalizedValue(prod.image_title, "es"),
          image_title_en: getLocalizedValue(prod.image_title, "en"),
          image_title_fr: getLocalizedValue(prod.image_title, "fr"),
          subtitulo: prod.subtitle || null,
          composicion:
            getLocalizedField(
              prod,
              "composition",
              language as "es" | "en" | "fr",
            ) || null,
          caracteristicas:
            getLocalizedField(prod, "features", language as "es" | "en" | "fr")
              ?.split("\n")
              .filter((f: string) => f.trim()) || null,
          // recommendations/carriers/relevant_info son RichEditor → HTML.
          // Se pasan como string crudo para renderizar con dangerouslySetInnerHTML.
          recomendaciones:
            getLocalizedField(
              prod,
              "recommendations",
              language as "es" | "en" | "fr",
            ) || null,
          precauciones:
            getLocalizedField(
              prod,
              "carriers",
              language as "es" | "en" | "fr",
            ) || null,
          informacion_relevante:
            getLocalizedField(
              prod,
              "relevant_info",
              language as "es" | "en" | "fr",
            ) || null,
          informacion_general: null,
          aplicacion: null,
          documentacion:
            prod.documents?.map((doc: any) => ({
              nombre: doc.name || "",
              accion: t("common.download") || "Descargar",
              enlace: doc.file_url || doc.file_path || "",
            })) || [],
        };
      }) || [];

    let aplicacionesSource: any[] = [];
    if (backendApplicationsData?.data) {
      if (Array.isArray((backendApplicationsData.data as any).applications)) {
        aplicacionesSource = (backendApplicationsData.data as any).applications;
      } else if (Array.isArray(backendApplicationsData.data)) {
        aplicacionesSource = backendApplicationsData.data as any[];
      }
    } else if (cat.applications) {
      aplicacionesSource = Array.isArray(cat.applications)
        ? cat.applications
        : [];
    }

    const aplicaciones = aplicacionesSource.map((app: any) => {
      const localizedName = getLocalizedField(
        app,
        "name",
        language as "es" | "en" | "fr",
      );
      if (localizedName) return htmlToText(localizedName);
      const directLocalized =
        app[`name_${language}`] || app[`title_${language}`];
      if (directLocalized) return htmlToText(directLocalized);
      return htmlToText(app.name || app.title || "");
    });

    const acabados =
      cat.finishes?.map((finish: any) => {
        const localizedName = getLocalizedField(
          finish,
          "name",
          language as "es" | "en" | "fr",
        );
        const finishName =
          localizedName || finish[`name_${language}`] || finish.name || "";
        return {
          nombre: htmlToText(finishName),
          imagen:
            getImageUrl(finish.image_url || finish.image) || "/img/default.jpg",
        };
      }) || [];

    return {
      id: cat.slug,
      nombre: nombre,
      descripcion: descripcion,
      descripcionCorta: descripcionCorta,
      imagen: getImageUrl(cat.image_url) || "/img/default.jpg",
      productos: productos,
      aplicaciones: aplicaciones,
      acabados: acabados,
      seo: backendCategoryData.data.seo || null,
    };
  }, [
    backendCategoryData,
    backendProductsData,
    backendApplicationsData,
    language,
    t,
  ]);

  // Fallback a datos locales según el idioma
  const localCategory = useMemo(() => {
    const currentData =
      language === "es" ? data : language === "en" ? data2 : data3;
    return (
      currentData.categorias.find(
        (cat: any) => cat.id.toLowerCase() === categorySlug.toLowerCase(),
      ) || null
    );
  }, [language, categorySlug]);

  // Determinar qué datos usar: backend si están disponibles, sino locales
  const foundCategory = categoryFromBackend || localCategory;

  const USE_HARDCODED_APPLICATIONS = !categoryFromBackend;
  const USE_HARDCODED_FINISHES = !categoryFromBackend;

  const HARDCODED_APPS_BY_SLUG: Record<string, string[]> = {
    "mortero-de-cal": [
      "Revestimientos",
      "Revocos y enlucidos",
      "Aislamiento térmico",
      "Impermeabilización",
      "Deshumidificación / hidrofugante",
    ],
  };

  const HARDCODED_FINISHES_BY_SLUG: Record<
    string,
    { nombre: string; imagen: string }[]
  > = {
    "mortero-de-cal": [
      {
        nombre: "Abujardado / raspado",
        imagen: "/img/acabados/raspado_abujardado.jpg",
      },
      {
        nombre: "Lavado / fratasado",
        imagen: "/img/acabados/lavado_fratasado.jpg",
      },
      { nombre: "Impreso", imagen: "/img/acabados/impreso.jpg" },
      { nombre: "Liso", imagen: "/img/acabados/liso.jpg" },
    ],
  };

  const hardcodedApps =
    (localCategory?.aplicaciones as string[] | undefined) ||
    HARDCODED_APPS_BY_SLUG[categorySlug] ||
    HARDCODED_APPS_BY_SLUG[
      foundCategory?.id || (foundCategory as any)?.slug || ""
    ];

  const hardcodedFinishes =
    (localCategory?.acabados as
      | { nombre: string; imagen: string }[]
      | undefined) ||
    HARDCODED_FINISHES_BY_SLUG[categorySlug] ||
    HARDCODED_FINISHES_BY_SLUG[
      foundCategory?.id || (foundCategory as any)?.slug || ""
    ];

  let finalCategory: any = foundCategory;
  if (USE_HARDCODED_APPLICATIONS && hardcodedApps && finalCategory) {
    finalCategory = { ...finalCategory, aplicaciones: hardcodedApps };
  }
  if (USE_HARDCODED_FINISHES && hardcodedFinishes && finalCategory) {
    finalCategory = { ...finalCategory, acabados: hardcodedFinishes };
  }

  // Detectar cambio de idioma y redirigir al slug correspondiente
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      previousLanguageRef.current = language;
      return;
    }

    if (mounted && previousLanguageRef.current !== language && !isLoading) {
      let matchingCategory: Category | null = null;

      if (allCategoriesData?.data) {
        matchingCategory =
          allCategoriesData.data.find(
            (cat: Category) =>
              cat.slug === categorySlug ||
              cat.slug_es === categorySlug ||
              cat.slug_en === categorySlug ||
              cat.slug_fr === categorySlug,
          ) || null;
      }

      if (!matchingCategory && backendCategoryData?.data) {
        matchingCategory = backendCategoryData.data;
      }

      if (matchingCategory) {
        let newSlug: string | null = null;

        if (language === "es" && matchingCategory.slug_es) {
          newSlug = matchingCategory.slug_es;
        } else if (language === "en" && matchingCategory.slug_en) {
          newSlug = matchingCategory.slug_en;
        } else if (language === "fr" && matchingCategory.slug_fr) {
          newSlug = matchingCategory.slug_fr;
        }

        if (!newSlug) {
          const isCurrentSlugLocalized =
            categorySlug !== matchingCategory.slug &&
            (categorySlug === matchingCategory.slug_en ||
              categorySlug === matchingCategory.slug_fr ||
              categorySlug === matchingCategory.slug_es);

          if (isCurrentSlugLocalized) {
            newSlug = matchingCategory.slug;
          } else {
            newSlug = categorySlug;
          }
        }

        if (newSlug && newSlug !== categorySlug) {
          router.replace(`/categories/${encodeURIComponent(newSlug)}`);
          return;
        }
      }
    } else if (
      mounted &&
      previousLanguageRef.current !== language &&
      !isLoading &&
      localCategory
    ) {
      const currentData =
        language === "es" ? data : language === "en" ? data2 : data3;
      const categoryInNewLanguage = currentData.categorias.find((cat: any) => {
        return (
          cat.id.toLowerCase() === categorySlug.toLowerCase() ||
          cat.id.toLowerCase() === localCategory.id.toLowerCase()
        );
      });
      if (categoryInNewLanguage && categoryInNewLanguage.id !== categorySlug) {
        router.replace(
          `/categories/${encodeURIComponent(categoryInNewLanguage.id)}`,
        );
        return;
      }
    }

    previousLanguageRef.current = language;
  }, [
    language,
    mounted,
    backendCategoryData,
    allCategoriesData,
    localCategory,
    categorySlug,
    router,
    isLoading,
  ]);

  const finalSeo = categoryFromBackend?.seo || seoData?.seo;

  // Después de obtener backendCategoryData
useEffect(() => {
    if (backendCategoryData) {
        console.log('🔍 backendCategoryData.data.seo:', backendCategoryData.data?.seo);
    }
}, [backendCategoryData]);

// Después de categoryFromBackend
useEffect(() => {
    if (categoryFromBackend) {
        console.log('🔍 categoryFromBackend.seo:', categoryFromBackend.seo);
    }
}, [categoryFromBackend]);

// Para finalSeo
useEffect(() => {
    console.log('🔍 finalSeo:', finalSeo);
}, [finalSeo]);
  
  // Solo mostramos el loader si REALMENTE no tenemos nada que pintar.
  // Cuando llegamos por SSR con datos prefetcheados, finalCategory ya existe
  // y renderizamos el HTML completo desde el primer pintado (clave para SEO).
  if (isLoading && !finalCategory) {
    return (
      <main className="min-h-screen gap-4 flex justify-center items-center bg-white md:pt-28 pt-16 lg:pt-32">
        <Loader width={50} height={50} /> Loading...
      </main>
    );
  }

  if (!finalCategory) {
    return (
      <div className="pt-32 px-5">
        <h1 className="text-2xl font-bold">{t("categoryNotFound")}</h1>
      </div>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      {/* 👇 SEO DINÁMICO - MISMO SEO PARA TODAS LAS CATEGORÍAS */}
      <SeoHead
        seo={finalSeo || null}
        url={currentUrl}
        fallbackTitle="Grupo Estucalia | Productos"
        fallbackDescription="Descubre nuestra amplia gama de productos: morteros, revestimientos, solados y más soluciones constructivas de alta calidad."
      />

      <ProductCategoryPage
        category={finalCategory}
        backendData={categoryFromBackend}
      />
    </>
  );
}
