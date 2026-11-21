import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getCookiesData, type CookiesData } from '@/services/cookiesService';

/**
 * Hook personalizado para obtener los datos de cookies usando TanStack Query
 * @returns UseQueryResult con los datos de cookies
 */
export const useCookies = (): UseQueryResult<CookiesData, Error> => {
  return useQuery({
    queryKey: ['cookies'],
    queryFn: getCookiesData,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Keys de query para usar en invalidaciones o prefetch
 */
export const cookiesKeys = {
  all: ['cookies'] as const,
  detail: () => [...cookiesKeys.all] as const,
};
