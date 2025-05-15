"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from '@/app/context/LanguageContext';
import { data, Aplication } from '../../data/aplicaciones';
import AplicationPage from '../../components/aplicaciones/AplicationsPage';
import { Loader } from "lucide-react";

export default function AplicationClient() {
    const { t } = useLanguage();
    const pathname = usePathname();
    const [aplication, setAplication] = useState<Aplication | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const id = pathname.split('/').pop();
        const foundAplication = data.find((a) => a.id === id);
        setAplication(foundAplication || null);
    }, [pathname]);

    if (!mounted) {
        return (
            <main className="min-h-screen gap-4 flex justify-center items-center bg-white md:pt-28 pt-16 lg:pt-32">
                <Loader width={50} height={50} /> Loading...
            </main>
        );
    }

    if (!aplication) {
        return (
        <div className="pt-32 px-5">
            <h1 className="text-2xl font-bold">
                {t("categoryNotFound")}
            </h1>
        </div>)
    }

    return <AplicationPage aplication={aplication} />;
} 