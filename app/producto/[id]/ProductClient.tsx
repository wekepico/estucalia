"use client";
import ProductCategoryPage from "@/app/components/productos/ProductoPage";
import { useLanguage } from "@/app/context/LanguageContext";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import data from "../../components/productos/components/data-es.json";
import data2 from "../../components/productos/components/data-en.json";
import data3 from "../../components/productos/components/data-fr.json";
import { useCategoryBySlug, useCategoryProducts } from '@/api/useCategories';
import { getLocalizedField } from '@/lib/i18nHelpers';
import type { Category } from '@/services/categoriesService';

export default function ProductClient() {
    const pathname = usePathname();
    const { t, language } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [categorySlug, setCategorySlug] = useState<string>("");

    // Obtenemos el ID de la categoría de la URL
    useEffect(() => {
        setMounted(true);
        const idEncoded = pathname.split("/").pop();
        const categoryId = decodeURIComponent(idEncoded || "");
        setCategorySlug(categoryId);
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

        return {
            id: cat.slug,
            nombre: getLocalizedField(cat, 'name', language as 'es' | 'en' | 'fr') || '',
            descripcion: getLocalizedField(cat, 'description', language as 'es' | 'en' | 'fr') || '',
            descripcionCorta: getLocalizedField(cat, 'short_description', language as 'es' | 'en' | 'fr') || '',
            imagen: cat.image_url || '/img/default.jpg',
            productos: backendProductsData?.data?.map(prod => ({
                id: prod.slug,
                nombre: getLocalizedField(prod, 'name', language as 'es' | 'en' | 'fr') || '',
                descripcion: getLocalizedField(prod, 'description', language as 'es' | 'en' | 'fr') || '',
                imagen: prod.image_url || '/img/default.jpg',
            })) || []
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