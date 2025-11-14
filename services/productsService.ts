import axiosInstance from './axiosConfig';

// Interfaces para tipar las respuestas
export interface Product {
  id: number;
  slug: string;
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

export interface ProductDocument {
  id: number;
  product_id: number;
  title_es: string | null;
  title_en: string | null;
  title_fr: string | null;
  description_es: string | null;
  description_en: string | null;
  description_fr: string | null;
  file_url: string;
  file_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
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
 * @returns Promise con la lista de productos
 */
export const getProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await axiosInstance.get<ProductsResponse>('/v1/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Obtiene un producto específico por slug
 * GET /api/v1/products/{slug}
 * @param slug - Identificador único del producto
 * @returns Promise con los datos del producto
 */
export const getProductBySlug = async (slug: string): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`/v1/products/${slug}`);
    return response.data;
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
    const response = await axiosInstance.get<ProductDocumentsResponse>(`/v1/products/${slug}/documents`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching documents for product ${slug}:`, error);
    throw error;
  }
};

/**
 * Obtiene productos por categoría
 * GET /api/v1/products/category/{slug}
 * @param categorySlug - Identificador único de la categoría
 * @returns Promise con los productos de la categoría
 */
export const getProductsByCategory = async (categorySlug: string): Promise<ProductsResponse> => {
  try {
    const response = await axiosInstance.get<ProductsResponse>(`/v1/products/category/${categorySlug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    throw error;
  }
};

/**
 * Busca productos por término de búsqueda
 * GET /api/v1/search?q=term
 * @param params - Parámetros de búsqueda (q: término, page, per_page)
 * @returns Promise con los resultados de la búsqueda
 */
export const searchProducts = async (params: SearchParams): Promise<ProductsResponse> => {
  try {
    const response = await axiosInstance.get<ProductsResponse>('/v1/search', {
      params: {
        q: params.q,
        page: params.page,
        per_page: params.per_page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching products with term "${params.q}":`, error);
    throw error;
  }
};
