// api/useContactPage.ts

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getContactPage,
  type ContactPageData,
  type Lang,
} from "@/services/contactPageService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const contactPageKeys = {
  all: ["contact-page"] as const,
  detail: (lang: Lang) => [...contactPageKeys.all, lang] as const,
};

export const useContactPage = (): UseQueryResult<ContactPageData, Error> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  return useQuery({
    queryKey: contactPageKeys.detail(lang),
    queryFn: () => getContactPage(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
