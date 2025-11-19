import axiosInstance from './axiosConfig';
import type { Product } from './productsService';
import type { Application } from './applicationsService';

// Interfaces para tipar las respuestas
export interface Category {
  id: number;
  slug: string;
  slug_es: string | null;
  slug_en: string | null;
  slug_fr: string | null;
  name_es: string | null;
  name_en: string | null;
  name_fr: string | null;
  description_es: string | null;
  description_en: string | null;
  description_fr: string | null;
  short_description_es: string | null;
  short_description_en: string | null;
  short_description_fr: string | null;
  image_url: string | null;
  image_alt_es: string | null;
  image_alt_en: string | null;
  image_alt_fr: string | null;
  image_title_es: string | null;
  image_title_en: string | null;
  image_title_fr: string | null;
  parent_id: number | null;
  order: number;
  active: boolean;
  seo_title_es: string | null;
  seo_title_en: string | null;
  seo_title_fr: string | null;
  seo_description_es: string | null;
  seo_description_en: string | null;
  seo_description_fr: string | null;
  created_at: string;
  updated_at: string;
}

export interface CategoriesResponse {
  data: Category[];
  meta?: {
    total: number;
    page: number;
    per_page: number;
  };
}

export interface CategoryResponse {
  data: Category;
}

export interface CategoryProductsResponse {
  data: Product[];
  meta?: {
    total: number;
    page: number;
    per_page: number;
  };
}

export interface CategoryApplicationsResponse {
  data: Application[];
  meta?: {
    total: number;
    page: number;
    per_page: number;
  };
}

export interface SearchCategoriesParams {
  q: string;
  page?: number;
  per_page?: number;
}

/**
 * Obtiene todas las categorías
 * GET /api/v1/categories
 * @returns Promise con la lista de categorías
 */
export const getCategories = async (): Promise<CategoriesResponse> => {
  try {
    const response = await axiosInstance.get<CategoriesResponse>('/v1/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Obtiene una categoría específica por slug
 * GET /api/v1/categories/{slug}
 * @param slug - Identificador único de la categoría
 * @returns Promise con los datos de la categoría
 */
export const getCategoryBySlug = async (slug: string): Promise<CategoryResponse> => {
  try {
    const response = await axiosInstance.get<CategoryResponse>(`/v1/categories/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    throw error;
  }
};

/**
 * Obtiene los productos de una categoría específica
 * GET /api/v1/categories/{slug}/products
 * @param slug - Identificador único de la categoría
 * @returns Promise con los productos de la categoría
 */
export const getCategoryProducts = async (slug: string): Promise<CategoryProductsResponse> => {
  try {
    const response = await axiosInstance.get<CategoryProductsResponse>(`/v1/categories/${slug}/products`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${slug}:`, error);
    throw error;
  }
};

/**
 * Obtiene las aplicaciones de una categoría específica
 * GET /api/v1/categories/{slug}/applications
 * @param slug - Identificador único de la categoría
 * @returns Promise con las aplicaciones de la categoría
 */
export const getCategoryApplications = async (slug: string): Promise<CategoryApplicationsResponse> => {
  try {
    const response = await axiosInstance.get<CategoryApplicationsResponse>(`/v1/categories/${slug}/applications`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching applications for category ${slug}:`, error);
    throw error;
  }
};

/**
 * Busca categorías por término de búsqueda
 * GET /api/v1/search/categories?q=term
 * @param params - Parámetros de búsqueda (q: término, page, per_page)
 * @returns Promise con los resultados de la búsqueda
 */
export const searchCategories = async (params: SearchCategoriesParams): Promise<CategoriesResponse> => {
  try {
    const response = await axiosInstance.get<CategoriesResponse>('/v1/search/categories', {
      params: {
        q: params.q,
        page: params.page,
        per_page: params.per_page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching categories with term "${params.q}":`, error);
    throw error;
  }
};
