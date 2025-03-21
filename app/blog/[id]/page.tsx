"use client";
import NewsDetail from "@/app/components/blog/NewsDetail";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export interface Noticia {
    id: string;
    title: string;
    description: string;
    date?: string;
    imageUrl?: string;
}

const newsItems:Noticia [] = [
    {
      id: "mision-comercial-arabia-saudita",
      imageUrl: "https://images.unsplash.com/photo-1582657233895-0f37a3f150c0?auto=format&fit=crop&q=80",
      title: "Misión Comercial Directa a Arabia Saudita",
      description: "Grupo Estucalia continúa su expansión internacional con una importante misión comercial en Arabia Saudita, fortaleciendo su presencia en Oriente Medio.",
      date: "15 Oct 2023",
    },
    {
      id: "presentacion-morteros-marruecos",
      imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
      title: "Presentación de Morteros Monocapa en Marruecos",
      description: "Exitosa presentación de nuestra línea de productos en el mercado marroquí, destacando la calidad y versatilidad de nuestros morteros monocapa.",
      date: "28 Sep 2023",
    },
    {
      id: "convencion-internacional-rabat",
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
      title: "Convención Internacional en Rabat",
      description: "Participación destacada en el evento más importante del sector de la construcción en el norte de África, presentando las últimas innovaciones.",
      date: "15 Sep 2023",
    },
    {
      id: "nuevas-certificaciones-calidad",
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
      title: "Nuevas Certificaciones de Calidad",
      description: "Grupo Estucalia obtiene nuevas certificaciones que avalan la calidad de sus productos y procesos de fabricación.",
      date: "1 Sep 2023",
    }
  ];

export default function NoticiaPage() {
    const pathname = usePathname();
    const noticiaId = pathname.split("/").pop();
    const [noticia, setNoticia] = useState<Noticia | null>(null);

    useEffect(() => {
        const found = newsItems.find(item => item.id === noticiaId);
        setNoticia(found || null);
    }, [noticiaId]);

    return (
        <main className="min-h-screen bg-white">
            {noticia ? (
                <NewsDetail
                    id={noticia.id}
                    title={noticia.title}
                    description={noticia.description}
                    date={noticia.date}
                    imageUrl={noticia.imageUrl}
                />
            ) : (
                <p>Noticia no encontrada</p>
            )}
        </main>
    );
}