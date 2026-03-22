// api/useBuildersArchitectsPage.ts

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getBuildersArchitectsPage,
  type BuildersArchitectsData,
  type Lang,
} from "@/services/buildersArchitectsPageService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const buildersArchitectsKeys = {
  all: ["builders-architects-page"] as const,
  detail: (lang: Lang) => [...buildersArchitectsKeys.all, lang] as const,
};

export const useBuildersArchitectsPage = (): UseQueryResult<
  BuildersArchitectsData,
  Error
> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  return useQuery({
    queryKey: buildersArchitectsKeys.detail(lang),
    queryFn: () => getBuildersArchitectsPage(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
