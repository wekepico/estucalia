"use client";
import NewsDetail from "@/app/components/blog/NewsDetail";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export interface Noticia {
    id: string;
    title: string;
    description: string;
    created_at?: string;
    photo?: string;
}

export default function NoticiaPage() {
    const pathname = usePathname();
    const noticiaId = pathname.split("/").pop();
    const [noticia, setNoticia] = useState<Noticia | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNoticia = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.derecho-ciudadano.com/api/blog/${noticiaId}`);
                
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                
                const data = await response.json();
                console.log(data)
                
                // Transformar los datos de la API al formato esperado
                const formattedNoticia: Noticia = {
                    id: data.data.id,
                    title: data.data.title,
                    description: data.data.description,
                    created_at: data.data.date || new Date().toLocaleDateString(),
                    photo: data.data.photo || "/default-image.jpg"
                };
                
                setNoticia(formattedNoticia);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error desconocido"); 
                console.error("Error fetching noticia:", err);
            } finally {
                setLoading(false);
            }
        };

        if (noticiaId) {
            fetchNoticia();
        }
    }, [noticiaId]);

    if (loading) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <Loader />cargando...
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </main>
        );
    }

    if (!noticia) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <p>Noticia no encontrada</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <NewsDetail
                id={noticia.id}
                title={noticia.title}
                description={noticia.description}
                date={noticia.created_at}
                imageUrl={noticia.photo}
            />
        </main>
    );
}