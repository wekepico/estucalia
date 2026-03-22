// api/useHome.ts

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getHome, type HomeData, type Lang } from "@/services/homeService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const homeKeys = {
  all: ["home"] as const,
  detail: (lang: Lang) => [...homeKeys.all, lang] as const,
};

export const useHome = (): UseQueryResult<HomeData, Error> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  return useQuery({
    queryKey: homeKeys.detail(lang),
    queryFn: () => getHome(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
