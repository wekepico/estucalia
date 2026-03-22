// api/useApplicationsPage.ts

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getApplicationsPage,
  type ApplicationsPageResponse,
  type Lang,
} from "@/services/applicationsPageService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const useApplicationsPage = (): UseQueryResult<
  ApplicationsPageResponse,
  Error
> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  console.log("📱 [APPLICATIONS HOOK] language:", language, "lang:", lang);

  return useQuery({
    queryKey: ["applications-page", lang],
    queryFn: () => {
      console.log("📱 [APPLICATIONS HOOK] fetching for lang:", lang);
      return getApplicationsPage(lang);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
