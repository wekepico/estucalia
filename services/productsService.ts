import axiosInstance from './axiosConfig';
import { getImageUrl } from '@/lib/i18nHelpers';

// Interface para objetos de traducción que vienen del backend
interface LocalizedObject {
  es?: string;
  en?: string;
  fr?: string;
}

// Interface para documentos del producto (como vienen del backend)
interface ProductDocumentRaw {
  id: number;
  product_id: number;
  name: string;
  file_path: string;
  file_type: string;
  order: number;
  created_at: string;
  updated_at: string;
  file_url?: string; // URL completa del archivo (puede venir del backend)
}

// Interface para la categoría embebida en el producto
interface ProductCategoryRaw {
  id: number;
  name: string;
  slug: string;
}

// Interface para la respuesta raw de la API
interface ProductRaw {
  id: number;
  slug: string;
  name?: string | null;
  subtitle?: string | null;
  category_id?: number | null;
  // El backend puede enviar 'image' o 'image_url'
  image?: string | null;
  image_url?: string | null;
  // image_alt e image_title pueden ser objetos {es, en, fr} o strings
  image_alt?: LocalizedObject | string | null;
  image_title?: LocalizedObject | string | null;
  // Campos de composición por idioma
  composition_es?: string | null;
  composition_en?: string | null;
  composition_fr?: string | null;
  // Campos de características por idioma
  features_es?: string | null;
  features_en?: string | null;
  features_fr?: string | null;
  // Campos adicionales
  presentation?: string | null;
  pallet_info?: string | null;
  storage_info?: string | null;
  order?: number;
  // Categoría embebida
  category?: ProductCategoryRaw | null;
  // Documentos del producto
  documents?: ProductDocumentRaw[];
  // Campos legacy (por compatibilidad)
  name_es?: string | null;
  name_en?: string | null;
  name_fr?: string | null;
  description_es?: string | null;
  description_en?: string | null;
  description_fr?: string | null;
  short_description_es?: string | null;
  short_description_en?: string | null;
  short_description_fr?: string | null;
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

// Interface para documentos normalizados
export interface ProductDocument {
  id: number;
  product_id: number;
  name: string;
  file_path: string;
  file_url?: string;
  file_type: string;
  order: number;
  created_at: string;
  updated_at: string;
}

// Interface para la categoría del producto
export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

// Interface normalizada para uso interno
export interface Product {
  id: number;
  slug: string;
  name: string | null;
  subtitle: string | null;
  category_id: number | null;
  image_url: string | null;
  image?: string | null; // Campo legacy, puede venir del backend como 'image' o 'image_url'
  image_alt?: LocalizedObject | string | null; // Puede venir como objeto {es, en, fr} o string
  image_title?: LocalizedObject | string | null; // Puede venir como objeto {es, en, fr} o string
  image_alt_es: string | null;
  image_alt_en: string | null;
  image_alt_fr: string | null;
  image_title_es: string | null;
  image_title_en: string | null;
  image_title_fr: string | null;
  // Composición por idioma
  composition_es: string | null;
  composition_en: string | null;
  composition_fr: string | null;
  // Características por idioma
  features_es: string | null;
  features_en: string | null;
  features_fr: string | null;
  // Campos adicionales
  presentation: string | null;
  pallet_info: string | null;
  storage_info: string | null;
  order: number;
  // Categoría embebida
  category: ProductCategory | null;
  // Documentos del producto
  documents: ProductDocument[];
  // Campos legacy (por compatibilidad)
  name_es: string | null;
  name_en: string | null;
  name_fr: string | null;
  description_es: string | null;
  description_en: string | null;
  description_fr: string | null;
  short_description_es: string | null;
  short_description_en: string | null;
  short_description_fr: string | null;
  price: number | null;
  stock: number | null;
  featured: boolean;
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
 * Normaliza un documento del producto y concatena URL base
 * Usa file_url si está disponible (viene del backend), sino construye la URL
 */
function normalizeDocument(doc: ProductDocumentRaw): ProductDocument {
  const normalizedFileUrl = doc.file_url || getImageUrl(doc.file_path) || doc.file_path;

  return {
    id: doc.id,
    product_id: doc.product_id,
    name: doc.name,
    // Usar file_url si está disponible, sino construir con getImageUrl
    file_path: normalizedFileUrl,
    file_url: normalizedFileUrl,
    file_type: doc.file_type,
    order: doc.order,
    created_at: doc.created_at,
    updated_at: doc.updated_at,
  };
}

/**
 * Normaliza un producto raw del backend al formato esperado por el frontend
 * - Convierte 'image' a 'image_url'
 * - Concatena la URL base a las imágenes y documentos
 * - Maneja campos localizados como objetos {es, en, fr}
 */
function normalizeProduct(raw: ProductRaw): Product {
  const rawImageUrl = raw.image_url || raw.image || null;

  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name || null,
    subtitle: raw.subtitle || null,
    category_id: raw.category_id || null,
    image_url: getImageUrl(rawImageUrl),
    // Manejar image_alt como objeto o string
    image_alt_es: getLocalizedValue(raw.image_alt, 'es'),
    image_alt_en: getLocalizedValue(raw.image_alt, 'en'),
    image_alt_fr: getLocalizedValue(raw.image_alt, 'fr'),
    // Manejar image_title como objeto o string
    image_title_es: getLocalizedValue(raw.image_title, 'es'),
    image_title_en: getLocalizedValue(raw.image_title, 'en'),
    image_title_fr: getLocalizedValue(raw.image_title, 'fr'),
    // Composición
    composition_es: raw.composition_es || null,
    composition_en: raw.composition_en || null,
    composition_fr: raw.composition_fr || null,
    // Características
    features_es: raw.features_es || null,
    features_en: raw.features_en || null,
    features_fr: raw.features_fr || null,
    // Campos adicionales
    presentation: raw.presentation || null,
    pallet_info: raw.pallet_info || null,
    storage_info: raw.storage_info || null,
    order: raw.order || 0,
    // Categoría embebida
    category: raw.category ? {
      id: raw.category.id,
      name: raw.category.name,
      slug: raw.category.slug,
    } : null,
    // Documentos normalizados
    documents: (raw.documents || []).map(normalizeDocument),
    // Campos legacy
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

export interface ProductsResponse {
  data: Product[];
  meta?: {
    total: number;
    page: number;
    per_page: number;
  };
}

export interface ProductResponse {
  data: Product;
}

export interface ProductDocumentsResponse {
  data: ProductDocument[];
}

export interface SearchParams {
  q: string;
  page?: number;
  per_page?: number;
}

/**
 * Obtiene todos los productos
 * GET /api/v1/products
 * @returns Promise con la lista de productos (normalizados)
 */
export const getProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await axiosInstance.get<{ success: boolean; data: ProductRaw[]; message?: string }>('/v1/products');
    const normalizedData = response.data.data.map(normalizeProduct);
    return {
      data: normalizedData,
      meta: (response.data as any).meta,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Obtiene un producto específico por slug
 * GET /api/v1/products/{slug}
 * @param slug - Identificador único del producto
 * @returns Promise con los datos del producto (normalizado)
 */
export const getProductBySlug = async (slug: string): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<{ success: boolean; data: ProductRaw; message?: string }>(`/v1/products/${slug}`);
    return {
      data: normalizeProduct(response.data.data),
    };
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    throw error;
  }
};

/**
 * Obtiene los documentos de un producto específico
 * GET /api/v1/products/{slug}/documents
 * @param slug - Identificador único del producto
 * @returns Promise con los documentos del producto
 */
export const getProductDocuments = async (slug: string): Promise<ProductDocumentsResponse> => {
  try {
    const response = await axiosInstance.get<{ 
      success: boolean; 
      data: {
        product?: any;
        documents: ProductDocumentRaw[];
      } | ProductDocumentRaw[];
      message?: string;
    }>(`/v1/products/${slug}/documents`);
    
    // La estructura real es: { success: true, data: { product: {...}, documents: [...] } }
    let documentsArray: ProductDocumentRaw[] = [];
    
    if (response.data.data) {
      // Caso 1: response.data.data.documents existe (estructura real del backend)
      if (typeof response.data.data === 'object' && 'documents' in response.data.data && Array.isArray(response.data.data.documents)) {
        documentsArray = response.data.data.documents;
      }
      // Caso 2: response.data.data es directamente un array (fallback)
      else if (Array.isArray(response.data.data)) {
        documentsArray = response.data.data;
      }
    }
    
    // Normalizar documentos - usar file_url si existe, sino construir con getImageUrl
    const normalizedDocuments = documentsArray.map((doc: any) => ({
      id: doc.id,
      product_id: doc.product_id,
      name: doc.name,
      file_path: doc.file_url || getImageUrl(doc.file_path) || doc.file_path,
      file_url: doc.file_url || getImageUrl(doc.file_path) || doc.file_path,
      file_type: doc.file_type,
      order: doc.order,
      created_at: doc.created_at,
      updated_at: doc.updated_at,
    }));
    
    return {
      data: normalizedDocuments,
    };
  } catch (error) {
    console.error(`Error fetching documents for product ${slug}:`, error);
    throw error;
  }
};

/**
 * Obtiene productos por categoría
 * GET /api/v1/products/category/{slug}
 * @param categorySlug - Identificador único de la categoría
 * @returns Promise con los productos de la categoría (normalizados)
 */
export const getProductsByCategory = async (categorySlug: string): Promise<ProductsResponse> => {
  try {
    const response = await axiosInstance.get<{ success: boolean; data: ProductRaw[]; message?: string }>(`/v1/products/category/${categorySlug}`);
    const normalizedData = response.data.data.map(normalizeProduct);
    return {
      data: normalizedData,
      meta: (response.data as any).meta,
    };
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    throw error;
  }
};

/**
 * Busca productos por término de búsqueda
 * GET /api/v1/search?q=term
 * @param params - Parámetros de búsqueda (q: término, page, per_page)
 * @returns Promise con los resultados de la búsqueda (normalizados)
 */
export const searchProducts = async (params: SearchParams): Promise<ProductsResponse> => {
  try {
    const response = await axiosInstance.get<{ success: boolean; data: ProductRaw[]; message?: string }>('/v1/search', {
      params: {
        q: params.q,
        page: params.page,
        per_page: params.per_page,
      },
    });
    const normalizedData = response.data.data.map(normalizeProduct);
    return {
      data: normalizedData,
      meta: (response.data as any).meta,
    };
  } catch (error) {
    console.error(`Error searching products with term "${params.q}":`, error);
    throw error;
  }
};
