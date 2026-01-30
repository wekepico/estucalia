"use client";
import ProductCategoryPage from "@/app/components/productos/ProductoPage";
import { useLanguage } from "@/app/context/LanguageContext";
import { Loader } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useRef } from "react";
import data from "@/app/components/productos/components/data-es.json";
import data2 from "@/app/components/productos/components/data-en.json";
import data3 from "@/app/components/productos/components/data-fr.json";
import { useCategoryBySlug, useCategoryProducts, useCategories, useCategoryApplications } from '@/api/useCategories';
import { getLocalizedField, getLocalizedSlug, getImageUrl } from '@/lib/i18nHelpers';
import type { Category } from '@/services/categoriesService';
import { htmlToText } from "@/lib/utils";

export default function CategoryClient() {
    const pathname = usePathname();
    const router = useRouter();
    const { t, language } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [categorySlug, setCategorySlug] = useState<string>("");
    const previousLanguageRef = useRef<typeof language | null>(null);
    const isFirstRenderRef = useRef(true);

    // Obtenemos el slug de la categoría de la URL
    useEffect(() => {
        setMounted(true);
        const slugEncoded = pathname.split("/").pop();
        const categorySlugValue = decodeURIComponent(slugEncoded || "");
        setCategorySlug(categorySlugValue);
    }, [pathname]);

    // Consumir datos del backend
    const { data: backendCategoryData, isLoading, error } = useCategoryBySlug(
        categorySlug,
        mounted && !!categorySlug
    );

    // Obtener todas las categorías para encontrar la que coincide con el slug actual
    // (necesario porque el backend no devuelve slugs localizados al buscar por slug)
    const { data: allCategoriesData } = useCategories();

    // Obtener productos de la categoría del backend
    const { data: backendProductsData } = useCategoryProducts(
        categorySlug,
        mounted && !!categorySlug && !!backendCategoryData
    );

    // Obtener aplicaciones de la categoría del backend (para tener traducciones completas)
    const { data: backendApplicationsData } = useCategoryApplications(
        categorySlug,
        mounted && !!categorySlug && !!backendCategoryData
    );

    // Convertir datos del backend al formato esperado
    const categoryFromBackend = useMemo(() => {
        if (!backendCategoryData?.data) return null;

        const cat: Category = backendCategoryData.data;

        // Obtener nombre localizado o fallback
        const nombre = getLocalizedField(cat, 'name', language as 'es' | 'en' | 'fr') || 
                      (language === 'es' ? cat.name_es : language === 'en' ? cat.name_en : cat.name_fr) || 
                      '';
        
        // Obtener descripción localizada
        const descripcion = getLocalizedField(cat, 'description', language as 'es' | 'en' | 'fr') || 
                           (language === 'es' ? cat.description_es : language === 'en' ? cat.description_en : cat.description_fr) || 
                           '';
        
        // Obtener descripción corta localizada
        const descripcionCorta = getLocalizedField(cat, 'short_description', language as 'es' | 'en' | 'fr') || 
                                (language === 'es' ? cat.short_description_es : language === 'en' ? cat.short_description_en : cat.short_description_fr) || 
                                '';

        // Helper para extraer valores localizados de objetos o strings
        const getLocalizedValue = (
            value: { es?: string; en?: string; fr?: string } | string | null | undefined,
            lang: 'es' | 'en' | 'fr'
        ): string | null => {
            if (!value) return null;
            if (typeof value === 'string') return value;
            return value[lang] || null;
        };

        // Mapear productos - usar backendProductsData si está disponible
        const productos = backendProductsData?.data?.map(prod => {
            // Priorizar campos localizados explícitos
            const prodNombre = getLocalizedField(prod, 'name', language as 'es' | 'en' | 'fr') ||
                              prod[`name_${language}`] ||
                              (language === 'es' ? prod.name_es : language === 'en' ? prod.name_en : prod.name_fr) ||
                              prod.name ||
                              '';
            const prodDescripcion = getLocalizedField(prod, 'description', language as 'es' | 'en' | 'fr') ||
                                  prod[`description_${language}`] ||
                                  (language === 'es' ? prod.description_es : language === 'en' ? prod.description_en : prod.description_fr) ||
                                  '';

            return {
              id: prod.slug,
              nombre: prodNombre,
              descripcion: prodDescripcion,
              imagen:
                getImageUrl(prod.image_url || prod.image) || "/img/default.jpg",
              // Campos de alt y title de imágenes del backend
              image_alt_es: getLocalizedValue(prod.image_alt, "es"),
              image_alt_en: getLocalizedValue(prod.image_alt, "en"),
              image_alt_fr: getLocalizedValue(prod.image_alt, "fr"),
              image_title_es: getLocalizedValue(prod.image_title, "es"),
              image_title_en: getLocalizedValue(prod.image_title, "en"),
              image_title_fr: getLocalizedValue(prod.image_title, "fr"),
              // Campos adicionales del producto
              subtitulo: prod.subtitle || null,
              composicion:
                getLocalizedField(
                  prod,
                  "composition",
                  language as "es" | "en" | "fr",
                ) || null,
              caracteristicas:
                getLocalizedField(
                  prod,
                  "features",
                  language as "es" | "en" | "fr",
                )
                  ?.split("\n")
                  .filter((f: string) => f.trim()) || null,
              recomendaciones:
                getLocalizedField(
                  prod,
                  "recommendations",
                  language as "es" | "en" | "fr",
                )
                  ?.split("\n")
                  .filter((f: string) => f.trim()) || null,
              precauciones:
                getLocalizedField(
                  prod,
                  "carriers",
                  language as "es" | "en" | "fr",
                )
                  ?.split("\n")
                  .filter((f: string) => f.trim()) || null,
              informacion_relevante:
                getLocalizedField(
                  prod,
                  "relevant_info",
                  language as "es" | "en" | "fr",
                )
                  ?.split("\n")
                  .filter((f: string) => f.trim()) || null,
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

        // Mapear aplicaciones del backend al formato esperado (array de strings con nombres)
        // Estructura real: { data: { category: {...}, applications: [...] } }
        // Asegurar que aplicacionesSource sea siempre un array
        let aplicacionesSource: any[] = [];
        if (backendApplicationsData?.data) {
            if (Array.isArray((backendApplicationsData.data as any).applications)) {
                aplicacionesSource = (backendApplicationsData.data as any).applications;
            } else if (Array.isArray(backendApplicationsData.data)) {
                aplicacionesSource = backendApplicationsData.data as any[];
            }
        } else if (cat.applications) {
            aplicacionesSource = Array.isArray(cat.applications) ? cat.applications : [];
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

        // Mapear acabados del backend al formato esperado
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
                getImageUrl(finish.image_url || finish.image) ||
                "/img/default.jpg",
            };
          }) || [];


        return {
            id: cat.slug,
            nombre: nombre,
            descripcion: descripcion,
            descripcionCorta: descripcionCorta,
            imagen: getImageUrl(cat.image_url) || '/img/default.jpg',
            productos: productos,
            aplicaciones: aplicaciones,
            acabados: acabados
        };
    }, [backendCategoryData, backendProductsData, backendApplicationsData, language]);

    // Fallback a datos locales según el idioma
    const localCategory = useMemo(() => {
        const currentData = language === "es" ? data : language === "en" ? data2 : data3;
        return currentData.categorias.find(
            (cat: any) => cat.id.toLowerCase() === categorySlug.toLowerCase()
        ) || null;
    }, [language, categorySlug]);

    // Determinar qué datos usar: backend si están disponibles, sino locales
    const foundCategory = categoryFromBackend || localCategory;

    // Toggles para forzar hardcoded de aplicaciones y acabados
    // Solo usar hardcode si NO hay datos del backend (para fallback)
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

    const HARDCODED_FINISHES_BY_SLUG: Record<string, { nombre: string; imagen: string }[]> = {
        "mortero-de-cal": [
            { nombre: "Abujardado / raspado", imagen: "/img/acabados/raspado_abujardado.jpg" },
            { nombre: "Lavado / fratasado", imagen: "/img/acabados/lavado_fratasado.jpg" },
            { nombre: "Impreso", imagen: "/img/acabados/impreso.jpg" },
            { nombre: "Liso", imagen: "/img/acabados/liso.jpg" },
        ],
    };

    const hardcodedApps =
        (localCategory?.aplicaciones as string[] | undefined) ||
        HARDCODED_APPS_BY_SLUG[categorySlug] ||
        HARDCODED_APPS_BY_SLUG[foundCategory?.id || (foundCategory as any)?.slug || ""];

    const hardcodedFinishes =
        (localCategory?.acabados as { nombre: string; imagen: string }[] | undefined) ||
        HARDCODED_FINISHES_BY_SLUG[categorySlug] ||
        HARDCODED_FINISHES_BY_SLUG[foundCategory?.id || (foundCategory as any)?.slug || ""];

    let finalCategory: any = foundCategory;
    // Solo usar hardcode si no hay datos del backend (para mantener fallback)
    if (USE_HARDCODED_APPLICATIONS && hardcodedApps && finalCategory) {
        finalCategory = { ...finalCategory, aplicaciones: hardcodedApps };
    }
    if (USE_HARDCODED_FINISHES && hardcodedFinishes && finalCategory) {
        finalCategory = { ...finalCategory, acabados: hardcodedFinishes };
    }

    // Detectar cambio de idioma y redirigir al slug correspondiente
    useEffect(() => {
        // Saltar el primer render para evitar redirecciones innecesarias
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            previousLanguageRef.current = language;
            return;
        }

        // Solo redirigir si el idioma cambió y tenemos datos de la categoría
        if (mounted && previousLanguageRef.current !== language && !isLoading) {
            // Buscar la categoría que coincide con el slug actual en todas las categorías
            // (puede coincidir con slug, slug_es, slug_en o slug_fr)
            let matchingCategory: Category | null = null;
            
            if (allCategoriesData?.data) {
                matchingCategory = allCategoriesData.data.find((cat: Category) => 
                    cat.slug === categorySlug ||
                    cat.slug_es === categorySlug ||
                    cat.slug_en === categorySlug ||
                    cat.slug_fr === categorySlug
                ) || null;
            }
            
            // Si no encontramos en todas las categorías, usar la categoría del backend
            if (!matchingCategory && backendCategoryData?.data) {
                matchingCategory = backendCategoryData.data;
            }
            
            if (matchingCategory) {
                // Obtener el slug para el nuevo idioma directamente
                let newSlug: string | null = null;
                
                // Intentar obtener el slug específico del idioma
                if (language === 'es' && matchingCategory.slug_es) {
                    newSlug = matchingCategory.slug_es;
                } else if (language === 'en' && matchingCategory.slug_en) {
                    newSlug = matchingCategory.slug_en;
                } else if (language === 'fr' && matchingCategory.slug_fr) {
                    newSlug = matchingCategory.slug_fr;
                }
                
                // Si no hay slug específico para el idioma, usar el slug principal como fallback
                // PERO solo si el slug actual NO es el slug principal
                // (si el slug actual ya es el principal, no redirigir)
                if (!newSlug) {
                    // Verificar si el slug actual es un slug localizado de otro idioma
                    const isCurrentSlugLocalized = 
                        categorySlug !== matchingCategory.slug &&
                        (categorySlug === matchingCategory.slug_en ||
                         categorySlug === matchingCategory.slug_fr ||
                         categorySlug === matchingCategory.slug_es);
                    
                    // Si el slug actual es un slug localizado y no hay slug para el nuevo idioma,
                    // redirigir al slug principal
                    if (isCurrentSlugLocalized) {
                        newSlug = matchingCategory.slug;
                    } else {
                        // Si el slug actual ya es el principal, mantenerlo
                        newSlug = categorySlug;
                    }
                }

                // Solo redirigir si el nuevo slug es diferente al actual
                if (newSlug && newSlug !== categorySlug) {
                    router.replace(`/categories/${encodeURIComponent(newSlug)}`);
                    return;
                }
            }
        } else if (mounted && previousLanguageRef.current !== language && !isLoading && localCategory) {
            // Fallback para datos locales
            const currentData = language === "es" ? data : language === "en" ? data2 : data3;
            const categoryInNewLanguage = currentData.categorias.find(
                (cat: any) => {
                    return cat.id.toLowerCase() === categorySlug.toLowerCase() ||
                           cat.id.toLowerCase() === localCategory.id.toLowerCase();
                }
            );
            if (categoryInNewLanguage && categoryInNewLanguage.id !== categorySlug) {
                router.replace(`/categories/${encodeURIComponent(categoryInNewLanguage.id)}`);
                return;
            }
        }

        // Actualizar la referencia del idioma anterior solo si no hubo redirección
        previousLanguageRef.current = language;
    }, [language, mounted, backendCategoryData, allCategoriesData, localCategory, categorySlug, router, isLoading]);

    if (!mounted || isLoading) {
        return (
            <main className="min-h-screen gap-4 flex justify-center items-center bg-white md:pt-28 pt-16 lg:pt-32">
                <Loader width={50} height={50} /> Loading...
            </main>
        );
    }

    if (!finalCategory) {
        return (
            <div className="pt-32 px-5">
                <h1 className="text-2xl font-bold">
                    {t("categoryNotFound")}
                </h1>
            </div>
        );
    }

    return <ProductCategoryPage category={finalCategory} backendData={categoryFromBackend} />;
}

