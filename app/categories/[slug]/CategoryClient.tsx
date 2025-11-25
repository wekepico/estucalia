"use client";
import ProductCategoryPage from "@/app/components/productos/ProductoPage";
import { useLanguage } from "@/app/context/LanguageContext";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import data from "@/app/components/productos/components/data-es.json";
import data2 from "@/app/components/productos/components/data-en.json";
import data3 from "@/app/components/productos/components/data-fr.json";
import { useCategoryBySlug, useCategoryProducts } from '@/api/useCategories';
import { getLocalizedField } from '@/lib/i18nHelpers';
import type { Category } from '@/services/categoriesService';

export default function CategoryClient() {
    const pathname = usePathname();
    const { t, language } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [categorySlug, setCategorySlug] = useState<string>("");

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

