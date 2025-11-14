"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useLanguage } from '@/app/context/LanguageContext';
import { data, Aplication } from '../../data/aplicaciones';
import AplicationPage from '../../components/aplicaciones/AplicationsPage';
import { Loader } from "lucide-react";
import { useApplicationBySlug } from '@/api/useApplications';
import { getLocalizedField } from '@/lib/i18nHelpers';
import type { Application } from '@/services/applicationsService';

export default function AplicationClient() {
    const { t, language } = useLanguage();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [applicationSlug, setApplicationSlug] = useState<string>("");

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

    // Convertir datos del backend al formato esperado por el componente
    const applicationFromBackend = useMemo(() => {
        if (!backendData?.data) return null;

        const app: Application = backendData.data;

        return {
            id: app.slug,
            aplication: getLocalizedField(app, 'name', language as 'es' | 'en' | 'fr') || '',
            descripcion: getLocalizedField(app, 'description', language as 'es' | 'en' | 'fr') || '',
            img: app.image_url || '/img/default.jpg',
            products: [] // Los productos se pueden mapear si vienen en la respuesta
        };
    }, [backendData, language]);

    // Fallback a datos locales si no hay datos del backend
    const localApplication = useMemo(() => {
        return data.find((a) => a.id === applicationSlug) || null;
    }, [applicationSlug]);

    // Determinar qué datos usar: backend si están disponibles, sino locales
    const application = applicationFromBackend || localApplication;

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