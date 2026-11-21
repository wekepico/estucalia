// api/useSpacesPage.ts

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getSpacesPage,
  type SpacesPageResponse,
  type Lang,
} from "@/services/spacesPageService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const useSpacesPage = (): UseQueryResult<SpacesPageResponse, Error> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  return useQuery({
    queryKey: ["spaces-page", lang],
    queryFn: () => getSpacesPage(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
