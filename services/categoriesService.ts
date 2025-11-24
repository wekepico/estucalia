import axiosInstance from './axiosConfig';
import type { Application } from './applicationsService';
import type { Product } from './productsService';
import { getImageUrl } from '@/lib/i18nHelpers';

// Re-exportar Product desde productsService para mantener compatibilidad
export type { Product } from './productsService';

// Interface para objetos de traducción que vienen del backend
interface LocalizedObject {
  es?: string;
  en?: string;
  fr?: string;
}

// Interface raw para productos que vienen en las respuestas de categorías
interface ProductRaw {
  id: number;
  slug: string;
  name?: string | null;
  subtitle?: string | null;
  category_id?: number | null;
  name_es?: string | null;
  name_en?: string | null;
  name_fr?: string | null;
  description_es?: string | null;
  description_en?: string | null;
  description_fr?: string | null;
  short_description_es?: string | null;
  short_description_en?: string | null;
  short_description_fr?: string | null;
  composition_es?: string | null;
  composition_en?: string | null;
  composition_fr?: string | null;
  features_es?: string | null;
  features_en?: string | null;
  features_fr?: string | null;
  image?: string | null;
  image_url?: string | null;
  image_alt?: LocalizedObject | string | null;
  image_title?: LocalizedObject | string | null;
  presentation?: string | null;
  pallet_info?: string | null;
  storage_info?: string | null;
  order?: number;
  category?: { id: number; name: string; slug: string } | null;
  documents?: any[];
  price?: number | null;
  stock?: number | null;
  featured?: boolean;
  active?: boolean;
  seo_title_es?: string | null;
  seo_title_en?: string | null;
  seo_title_fr?: string | null;
  seo_description_es?: string | null;
  seo_description_en?: string | null;
  seo_description_fr?: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Extrae el valor localizado de un campo que puede ser objeto o string
 */
function getLocalizedValue(
  value: LocalizedObject | string | null | undefined,
  lang: 'es' | 'en' | 'fr'
): string | null {
  if (!value) return null;
  if (typeof value === 'string') return value;
  return value[lang] || null;
}

/**
 * Normaliza un producto raw para concatenar URL base a imágenes
 */
function normalizeProductFromCategory(raw: ProductRaw): import('./productsService').Product {
  const rawImageUrl = raw.image_url || raw.image || null;

  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name || null,
    subtitle: raw.subtitle || null,
    category_id: raw.category_id || null,
    image_url: getImageUrl(rawImageUrl),
    image_alt_es: getLocalizedValue(raw.image_alt, 'es'),
    image_alt_en: getLocalizedValue(raw.image_alt, 'en'),
    image_alt_fr: getLocalizedValue(raw.image_alt, 'fr'),
    image_title_es: getLocalizedValue(raw.image_title, 'es'),
    image_title_en: getLocalizedValue(raw.image_title, 'en'),
    image_title_fr: getLocalizedValue(raw.image_title, 'fr'),
    composition_es: raw.composition_es || null,
    composition_en: raw.composition_en || null,
    composition_fr: raw.composition_fr || null,
    features_es: raw.features_es || null,
    features_en: raw.features_en || null,
    features_fr: raw.features_fr || null,
    presentation: raw.presentation || null,
    pallet_info: raw.pallet_info || null,
    storage_info: raw.storage_info || null,
    order: raw.order || 0,
    category: raw.category ? {
      id: raw.category.id,
      name: raw.category.name,
      slug: raw.category.slug,
    } : null,
    documents: (raw.documents || []).map((doc: any) => ({
      id: doc.id,
      product_id: doc.product_id,
      name: doc.name,
      file_path: getImageUrl(doc.file_path) || doc.file_path,
      file_type: doc.file_type,
      order: doc.order,
      created_at: doc.created_at,
      updated_at: doc.updated_at,
    })),
    name_es: raw.name_es || raw.name || null,
    name_en: raw.name_en || raw.name || null,
    name_fr: raw.name_fr || raw.name || null,
    description_es: raw.description_es || raw.composition_es || null,
    description_en: raw.description_en || raw.composition_en || null,
    description_fr: raw.description_fr || raw.composition_fr || null,
    short_description_es: raw.short_description_es || raw.features_es || null,
    short_description_en: raw.short_description_en || raw.features_en || null,
    short_description_fr: raw.short_description_fr || raw.features_fr || null,
    price: raw.price ?? null,
    stock: raw.stock ?? null,
    featured: raw.featured ?? false,
    active: raw.active ?? true,
    seo_title_es: raw.seo_title_es || null,
    seo_title_en: raw.seo_title_en || null,
    seo_title_fr: raw.seo_title_fr || null,
    seo_description_es: raw.seo_description_es || null,
    seo_description_en: raw.seo_description_en || null,
    seo_description_fr: raw.seo_description_fr || null,
    created_at: raw.created_at || '',
    updated_at: raw.updated_at || '',
  };
}

