// api/useInspirationPage.ts
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getInspirationPageWithItems,
  type InspirationPageData,
  type Lang,
} from "@/services/inspirationsService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const inspirationKeys = {
  all: ["inspiration-page"] as const,
  detail: (lang: Lang) => [...inspirationKeys.all, lang] as const,
};

export const useInspirationPage = (): UseQueryResult<
  InspirationPageData,
  Error
> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  return useQuery({
    queryKey: inspirationKeys.detail(lang),
    queryFn: () => getInspirationPageWithItems(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
