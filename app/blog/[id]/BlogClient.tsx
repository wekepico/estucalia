// app/blog/[id]/BlogClient.tsx
"use client";

import { useParams } from "next/navigation";
import { useBlogPost } from "@/api/useBlogPost";
import SeoHead from "@/components/SeoHead";
import NewsDetail from "@/app/components/blog/NewsDetail";
import { Loader } from "lucide-react";

export default function BlogClient() {
  const { id } = useParams(); // id es el slug
  const { data: post, isLoading, error } = useBlogPost(id as string, !!id);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin" /> Cargando...
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error al cargar la noticia</p>
      </main>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <SeoHead
        seo={post.seo || null}
        url={currentUrl}
        fallbackTitle={post.title}
        fallbackDescription={post.description
          .replace(/<[^>]*>/g, "")
          .substring(0, 160)}
      />
      <main className="min-h-screen bg-white">
        <NewsDetail
          id={post.id}
          title={post.title}
          description={post.description}
          date={post.createdAt}
          imageUrl={post.photo}
        />
      </main>
    </>
  );
}
