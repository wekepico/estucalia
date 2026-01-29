import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getIntegralProjectsPage,
  type IntegralProjectsData,
  type Lang,
} from "@/services/integralProjectsPageService";

export const integralProjectsKeys = {
  all: ["integral-projects-page"] as const,
  detail: (lang: Lang) => [...integralProjectsKeys.all, lang] as const,
};

export const useIntegralProjectsPage = (
  lang: Lang = "es",
): UseQueryResult<IntegralProjectsData, Error> => {
  return useQuery({
    queryKey: integralProjectsKeys.detail(lang),
    queryFn: () => getIntegralProjectsPage(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!lang,
  });
};
