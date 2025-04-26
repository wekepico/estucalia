"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from '@/app/context/LanguageContext';
import { data, Aplication } from '../../data/aplicaciones';
import AplicationPage from '../../components/aplicaciones/AplicationsPage';

export default function AplicationClient() {
    const { t } = useLanguage();
    const pathname = usePathname();
    const [aplication, setAplication] = useState<Aplication | null>(null);

    useEffect(() => {
        const id = pathname.split('/').pop();
        const foundAplication = data.find((a) => a.id === id);
        setAplication(foundAplication || null);
    }, [pathname]);
    
    if (!aplication) {
        return <div>{t('common.notFound')}</div>;
    }

    return <AplicationPage aplication={aplication} />;
} 