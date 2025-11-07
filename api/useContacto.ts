import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getContactoData, type ContactoData } from '@/services/contactoService';

/**
 * Hook personalizado para obtener los datos de contacto usando TanStack Query
 * @returns UseQueryResult con los datos de contacto
 */
export const useContacto = (): UseQueryResult<ContactoData, Error> => {
  return useQuery({
    queryKey: ['contacto'],
    queryFn: getContactoData,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Keys de query para usar en invalidaciones o prefetch
 */
export const contactoKeys = {
  all: ['contacto'] as const,
  detail: () => [...contactoKeys.all] as const,
};
