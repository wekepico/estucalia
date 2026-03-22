// api/useIntegralProjectsPage.ts

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getIntegralProjectsPage,
  type IntegralProjectsData,
  type Lang,
} from "@/services/integralProjectsPageService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const integralProjectsKeys = {
  all: ["integral-projects-page"] as const,
  detail: (lang: Lang) => [...integralProjectsKeys.all, lang] as const,
};

export const useIntegralProjectsPage = (): UseQueryResult<
  IntegralProjectsData,
  Error
> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  return useQuery({
    queryKey: integralProjectsKeys.detail(lang),
    queryFn: () => getIntegralProjectsPage(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
