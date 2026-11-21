// api/useLegal.ts

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getLegalNoticePage,
  type LegalNoticeApiResponse,
} from "@/services/legalService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): "es" | "en" | "fr" =>
  l === "en" || l === "fr" ? l : "es";

export const useLegal = (): UseQueryResult<LegalNoticeApiResponse, Error> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  console.log("⚖️ [LEGAL HOOK] language:", language, "lang:", lang);

  return useQuery({
    queryKey: ["legal", lang],
    queryFn: () => {
      console.log("⚖️ [LEGAL HOOK] fetching for lang:", lang);
      return getLegalNoticePage(lang);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
