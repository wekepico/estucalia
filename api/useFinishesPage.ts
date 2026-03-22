// api/useFinishesPage.ts

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getFinishesPage,
  type FinishesPageResponse,
  type Lang,
} from "@/services/finishesPageService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const useFinishesPage = (): UseQueryResult<
  FinishesPageResponse,
  Error
> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  return useQuery({
    queryKey: ["finishes-page", lang],
    queryFn: () => getFinishesPage(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
