"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getLegalNoticePage,
  type LegalNoticeApiResponse,
  type Lang,
} from "@/services/legalNoticeService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const useLegalNoticePage = (): UseQueryResult<
  LegalNoticeApiResponse,
  Error
> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  return useQuery({
    queryKey: ["legal-notice", lang],
    queryFn: () => getLegalNoticePage(lang),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
