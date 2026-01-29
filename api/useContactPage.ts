import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getContactPage,
  type ContactPageData,
  type Lang,
} from "@/services/contactPageService";

export const contactPageKeys = {
  all: ["contact-page"] as const,
  detail: (lang: Lang) => [...contactPageKeys.all, lang] as const,
};

export const useContactPage = (
  lang: Lang = "es",
): UseQueryResult<ContactPageData, Error> => {
  return useQuery({
    queryKey: contactPageKeys.detail(lang),
    queryFn: () => getContactPage(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!lang,
  });
};
