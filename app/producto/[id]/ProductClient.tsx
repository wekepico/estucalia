"use client";
import ProductCategoryPage from "@/app/components/productos/ProductoPage";
import { useLanguage } from "@/app/context/LanguageContext";
import { Loader } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useRef } from "react";
import data from "../../components/productos/components/data-es.json";
import data2 from "../../components/productos/components/data-en.json";
import data3 from "../../components/productos/components/data-fr.json";
import { useCategoryBySlug, useCategoryProducts, useCategories } from '@/api/useCategories';
import { getProductDocuments } from '@/services/productsService';
import { getLocalizedField, getLocalizedSlug, getImageUrl } from '@/lib/i18nHelpers';
import type { Category } from '@/services/categoriesService';

export default function ProductClient() {
    const pathname = usePathname();
    const router = useRouter();
    const { t, language } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [categorySlug, setCategorySlug] = useState<string>("");
    const previousLanguageRef = useRef<typeof language | null>(null);
    const isFirstRenderRef = useRef(true);

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

    // Obtener todas las categorías para encontrar la que coincide con el slug actual
    const { data: allCategoriesData } = useCategories();

    // Obtener productos de la categoría del backend
    // Ejecutar el hook siempre que tengamos categorySlug, no esperar a backendCategoryData
    const { data: backendProductsData, isLoading: isLoadingProducts } = useCategoryProducts(
        categorySlug,
        mounted && !!categorySlug
    );

    // Estado para almacenar los documentos de cada producto
    const [documentsMap, setDocumentsMap] = useState<Map<string, any[]>>(new Map());

    // Obtener documentos para cada producto cuando se carguen los productos
    useEffect(() => {
        if (!backendProductsData?.data || backendProductsData.data.length === 0) {
            return;
        }

        if (!mounted) {
            return;
        }
        
        // Obtener documentos para todos los productos en paralelo
        const fetchDocuments = async () => {
            try {
                const documentsPromises = backendProductsData.data.map(async (product) => {
                    try {
                        const response = await getProductDocuments(product.slug);
                        return { slug: product.slug, documents: response.data };
                    } catch (error) {
                        return { slug: product.slug, documents: [] };
                    }
                });

                const results = await Promise.all(documentsPromises);
                const newMap = new Map<string, any[]>();
                
                results.forEach(({ slug, documents }) => {
                    if (documents && documents.length > 0) {
                        newMap.set(slug, documents);
                    }
                });

                setDocumentsMap(newMap);
            } catch (error) {
                // Error silencioso
            }
        };

        fetchDocuments();
    }, [backendProductsData?.data, mounted]);


    // Convertir datos del backend al formato esperado
    const categoryFromBackend = useMemo(() => {
        if (!backendCategoryData?.data) {
            return null;
        }

        const cat: Category = backendCategoryData.data;

        // Mapear productos solo si existen
        const productosMapeados = backendProductsData?.data?.map(prod => {
            // Obtener documentos del mapa o usar los que vienen en el producto
            const productDocuments = documentsMap.get(prod.slug) || prod.documents || [];

            return {
                id: prod.slug,
                nombre: getLocalizedField(prod, 'name', language as 'es' | 'en' | 'fr') || '',
                descripcion: getLocalizedField(prod, 'description', language as 'es' | 'en' | 'fr') || '',
                imagen: getImageUrl(prod.image_url) || '/img/default.jpg',
                // Campos de alt y title de imágenes del backend
                image_alt_es: prod.image_alt_es || null,
                image_alt_en: prod.image_alt_en || null,
                image_alt_fr: prod.image_alt_fr || null,
                image_title_es: prod.image_title_es || null,
                image_title_en: prod.image_title_en || null,
                image_title_fr: prod.image_title_fr || null,
                // Campos adicionales del producto del backend
                subtitulo: prod.subtitle || null,
                composicion: getLocalizedField(prod, 'composition', language as 'es' | 'en' | 'fr') || null,
                caracteristicas: getLocalizedField(prod, 'features', language as 'es' | 'en' | 'fr')?.split('\n').filter(f => f.trim()) || null,
                recomendaciones: getLocalizedField(prod, 'recommendations', language as 'es' | 'en' | 'fr')?.split('\n').filter(f => f.trim()) || null,
                precauciones: getLocalizedField(prod, 'carriers', language as 'es' | 'en' | 'fr')?.split('\n').filter(f => f.trim()) || null,
                informacion_relevante: getLocalizedField(prod, 'relevant_info', language as 'es' | 'en' | 'fr')?.split('\n').filter(f => f.trim()) || null,
                informacion_general: getLocalizedField(prod, 'description', language as 'es' | 'en' | 'fr') || null,
                aplicacion: getLocalizedField(prod, 'features', language as 'es' | 'en' | 'fr')?.split('\n').filter(f => f.trim()) || null,
                documentacion: productDocuments.map((doc: any) => ({
                    nombre: doc.name || '',
                    accion: t('common.download') || 'Descargar',
                    enlace: doc.file_url || doc.file_path || '',
                })),
            };
        }) || [];

        // Mapear aplicaciones del backend al formato esperado (array de strings con nombres)
        const aplicacionesMapeadas = cat.applications?.map((app: any) => {
            // Priorizar campos localizados explícitos
            const localizedName = getLocalizedField(app, 'name', language as 'es' | 'en' | 'fr');
            if (localizedName) return localizedName;
            
            // Fallback a campos directos localizados
            const directLocalized = app[`name_${language}`] || app[`title_${language}`];
            if (directLocalized) return directLocalized;
            
            // Último fallback a campos no localizados (solo si no hay opciones localizadas)
            return app.name || app.title || '';
        }) || [];

        // Mapear acabados del backend al formato esperado
        const acabadosMapeados = cat.finishes?.map((finish: any) => {
            // Priorizar campos localizados explícitos
            const localizedName = getLocalizedField(finish, 'name', language as 'es' | 'en' | 'fr');
            const finishName = localizedName || finish[`name_${language}`] || finish.name || '';
            
            return {
                nombre: finishName,
                imagen: getImageUrl(finish.image_url || finish.image) || '/img/default.jpg'
            };
        }) || [];

        const categoryObject = {
            id: cat.slug,
            nombre: getLocalizedField(cat, 'name', language as 'es' | 'en' | 'fr') || '',
            descripcion: getLocalizedField(cat, 'description', language as 'es' | 'en' | 'fr') || '',
            descripcionCorta: getLocalizedField(cat, 'short_description', language as 'es' | 'en' | 'fr') || '',
            imagen: getImageUrl(cat.image_url) || '/img/default.jpg',
            // Campos de alt y title de imagen del backend (vienen como strings simples)
            image_alt: cat.image_alt_es || cat.image_alt_en || cat.image_alt_fr || null,
            image_title: cat.image_title_es || cat.image_title_en || cat.image_title_fr || null,
            productos: productosMapeados,
            aplicaciones: aplicacionesMapeadas,
            acabados: acabadosMapeados
        };

        return categoryObject;
    }, [backendCategoryData, backendProductsData, documentsMap, language, t]);

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
        // Saltar el primer render para evitar redirecciones innecesarias
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            previousLanguageRef.current = language;
            return;
        }

        // Solo redirigir si el idioma cambió y tenemos datos de la categoría
        if (mounted && previousLanguageRef.current !== language && !isLoading) {
            // Buscar la categoría que coincide con el slug actual en todas las categorías
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
                
                // Si no hay slug específico, usar el slug principal como fallback
                if (!newSlug) {
                    newSlug = matchingCategory.slug;
                }

                // Solo redirigir si el nuevo slug es diferente al actual
                if (newSlug && newSlug !== categorySlug) {
                    router.replace(`/producto/${encodeURIComponent(newSlug)}`);
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
                router.replace(`/producto/${encodeURIComponent(categoryInNewLanguage.id)}`);
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