// Interface para la respuesta raw de la API (tal como viene del backend)
interface CategoryRaw {
  id: number;
  slug: string;
  slug_es?: string | null;
  slug_en?: string | null;
  slug_fr?: string | null;
  name?: string | null;
  name_es?: string | null;
  name_en?: string | null;
  name_fr?: string | null;
  description_es?: string | null;
  description_en?: string | null;
  description_fr?: string | null;
  short_description_es?: string | null;
  short_description_en?: string | null;
  short_description_fr?: string | null;
  // El backend puede enviar 'image' o 'image_url'
  image?: string | null;
  image_url?: string | null;
  image_alt?: string | null;
  image_alt_es?: string | null;
  image_alt_en?: string | null;
  image_alt_fr?: string | null;
  image_title?: string | null;
  image_title_es?: string | null;
  image_title_en?: string | null;
  image_title_fr?: string | null;
  parent_id?: number | null;
  order: number;
  active?: boolean;
  seo_title_es?: string | null;
  seo_title_en?: string | null;
  seo_title_fr?: string | null;
  seo_description_es?: string | null;
  seo_description_en?: string | null;
  seo_description_fr?: string | null;
  created_at?: string;
  updated_at?: string;
  applications?: any[];
}

// Interface normalizada para uso interno
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

/**
 * Normaliza una categoría raw del backend al formato esperado por el frontend
 * - Convierte 'image' a 'image_url'
 * - Concatena la URL base a las imágenes
 */
function normalizeCategory(raw: CategoryRaw): Category {
  // Obtener la imagen (el backend puede enviar 'image' o 'image_url')
  const rawImageUrl = raw.image_url || raw.image || null;

  return {
    id: raw.id,
    slug: raw.slug,
    slug_es: raw.slug_es || null,
    slug_en: raw.slug_en || null,
    slug_fr: raw.slug_fr || null,
    name_es: raw.name_es || raw.name || null,
    name_en: raw.name_en || raw.name || null,
    name_fr: raw.name_fr || raw.name || null,
    description_es: raw.description_es || null,
    description_en: raw.description_en || null,
    description_fr: raw.description_fr || null,
    short_description_es: raw.short_description_es || null,
    short_description_en: raw.short_description_en || null,
    short_description_fr: raw.short_description_fr || null,
    // Concatenar URL base a la imagen
    image_url: getImageUrl(rawImageUrl),
    image_alt_es: raw.image_alt_es || raw.image_alt || null,
    image_alt_en: raw.image_alt_en || raw.image_alt || null,
    image_alt_fr: raw.image_alt_fr || raw.image_alt || null,
    image_title_es: raw.image_title_es || raw.image_title || null,
    image_title_en: raw.image_title_en || raw.image_title || null,
    image_title_fr: raw.image_title_fr || raw.image_title || null,
    parent_id: raw.parent_id || null,
    order: raw.order,
    active: raw.active ?? true,
    seo_title_es: raw.seo_title_es || null,
    seo_title_en: raw.seo_title_en || null,
    seo_title_fr: raw.seo_title_fr || null,
    seo_description_es: raw.seo_description_es || null,
    seo_description_en: raw.seo_description_en || null,
    seo_description_fr: raw.seo_description_fr || null,
    created_at: raw.created_at || '',
    updated_at: raw.updated_at || '',
  };
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
 * @returns Promise con la lista de categorías (normalizadas)
 */
export const getCategories = async (): Promise<CategoriesResponse> => {
  try {
    const response = await axiosInstance.get<{ success: boolean; data: CategoryRaw[]; message?: string }>('/v1/categories');
    // Normalizar cada categoría para unificar el formato
    const normalizedData = response.data.data.map(normalizeCategory);
    return {
      data: normalizedData,
      meta: (response.data as any).meta,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Obtiene una categoría específica por slug
 * GET /api/v1/categories/{slug}
 * @param slug - Identificador único de la categoría
 * @returns Promise con los datos de la categoría (normalizada)
 */
export const getCategoryBySlug = async (slug: string): Promise<CategoryResponse> => {
  try {
    const response = await axiosInstance.get<{ success: boolean; data: CategoryRaw; message?: string }>(`/v1/categories/${slug}`);
    return {
      data: normalizeCategory(response.data.data),
    };
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    throw error;
  }
};

/**
 * Obtiene los productos de una categoría específica
 * GET /api/v1/categories/{slug}/products
 * @param slug - Identificador único de la categoría
 * @returns Promise con los productos de la categoría (normalizados)
 */
export const getCategoryProducts = async (slug: string): Promise<CategoryProductsResponse> => {
  try {
    const response = await axiosInstance.get<{ success: boolean; data: ProductRaw[]; message?: string }>(`/v1/categories/${slug}/products`);
    const normalizedData = response.data.data.map(normalizeProductFromCategory);
    return {
      data: normalizedData,
      meta: (response.data as any).meta,
    };
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
 * @returns Promise con los resultados de la búsqueda (normalizadas)
 */
export const searchCategories = async (params: SearchCategoriesParams): Promise<CategoriesResponse> => {
  try {
    const response = await axiosInstance.get<{ success: boolean; data: CategoryRaw[]; message?: string }>('/v1/search/categories', {
      params: {
        q: params.q,
        page: params.page,
        per_page: params.per_page,
      },
    });
    // Normalizar cada categoría para unificar el formato
    const normalizedData = response.data.data.map(normalizeCategory);
    return {
      data: normalizedData,
      meta: (response.data as any).meta,
    };
  } catch (error) {
    console.error(`Error searching categories with term "${params.q}":`, error);
    throw error;
  }
};
