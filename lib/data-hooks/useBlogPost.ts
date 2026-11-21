// api/useBlogPost.ts

import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/app/context/LanguageContext";
import { BlogPost, getBlogPostBySlug } from "@/services";

export const useBlogPost = (slug: string, enabled: boolean = true) => {
  const { language } = useLanguage();
  const lang = language === "en" || language === "fr" ? language : "es";
  return useQuery<BlogPost>({
    queryKey: ["blog-post", slug, lang],
    queryFn: () => getBlogPostBySlug(slug, lang),
    enabled: enabled && !!slug,
    staleTime: 5 * 60 * 1000,
  });
};
