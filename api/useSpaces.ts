// api/useSpaces.ts

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getSpaces,
  getSpaceBySlug,
  type Space,
} from "@/services/spacesService";
import { useLanguage } from "@/app/context/LanguageContext";

export const spaceKeys = {
  all: ["spaces"] as const,
  detail: (slug: string, lang?: string) =>
    [...spaceKeys.all, "detail", slug, lang].filter(Boolean) as const,
};

export const useSpaces = (): UseQueryResult<
  Awaited<ReturnType<typeof getSpaces>>,
  Error
> => {
  return useQuery({
    queryKey: spaceKeys.all,
    queryFn: getSpaces,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

// 👇 NUEVO HOOK PARA OBTENER ESPACIO POR SLUG CON SEO
export const useSpaceBySlug = (slug: string, enabled: boolean = true) => {
  const { language } = useLanguage();

  return useQuery({
    queryKey: spaceKeys.detail(slug, language),
    queryFn: () => getSpaceBySlug(slug, language),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled && !!slug,
  });
};
