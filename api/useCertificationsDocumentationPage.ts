import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getCertificationsDocumentationPage,
  type CertificationsDocumentationData,
  type Lang,
} from "@/services/certificationsDocumentationPageService";

export const certificationsDocumentationKeys = {
  all: ["certifications-documentation-page"] as const,
  detail: (lang: Lang) =>
    [...certificationsDocumentationKeys.all, lang] as const,
};

export const useCertificationsDocumentationPage = (
  lang: Lang = "es",
): UseQueryResult<CertificationsDocumentationData, Error> => {
  return useQuery({
    queryKey: certificationsDocumentationKeys.detail(lang),
    queryFn: () => getCertificationsDocumentationPage(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!lang,
  });
};
