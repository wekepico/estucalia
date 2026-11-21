"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getFooterData,
  type FooterApiResponse,
  type Lang,
} from "@/services/footerService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const useFooter = (): UseQueryResult<FooterApiResponse, Error> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  return useQuery({
    queryKey: ["footer", lang],
    queryFn: () => getFooterData(lang),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
