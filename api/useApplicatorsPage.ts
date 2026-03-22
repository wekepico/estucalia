// api/useApplicatorsPage.ts

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getApplicatorsPage,
  type ApplicatorsData,
  type Lang,
} from "@/services/applicatorsPageService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const applicatorsKeys = {
  all: ["applicators-page"] as const,
  detail: (lang: Lang) => [...applicatorsKeys.all, lang] as const,
};

export const useApplicatorsPage = (): UseQueryResult<
  ApplicatorsData,
  Error
> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  return useQuery({
    queryKey: applicatorsKeys.detail(lang),
    queryFn: () => getApplicatorsPage(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
