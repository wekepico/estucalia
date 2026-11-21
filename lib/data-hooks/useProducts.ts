import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  getProducts,
  getProductBySlug,
  getProductDocuments,
  getProductsByCategory,
  searchProducts,
  type ProductsResponse,
  type ProductResponse,
  type ProductDocumentsResponse,
  type SearchParams,
} from '@/services/productsService';

/**
 * Hook para obtener todos los productos
 * @returns UseQueryResult con la lista de productos
 */
export const useProducts = (): UseQueryResult<ProductsResponse, Error> => {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook para obtener un producto específico por slug
 * @param slug - Identificador único del producto
 * @param enabled - Si el query debe ejecutarse automáticamente (default: true cuando hay slug)
 * @returns UseQueryResult con los datos del producto
 */
export const useProductBySlug = (
  slug: string,
  enabled: boolean = true
): UseQueryResult<ProductResponse, Error> => {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => getProductBySlug(slug),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled && !!slug,
  });
};

/**
 * Hook para obtener los documentos de un producto
 * @param slug - Identificador único del producto
 * @param enabled - Si el query debe ejecutarse automáticamente (default: true cuando hay slug)
 * @returns UseQueryResult con los documentos del producto
 */
export const useProductDocuments = (
  slug: string,
  enabled: boolean = true
): UseQueryResult<ProductDocumentsResponse, Error> => {
  return useQuery({
    queryKey: productKeys.documents(slug),
    queryFn: () => getProductDocuments(slug),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled && !!slug,
  });
};

/**
 * Hook para obtener productos por categoría
 * @param categorySlug - Identificador único de la categoría
 * @param enabled - Si el query debe ejecutarse automáticamente (default: true cuando hay slug)
 * @returns UseQueryResult con los productos de la categoría
 */
export const useProductsByCategory = (
  categorySlug: string,
  enabled: boolean = true
): UseQueryResult<ProductsResponse, Error> => {
  return useQuery({
    queryKey: productKeys.byCategory(categorySlug),
    queryFn: () => getProductsByCategory(categorySlug),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled && !!categorySlug,
  });
};

/**
 * Hook para buscar productos
 * @param params - Parámetros de búsqueda (q: término, page, per_page)
 * @param enabled - Si el query debe ejecutarse automáticamente (default: true cuando hay término)
 * @returns UseQueryResult con los resultados de la búsqueda
 */
export const useSearchProducts = (
  params: SearchParams,
  enabled: boolean = true
): UseQueryResult<ProductsResponse, Error> => {
  return useQuery({
    queryKey: productKeys.search(params),
    queryFn: () => searchProducts(params),
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
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (slug: string) => [...productKeys.details(), slug] as const,
  documents: (slug: string) => [...productKeys.detail(slug), 'documents'] as const,
  byCategory: (categorySlug: string) => [...productKeys.all, 'category', categorySlug] as const,
  search: (params: SearchParams) => [...productKeys.all, 'search', params] as const,
};
