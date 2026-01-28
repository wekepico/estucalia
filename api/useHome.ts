import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getHome, type HomeData, type Lang } from "@/services/homeService";

export const homeKeys = {
  all: ["home"] as const,
  detail: (lang: Lang) => [...homeKeys.all, lang] as const,
};

export const useHome = (lang: Lang = "es"): UseQueryResult<HomeData, Error> => {
  return useQuery({
    queryKey: homeKeys.detail(lang), // ✅ incluye idioma
    queryFn: () => getHome(lang), // ✅ pasa idioma al service
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!lang,
  });
};
