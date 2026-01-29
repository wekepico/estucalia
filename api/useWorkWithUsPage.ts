import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import {
  getWorkWithUsPage,
  type WorkWithUsPageData,
} from "@/services/workWithUsPageService";
import type { Lang } from "@/services/contactPageService";

export const workWithUsKeys = {
  all: ["work-with-us-page"] as const,
  detail: (lang: Lang) => [...workWithUsKeys.all, lang] as const,
};

export const useWorkWithUsPage = (
  lang: Lang = "es",
): UseQueryResult<WorkWithUsPageData, Error> => {
  return useQuery({
    queryKey: workWithUsKeys.detail(lang),
    queryFn: () => getWorkWithUsPage(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!lang,
  });
};
