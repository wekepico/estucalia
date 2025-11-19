import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  getApplications,
  getApplicationBySlug,
  getApplicationCategories,
  type ApplicationsResponse,
  type ApplicationResponse,
  type ApplicationCategoriesResponse,
} from '@/services/applicationsService';

/**
 * Hook para obtener todas las aplicaciones
 * @returns UseQueryResult con la lista de aplicaciones
 */
export const useApplications = (): UseQueryResult<ApplicationsResponse, Error> => {
  return useQuery({
    queryKey: applicationKeys.all,
    queryFn: getApplications,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook para obtener una aplicación específica por slug
 * @param slug - Identificador único de la aplicación
 * @param enabled - Si el query debe ejecutarse automáticamente (default: true cuando hay slug)
 * @returns UseQueryResult con los datos de la aplicación
 */
export const useApplicationBySlug = (
  slug: string,
  enabled: boolean = true
): UseQueryResult<ApplicationResponse, Error> => {
  return useQuery({
    queryKey: applicationKeys.detail(slug),
    queryFn: () => getApplicationBySlug(slug),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled && !!slug, // Solo ejecutar si está habilitado y hay slug
  });
};

/**
 * Hook para obtener las categorías de una aplicación
 * @param slug - Identificador único de la aplicación
 * @param enabled - Si el query debe ejecutarse automáticamente (default: true cuando hay slug)
 * @returns UseQueryResult con las categorías de la aplicación
 */
export const useApplicationCategories = (
  slug: string,
  enabled: boolean = true
): UseQueryResult<ApplicationCategoriesResponse, Error> => {
  return useQuery({
    queryKey: applicationKeys.categories(slug),
    queryFn: () => getApplicationCategories(slug),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled && !!slug,
  });
};

/**
 * Keys de query para usar en invalidaciones o prefetch
 */
export const applicationKeys = {
  all: ['applications'] as const,
  lists: () => [...applicationKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...applicationKeys.lists(), filters] as const,
  details: () => [...applicationKeys.all, 'detail'] as const,
  detail: (slug: string) => [...applicationKeys.details(), slug] as const,
  categories: (slug: string) => [...applicationKeys.detail(slug), 'categories'] as const,
};
