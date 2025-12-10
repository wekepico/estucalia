import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getLegalData, type LegalData } from '@/services/legalService';

/**
 * Hook personalizado para obtener los datos legales usando TanStack Query
 * @returns UseQueryResult con los datos legales
 */
export const useLegal = (): UseQueryResult<LegalData, Error> => {
  return useQuery({
    queryKey: ['legal'],
    queryFn: getLegalData,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Keys de query para usar en invalidaciones o prefetch
 */
export const legalKeys = {
  all: ['legal'] as const,
  detail: () => [...legalKeys.all] as const,
};
