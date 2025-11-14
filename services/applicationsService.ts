import axiosInstance from './axiosConfig';

// Interfaces para tipar las respuestas
export interface Application {
  id: number;
  slug: string;
  name_es: string | null;
  name_en: string | null;
  name_fr: string | null;
  description_es: string | null;
  description_en: string | null;
  description_fr: string | null;
  image_url: string | null;
  image_alt_es: string | null;
  image_alt_en: string | null;
  image_alt_fr: string | null;
  image_title_es: string | null;
  image_title_en: string | null;
  image_title_fr: string | null;
  seo_title_es: string | null;
  seo_title_en: string | null;
  seo_title_fr: string | null;
  seo_description_es: string | null;
  seo_description_en: string | null;
  seo_description_fr: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  slug: string;
  name_es: string | null;
  name_en: string | null;
  name_fr: string | null;
  description_es: string | null;
  description_en: string | null;
  description_fr: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicationsResponse {
  data: Application[];
  meta?: {
    total: number;
    page: number;
    per_page: number;
  };
}

export interface ApplicationResponse {
  data: Application;
}

export interface CategoriesResponse {
  data: Category[];
}

/**
 * Obtiene todas las aplicaciones
 * GET /api/v1/applications
 * @returns Promise con la lista de aplicaciones
 */
export const getApplications = async (): Promise<ApplicationsResponse> => {
  try {
    const response = await axiosInstance.get<ApplicationsResponse>('/v1/applications');
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

/**
 * Obtiene una aplicación específica por slug
 * GET /api/v1/applications/{slug}
 * @param slug - Identificador único de la aplicación
 * @returns Promise con los datos de la aplicación
 */
export const getApplicationBySlug = async (slug: string): Promise<ApplicationResponse> => {
  try {
    const response = await axiosInstance.get<ApplicationResponse>(`/v1/applications/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching application ${slug}:`, error);
    throw error;
  }
};

/**
 * Obtiene las categorías de una aplicación específica
 * GET /api/v1/applications/{slug}/categories
 * @param slug - Identificador único de la aplicación
 * @returns Promise con las categorías de la aplicación
 */
export const getApplicationCategories = async (slug: string): Promise<CategoriesResponse> => {
  try {
    const response = await axiosInstance.get<CategoriesResponse>(`/v1/applications/${slug}/categories`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching categories for application ${slug}:`, error);
    throw error;
  }
};
