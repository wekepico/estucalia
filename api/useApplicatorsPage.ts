import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getApplicatorsPage,
  type ApplicatorsData,
  type Lang,
} from "@/services/applicatorsPageService";

export const applicatorsKeys = {
  all: ["applicators-page"] as const,
  detail: (lang: Lang) => [...applicatorsKeys.all, lang] as const,
};

export const useApplicatorsPage = (
  lang: Lang = "es",
): UseQueryResult<ApplicatorsData, Error> => {
  return useQuery({
    queryKey: applicatorsKeys.detail(lang),
    queryFn: () => getApplicatorsPage(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!lang,
  });
};
