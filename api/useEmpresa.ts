import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getEmpresaData, type EmpresaData } from '@/services/empresaService';

/**
 * Hook personalizado para obtener los datos de empresa usando TanStack Query
 * @returns UseQueryResult con los datos de empresa
 */
export const useEmpresa = (): UseQueryResult<EmpresaData, Error> => {
  return useQuery({
    queryKey: ['empresa'],
    queryFn: getEmpresaData,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Keys de query para usar en invalidaciones o prefetch
 */
export const empresaKeys = {
  all: ['empresa'] as const,
  detail: () => [...empresaKeys.all] as const,
};
