// api/useCertificationsDocumentationPage.ts

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getCertificationsDocumentationPage,
  type CertificationsDocumentationData,
  type Lang,
} from "@/services/certificationsDocumentationPageService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const certificationsDocumentationKeys = {
  all: ["certifications-documentation-page"] as const,
  detail: (lang: Lang) =>
    [...certificationsDocumentationKeys.all, lang] as const,
};

export const useCertificationsDocumentationPage = (): UseQueryResult<
  CertificationsDocumentationData,
  Error
> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  console.log("🔍 [HOOK] language from context:", language);
  console.log("🔍 [HOOK] normalized lang:", lang);

  return useQuery({
    queryKey: certificationsDocumentationKeys.detail(lang),
    queryFn: async () => {
      console.log("🔍 [HOOK] fetching data for lang:", lang);
      try {
        const result = await getCertificationsDocumentationPage(lang);
        console.log("🔍 [HOOK] data received:", result);
        return result;
      } catch (error) {
        console.error("🔍 [HOOK] error fetching:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
