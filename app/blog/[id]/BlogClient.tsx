// app/blog/[id]/BlogClient.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useBlogPost } from "@/api/useBlogPost";
import { useLanguage } from "@/app/context/LanguageContext";
import SeoHead from "@/components/SeoHead";
import NewsDetail from "@/app/components/blog/NewsDetail";
import { Loader } from "lucide-react";
import { useEffect } from "react";

export default function BlogClient() {
  const { id } = useParams(); // slug actual
  const router = useRouter();
  const { language } = useLanguage();
  const { data: post, isLoading, error } = useBlogPost(id as string, !!id);

  // 👇 Redirigir al slug correcto según el idioma si es necesario
  useEffect(() => {
    if (!post) return;
    const expectedSlug =
      language === "en"
        ? post.slug_en
        : language === "fr"
          ? post.slug_fr
          : post.slug;
    if (expectedSlug && expectedSlug !== id) {
      router.replace(`/blog/${expectedSlug}?lang=${language}`);
    }
  }, [language, post, id, router]);

  // 👇 Obtener título y descripción traducidos usando el idioma del contexto
  const getLocalizedTitle = () => {
    if (language === "en") return post?.title_en || post?.title || "";
    if (language === "fr") return post?.title_fr || post?.title || "";
    return post?.title || "";
  };

  const getLocalizedDescription = () => {
    let desc = post?.description;
    if (language === "en") desc = post?.description_en || desc;
    if (language === "fr") desc = post?.description_fr || desc;
    return desc;
  };

  if (isLoading) return <Loader className="animate-spin" />;
  if (error || !post) return <p>Error al cargar la noticia</p>;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <SeoHead
        seo={post.seo || null}
        url={currentUrl}
        fallbackTitle={getLocalizedTitle()}
        fallbackDescription={post.description
          .replace(/<[^>]*>/g, "")
          .substring(0, 160)}
      />
      <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32 flex flex-col">
        <NewsDetail
          id={String(post.id)}
          title={getLocalizedTitle()}
          description={getLocalizedDescription()}
          date={post.createdAt}
          imageUrl={post.photo_url ?? undefined}
        />
      </main>
    </>
  );
}
