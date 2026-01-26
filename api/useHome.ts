import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getHomeData, type HomeData } from '@/services/homeService';

/**
 * Hook personalizado para obtener los datos de home usando TanStack Query
 * @returns UseQueryResult con los datos de home
 */
export const useHome = (): UseQueryResult<HomeData, Error> => {
  return useQuery({
    queryKey: ['home'],
    queryFn: getHomeData,
    staleTime: 5 * 60 * 1000, // 5 minutos - los datos se consideran "frescos" durante este tiempo
    gcTime: 10 * 60 * 1000, // 10 minutos - tiempo que los datos permanecen en caché
    refetchOnMount: false, // No refetch automático al montar el componente
    refetchOnWindowFocus: false, // No refetch al hacer focus en la ventana
  });
};

/**
 * Keys de query para usar en invalidaciones o prefetch
 */
export const homeKeys = {
  all: ['home'] as const,
  detail: () => [...homeKeys.all] as const,
};
