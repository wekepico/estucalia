// api/useBlogPage.ts

import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/app/context/LanguageContext";
import { BlogPageResponse, getBlogPage } from "@/services";

export const useBlogPage = () => {
  const { language } = useLanguage();
  const lang = language === "en" || language === "fr" ? language : "es";
  return useQuery<BlogPageResponse>({
    queryKey: ["blog-page", lang],
    queryFn: () => getBlogPage(lang),
    staleTime: 5 * 60 * 1000,
  });
};
