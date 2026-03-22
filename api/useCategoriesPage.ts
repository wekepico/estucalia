// api/useCategoriesPage.ts

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getCategoriesPage,
  type CategoriesPageResponse,
  type Lang,
} from "@/services/categoriesPageService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const useCategoriesPage = (): UseQueryResult<
  CategoriesPageResponse,
  Error
> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  return useQuery({
    queryKey: ["categories-page", lang],
    queryFn: () => getCategoriesPage(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
