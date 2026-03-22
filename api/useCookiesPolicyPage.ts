// api/useCookiesPolicyPage.ts

"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getCookiesPolicyPage,
  type CookiesPolicyApiResponse,
  type Lang,
} from "@/services/cookiesPolicyService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const useCookiesPolicyPage = (): UseQueryResult<
  CookiesPolicyApiResponse,
  Error
> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  console.log("🍪 [COOKIES HOOK] language:", language, "lang:", lang);

  return useQuery({
    queryKey: ["cookies-policy", lang],
    queryFn: () => {
      console.log("🍪 [COOKIES HOOK] fetching for lang:", lang);
      return getCookiesPolicyPage(lang);
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
