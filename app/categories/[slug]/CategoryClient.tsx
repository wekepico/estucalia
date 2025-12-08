"use client";
import ProductCategoryPage from "@/app/components/productos/ProductoPage";
import { useLanguage } from "@/app/context/LanguageContext";
import { Loader } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useRef } from "react";
import data from "@/app/components/productos/components/data-es.json";
import data2 from "@/app/components/productos/components/data-en.json";
import data3 from "@/app/components/productos/components/data-fr.json";
import { useCategoryBySlug, useCategoryProducts, useCategories } from '@/api/useCategories';
import { getLocalizedField, getLocalizedSlug } from '@/lib/i18nHelpers';
import type { Category } from '@/services/categoriesService';

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

        // Mapear productos - usar backendProductsData si está disponible
        const productos = backendProductsData?.data?.map(prod => {
            const prodNombre = getLocalizedField(prod, 'name', language as 'es' | 'en' | 'fr') || 
                              (language === 'es' ? prod.name_es : language === 'en' ? prod.name_en : prod.name_fr) || 
                              prod.name || 
                              '';
            const prodDescripcion = getLocalizedField(prod, 'description', language as 'es' | 'en' | 'fr') || 
                                  (language === 'es' ? prod.description_es : language === 'en' ? prod.description_en : prod.description_fr) || 
                                  '';
            return {
                id: prod.slug,
                nombre: prodNombre,
                descripcion: prodDescripcion,
                imagen: prod.image_url || '/img/default.jpg',
            };
        }) || [];

        return {
            id: cat.slug,
            nombre: nombre,
            descripcion: descripcion,
            descripcionCorta: descripcionCorta,
            imagen: cat.image_url || '/img/default.jpg',
            productos: productos
        };
    }, [backendCategoryData, backendProductsData, language]);

    // Fallback a datos locales según el idioma
    const localCategory = useMemo(() => {
        const currentData = language === "es" ? data : language === "en" ? data2 : data3;
        return currentData.categorias.find(
            (cat: any) => cat.id.toLowerCase() === categorySlug.toLowerCase()
        ) || null;
    }, [language, categorySlug]);

    // Determinar qué datos usar: backend si están disponibles, sino locales
    const foundCategory = categoryFromBackend || localCategory;

    // Detectar cambio de idioma y redirigir al slug correspondiente
    useEffect(() => {
        console.log('🔍 [CategoryClient] Language change effect triggered', {
            isFirstRender: isFirstRenderRef.current,
            mounted,
            previousLanguage: previousLanguageRef.current,
            currentLanguage: language,
            categorySlug,
            isLoading,
            hasBackendData: !!backendCategoryData?.data,
            hasLocalCategory: !!localCategory
        });

        // Saltar el primer render para evitar redirecciones innecesarias
        if (isFirstRenderRef.current) {
            console.log('⏭️ [CategoryClient] Skipping first render');
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
                console.log('🔎 [CategoryClient] Searching in all categories:', {
                    totalCategories: allCategoriesData.data.length,
                    currentSlug: categorySlug,
                    sampleCategories: allCategoriesData.data.slice(0, 3).map((cat: Category) => ({
                        slug: cat.slug,
                        slug_es: cat.slug_es,
                        slug_en: cat.slug_en,
                        slug_fr: cat.slug_fr
                    }))
                });
                
                matchingCategory = allCategoriesData.data.find((cat: Category) => 
                    cat.slug === categorySlug ||
                    cat.slug_es === categorySlug ||
                    cat.slug_en === categorySlug ||
                    cat.slug_fr === categorySlug
                ) || null;
                
                console.log('✅ [CategoryClient] Found matching category:', matchingCategory ? {
                    slug: matchingCategory.slug,
                    slug_es: matchingCategory.slug_es,
                    slug_en: matchingCategory.slug_en,
                    slug_fr: matchingCategory.slug_fr
                } : 'NOT FOUND');
            }
            
            // Si no encontramos en todas las categorías, usar la categoría del backend
            if (!matchingCategory && backendCategoryData?.data) {
                matchingCategory = backendCategoryData.data;
            }
            
            if (matchingCategory) {
                console.log('📦 [CategoryClient] Matching category data:', {
                    slug: matchingCategory.slug,
                    slug_es: matchingCategory.slug_es,
                    slug_en: matchingCategory.slug_en,
                    slug_fr: matchingCategory.slug_fr,
                    currentLanguage: language,
                    currentSlug: categorySlug
                });
                
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

                console.log('🎯 [CategoryClient] Slug resolution:', {
                    newSlug,
                    currentSlug: categorySlug,
                    slugPrincipal: matchingCategory.slug,
                    shouldRedirect: newSlug && newSlug !== categorySlug
                });

                // Solo redirigir si el nuevo slug es diferente al actual
                if (newSlug && newSlug !== categorySlug) {
                    console.log('🚀 [CategoryClient] Redirecting to:', `/categories/${encodeURIComponent(newSlug)}`);
                    router.replace(`/categories/${encodeURIComponent(newSlug)}`);
                    return;
                } else {
                    console.log('⏸️ [CategoryClient] No redirect needed - slugs are the same or newSlug is null');
                }
            } else {
                console.log('⚠️ [CategoryClient] No matching category found');
            }
        } else if (mounted && previousLanguageRef.current !== language && !isLoading && localCategory) {
            console.log('📚 [CategoryClient] Using local category data');
            // Fallback para datos locales
            const currentData = language === "es" ? data : language === "en" ? data2 : data3;
            const categoryInNewLanguage = currentData.categorias.find(
                (cat: any) => {
                    return cat.id.toLowerCase() === categorySlug.toLowerCase() ||
                           cat.id.toLowerCase() === localCategory.id.toLowerCase();
                }
            );
            if (categoryInNewLanguage && categoryInNewLanguage.id !== categorySlug) {
                console.log('🚀 [CategoryClient] Redirecting to (local):', `/categories/${encodeURIComponent(categoryInNewLanguage.id)}`);
                router.replace(`/categories/${encodeURIComponent(categoryInNewLanguage.id)}`);
                return;
            }
        } else {
            console.log('❌ [CategoryClient] Conditions not met for redirect:', {
                mounted,
                languageChanged: previousLanguageRef.current !== language,
                isLoading,
                hasBackendData: !!backendCategoryData?.data,
                hasLocalCategory: !!localCategory
            });
        }

        // Actualizar la referencia del idioma anterior solo si no hubo redirección
        console.log('✅ [CategoryClient] Updating previousLanguageRef to:', language);
        previousLanguageRef.current = language;
    }, [language, mounted, backendCategoryData, allCategoriesData, localCategory, categorySlug, router, isLoading]);

    if (!mounted || isLoading) {
        return (
            <main className="min-h-screen gap-4 flex justify-center items-center bg-white md:pt-28 pt-16 lg:pt-32">
                <Loader width={50} height={50} /> Loading...
            </main>
        );
    }

    if (!foundCategory) {
        return (
            <div className="pt-32 px-5">
                <h1 className="text-2xl font-bold">
                    {t("categoryNotFound")}
                </h1>
            </div>
        );
    }

    return <ProductCategoryPage category={foundCategory} backendData={categoryFromBackend} />;
}

