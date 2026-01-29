import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getBuildersArchitectsPage,
  type BuildersArchitectsData,
  type Lang,
} from "@/services/buildersArchitectsPageService";

export const buildersArchitectsKeys = {
  all: ["builders-architects-page"] as const,
  detail: (lang: Lang) => [...buildersArchitectsKeys.all, lang] as const,
};

export const useBuildersArchitectsPage = (
  lang: Lang = "es",
): UseQueryResult<BuildersArchitectsData, Error> => {
  return useQuery({
    queryKey: buildersArchitectsKeys.detail(lang),
    queryFn: () => getBuildersArchitectsPage(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!lang,
  });
};
