"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useRef } from "react";
import { useLanguage } from '@/app/context/LanguageContext';
import { data, Aplication } from '../../data/aplicaciones';
import AplicationPage from '../../components/aplicaciones/AplicationsPage';
import { Loader } from "lucide-react";
import { useApplicationBySlug, useApplications } from '@/api/useApplications';
import { getLocalizedField, getLocalizedSlug } from '@/lib/i18nHelpers';
import type { Application } from '@/services/applicationsService';

export default function AplicationClient() {
    const { t, language } = useLanguage();
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [applicationSlug, setApplicationSlug] = useState<string>("");
    const previousLanguageRef = useRef<typeof language | null>(null);
    const isFirstRenderRef = useRef(true);

    // Obtener el slug de la URL
    useEffect(() => {
        setMounted(true);
        const id = pathname.split('/').pop();
        setApplicationSlug(id || "");
    }, [pathname]);

    // Consumir datos del backend
    const { data: backendData, isLoading, error } = useApplicationBySlug(
        applicationSlug,
        mounted && !!applicationSlug
    );

    // Obtener todas las aplicaciones para encontrar la que coincide con el slug actual
    const { data: allApplicationsData } = useApplications();

    // Convertir datos del backend al formato esperado por el componente
    const applicationFromBackend = useMemo(() => {
        if (!backendData?.data) return null;

        const app: any = backendData.data;

        // Mapear las categorías del backend a productos
        const products = app.categories?.map((category: any) => ({
            id: getLocalizedSlug(category, language as 'es' | 'en' | 'fr') || category.slug,
            name: getLocalizedField(category, 'name', language as 'es' | 'en' | 'fr') || category.name,
            icon: category.image || category.icon || '/img/default-icon.svg'
        })) || [];

        return {
            id: app.slug,
            aplication: getLocalizedField(app, 'name', language as 'es' | 'en' | 'fr') || '',
            descripcion: getLocalizedField(app, 'description', language as 'es' | 'en' | 'fr') || '',
            img: app.image_url || '/img/default.jpg',
            // Campos de alt y title de imagen del backend (preparado para cuando el backend envíe datos)
            image_alt: app.image_alt_es || app.image_alt_en || app.image_alt_fr || null,
            image_title: app.image_title_es || app.image_title_en || app.image_title_fr || null,
            products: products
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
        // Saltar el primer render para evitar redirecciones innecesarias
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            previousLanguageRef.current = language;
            return;
        }

        // Solo redirigir si el idioma cambió y tenemos datos de la aplicación
        if (mounted && previousLanguageRef.current !== language && !isLoading) {
            // Buscar la aplicación que coincide con el slug actual en todas las aplicaciones
            let matchingApplication: Application | null = null;
            
            if (allApplicationsData?.data) {
                matchingApplication = allApplicationsData.data.find((app: Application) => 
                    app.slug === applicationSlug ||
                    app.slug_es === applicationSlug ||
                    app.slug_en === applicationSlug ||
                    app.slug_fr === applicationSlug
                ) || null;
            }
            
            // Si no encontramos en todas las aplicaciones, usar la aplicación del backend
            if (!matchingApplication && backendData?.data) {
                matchingApplication = backendData.data;
            }
            
            if (matchingApplication) {
                // Obtener el slug para el nuevo idioma directamente
                let newSlug: string | null = null;
                
                // Intentar obtener el slug específico del idioma
                if (language === 'es' && matchingApplication.slug_es) {
                    newSlug = matchingApplication.slug_es;
                } else if (language === 'en' && matchingApplication.slug_en) {
                    newSlug = matchingApplication.slug_en;
                } else if (language === 'fr' && matchingApplication.slug_fr) {
                    newSlug = matchingApplication.slug_fr;
                }
                
                // Si no hay slug específico, usar el slug principal como fallback
                if (!newSlug) {
                    newSlug = matchingApplication.slug;
                }

                // Solo redirigir si el nuevo slug es diferente al actual
                if (newSlug && newSlug !== applicationSlug) {
                    router.replace(`/aplicaciones/${encodeURIComponent(newSlug)}`);
                    return;
                }
            }
        }

        // Actualizar la referencia del idioma anterior solo si no hubo redirección
        previousLanguageRef.current = language;
    }, [language, mounted, backendData, allApplicationsData, localApplication, applicationSlug, router, isLoading]);

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
                <h1 className="text-2xl font-bold">
                    {t("categoryNotFound")}
                </h1>
            </div>
        );
    }

    return <AplicationPage aplication={application} backendData={applicationFromBackend} />;
} 