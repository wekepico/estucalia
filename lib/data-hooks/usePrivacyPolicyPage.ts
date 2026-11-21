// api/usePrivacyPolicyPage.ts

"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getPrivacyPolicyPage,
  type PrivacyPolicyApiResponse,
  type Lang,
} from "@/services/privacyPolicyService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const usePrivacyPolicyPage = (): UseQueryResult<
  PrivacyPolicyApiResponse,
  Error
> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  console.log("🔒 [PRIVACY HOOK] language:", language, "lang:", lang);

  return useQuery({
    queryKey: ["privacy-policy", lang],
    queryFn: () => {
      console.log("🔒 [PRIVACY HOOK] fetching for lang:", lang);
      return getPrivacyPolicyPage(lang);
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
