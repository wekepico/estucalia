import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  getCategories,
  getCategoryBySlug,
  getCategoryProducts,
  getCategoryApplications,
  searchCategories,
  type CategoriesResponse,
  type CategoryResponse,
  type CategoryProductsResponse,
  type CategoryApplicationsResponse,
  type SearchCategoriesParams,
} from '@/services/categoriesService';

/**
 * Hook para obtener todas las categorías
 * @returns UseQueryResult con la lista de categorías
 */
export const useCategories = (): UseQueryResult<CategoriesResponse, Error> => {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook para obtener una categoría específica por slug
 * @param slug - Identificador único de la categoría
 * @param enabled - Si el query debe ejecutarse automáticamente (default: true cuando hay slug)
 * @returns UseQueryResult con los datos de la categoría
 */
export const useCategoryBySlug = (
  slug: string,
  enabled: boolean = true
): UseQueryResult<CategoryResponse, Error> => {
  return useQuery({
    queryKey: categoryKeys.detail(slug),
    queryFn: () => getCategoryBySlug(slug),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled && !!slug,
  });
};

/**
 * Hook para obtener los productos de una categoría
 * @param slug - Identificador único de la categoría
 * @param enabled - Si el query debe ejecutarse automáticamente (default: true cuando hay slug)
 * @returns UseQueryResult con los productos de la categoría
 */
export const useCategoryProducts = (
  slug: string,
  enabled: boolean = true
): UseQueryResult<CategoryProductsResponse, Error> => {
  return useQuery({
    queryKey: categoryKeys.products(slug),
    queryFn: () => getCategoryProducts(slug),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled && !!slug,
  });
};

/**
 * Hook para obtener las aplicaciones de una categoría
 * @param slug - Identificador único de la categoría
 * @param enabled - Si el query debe ejecutarse automáticamente (default: true cuando hay slug)
 * @returns UseQueryResult con las aplicaciones de la categoría
 */
export const useCategoryApplications = (
  slug: string,
  enabled: boolean = true
): UseQueryResult<CategoryApplicationsResponse, Error> => {
  return useQuery({
    queryKey: categoryKeys.applications(slug),
    queryFn: () => getCategoryApplications(slug),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled && !!slug,
  });
};

/**
 * Hook para buscar categorías
 * @param params - Parámetros de búsqueda (q: término, page, per_page)
 * @param enabled - Si el query debe ejecutarse automáticamente (default: true cuando hay término)
 * @returns UseQueryResult con los resultados de la búsqueda
 */
export const useSearchCategories = (
  params: SearchCategoriesParams,
  enabled: boolean = true
): UseQueryResult<CategoriesResponse, Error> => {
  return useQuery({
    queryKey: categoryKeys.search(params),
    queryFn: () => searchCategories(params),
    staleTime: 2 * 60 * 1000, // 2 minutos (búsquedas se invalidan más rápido)
    gcTime: 5 * 60 * 1000, // 5 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled && !!params.q && params.q.length > 0,
  });
};

/**
 * Keys de query para usar en invalidaciones o prefetch
 */
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...categoryKeys.lists(), filters] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (slug: string) => [...categoryKeys.details(), slug] as const,
  products: (slug: string) => [...categoryKeys.detail(slug), 'products'] as const,
  applications: (slug: string) => [...categoryKeys.detail(slug), 'applications'] as const,
  search: (params: SearchCategoriesParams) => [...categoryKeys.all, 'search', params] as const,
};
