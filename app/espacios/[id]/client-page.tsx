'use client'
import { useEffect, useState } from "react";
import SpacesPage from "@/app/components/espacios/SpacesPage";
import { useLanguage } from '@/app/context/LanguageContext';
import { Loader } from "lucide-react";
import { data, products, Spaces } from '@/app/data/espacios';
import { usePathname } from "next/navigation";


export default function ClientPage() {
    const { t } = useLanguage();
    const [currentSpace, setCurrentSpace] = useState<Spaces | null>(null);
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true);
        const id = pathname.split('/').pop();
        const foundSpace = data.find((a) => a.id === id);
        setCurrentSpace(foundSpace || null);
    }, [pathname]);

    if (!mounted) {
        return (
            <main className="min-h-screen gap-4 flex justify-center items-center bg-white md:pt-28 pt-16 lg:pt-32">
                <Loader width={50} height={50} /> Loading...
            </main>
        );
    }
    
    if (!currentSpace) {
        return <div>{t('common.notFound')}</div>;
    }

    return (
        <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32">
                <SpacesPage 
                    img={currentSpace.img} 
                    aplications={currentSpace.aplications.map(app => t(app))}
                    descripcion={t(currentSpace.descripcion)}
                    aplication={t(currentSpace.name)}
                    products={products.map(product => ({
                        ...product,
                        name: t(product.name),
                        category: product.category.split(',').map(cat => t(cat.trim())).join(',')
                    }))} 
                />
        </main>
    );
} 