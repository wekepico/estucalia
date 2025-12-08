// app/blog/[id]/BlogClient.tsx
"use client";
import { useParams } from "next/navigation";
import NewsDetail from "@/app/components/blog/NewsDetail";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

export interface Noticia {
  id: string;
  title: string;
  description: string;
  created_at?: string;
  photo?: string;
  // Nota: El backend NO envía photo_alt ni photo_title, usamos title como fallback
}

export default function BlogClient() {
  // Nota: El parámetro 'id' de la ruta contiene el SLUG, no el ID numérico
  // Esto es porque en page.tsx se mapea: id: post.slug
  const { id } = useParams();
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        // El backend espera el slug en la URL: /api/blog/{slug}
        const res = await fetch(
          `https://apiestucalia.innet.es/api/blog/${id}`
        );
        if (!res.ok) throw new Error(res.statusText);
        const { data } = await res.json();
        setNoticia({
          id: data.id,
          title: data.title,
          description: data.description,
          created_at: data.created_at ?? new Date().toISOString(),
          photo: data.photo ?? "/default-image.jpg",
        });
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader /> cargando...
      </main>
    );
  if (error)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </main>
    );
  if (!noticia)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Noticia no encontrada</p>
      </main>
    );

  return (
    <main className="min-h-screen bg-white">
      <NewsDetail
        id={noticia.id}
        title={noticia.title}
        description={noticia.description}
        date={noticia.created_at}
        imageUrl={noticia.photo}
        // El backend NO envía alt/title, NewsDetail usará title como fallback
      />
    </main>
  );
}
