import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getPrivacidadData, type PrivacidadData } from '@/services/privacidadService';

/**
 * Hook personalizado para obtener los datos de privacidad usando TanStack Query
 * @returns UseQueryResult con los datos de privacidad
 */
export const usePrivacidad = (): UseQueryResult<PrivacidadData, Error> => {
  return useQuery({
    queryKey: ['privacidad'],
    queryFn: getPrivacidadData,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Keys de query para usar en invalidaciones o prefetch
 */
export const privacidadKeys = {
  all: ['privacidad'] as const,
  detail: () => [...privacidadKeys.all] as const,
};
