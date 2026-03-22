// api/useWorkWithUsPage.ts

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import {
  getWorkWithUsPage,
  type WorkWithUsPageData,
} from "@/services/workWithUsPageService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): "es" | "en" | "fr" =>
  l === "en" || l === "fr" ? l : "es";

export const workWithUsKeys = {
  all: ["work-with-us-page"] as const,
  detail: (lang: string) => [...workWithUsKeys.all, lang] as const,
};

export const useWorkWithUsPage = (): UseQueryResult<
  WorkWithUsPageData,
  Error
> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  return useQuery({
    queryKey: workWithUsKeys.detail(lang),
    queryFn: () => getWorkWithUsPage(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
