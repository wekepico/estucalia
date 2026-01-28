import axiosInstance from "./axiosConfig";
import { getImageUrl } from "@/lib/i18nHelpers";
import { Category } from "./categoriesService";

// Interface raw para la respuesta del backend
interface ApplicationRaw {
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
  image?: string | null;
  image_url?: string | null;
  icon?: string | null;
  icon_url?: string | null;
  image_alt?:
    | string
    | { en?: string | null; es?: string | null; fr?: string | null }
    | null;
  image_alt_es?: string | null;
  image_alt_en?: string | null;
  image_alt_fr?: string | null;
  image_title?:
    | string
    | { en?: string | null; es?: string | null; fr?: string | null }
    | null;
  image_title_es?: string | null;
  image_title_en?: string | null;
  image_title_fr?: string | null;
  seo_title_es?: string | null;
  seo_title_en?: string | null;
  seo_title_fr?: string | null;
  seo_description_es?: string | null;
  seo_description_en?: string | null;
  seo_description_fr?: string | null;
  categories?: any[];
  created_at?: string;
  updated_at?: string;
}

// Interface normalizada para uso interno
export interface Application {
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
  image_url: string | null;
  icon_url: string | null;
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
  categories?: any[];
  created_at: string;
  updated_at: string;
}

/**
 * Normaliza una aplicación raw del backend al formato esperado por el frontend
 */

function normalizeApplication(raw: ApplicationRaw): Application {
  const rawImageUrl = raw.image_url || raw.image || null;
  const rawIconUrl = raw.icon_url || raw.icon || null;

  const imageAltEs =
    raw.image_alt_es ||
    (typeof raw.image_alt === "object" && raw.image_alt?.es) ||
    (typeof raw.image_alt === "string" ? raw.image_alt : null);

  const imageAltEn =
    raw.image_alt_en ||
    (typeof raw.image_alt === "object" && raw.image_alt?.en) ||
    (typeof raw.image_alt === "string" ? raw.image_alt : null);

  const imageAltFr =
    raw.image_alt_fr ||
    (typeof raw.image_alt === "object" && raw.image_alt?.fr) ||
    (typeof raw.image_alt === "string" ? raw.image_alt : null);

  const imageTitleEs =
    raw.image_title_es ||
    (typeof raw.image_title === "object" && raw.image_title?.es) ||
    (typeof raw.image_title === "string" ? raw.image_title : null);

  const imageTitleEn =
    raw.image_title_en ||
    (typeof raw.image_title === "object" && raw.image_title?.en) ||
    (typeof raw.image_title === "string" ? raw.image_title : null);

  const imageTitleFr =
    raw.image_title_fr ||
    (typeof raw.image_title === "object" && raw.image_title?.fr) ||
    (typeof raw.image_title === "string" ? raw.image_title : null);

  return {
    id: raw.id,
    slug: raw.slug,

    // ✅ IMPORTANTE: en tu backend "slug" es ES
    slug_es: raw.slug_es ?? raw.slug,
    slug_en: raw.slug_en || null,
    slug_fr: raw.slug_fr || null,

    // ✅ Igual con el nombre: "name" es ES
    name_es: raw.name_es ?? raw.name ?? null,
    name_en: raw.name_en ?? raw.name ?? null,
    name_fr: raw.name_fr ?? raw.name ?? null,

    description_es: raw.description_es || null,
    description_en: raw.description_en || null,
    description_fr: raw.description_fr || null,

    // ✅ imagen principal
    image_url: getImageUrl(rawImageUrl),

    // ✅ si te llega icon (aunque ya no lo uses), lo normalizas igual
    icon_url: getImageUrl(rawIconUrl),

    image_alt_es: imageAltEs,
    image_alt_en: imageAltEn,
    image_alt_fr: imageAltFr,

    image_title_es: imageTitleEs,
    image_title_en: imageTitleEn,
    image_title_fr: imageTitleFr,

    seo_title_es: raw.seo_title_es || null,
    seo_title_en: raw.seo_title_en || null,
    seo_title_fr: raw.seo_title_fr || null,

    seo_description_es: raw.seo_description_es || null,
    seo_description_en: raw.seo_description_en || null,
    seo_description_fr: raw.seo_description_fr || null,

    categories: raw.categories || [],
    created_at: raw.created_at || "",
    updated_at: raw.updated_at || "",
  };
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

export interface ApplicationCategoriesResponse {
  data: import("./categoriesService").Category[];
}

/**
 * Obtiene todas las aplicaciones
 * GET /api/v1/applications
 * @returns Promise con la lista de aplicaciones (normalizadas)
 */
export const getApplications = async (): Promise<ApplicationsResponse> => {
  try {
    const response = await axiosInstance.get<{
      success: boolean;
      data: ApplicationRaw[];
      message?: string;
    }>("/v1/applications");
    const normalizedData = response.data.data.map(normalizeApplication);
    return {
      data: normalizedData,
      meta: (response.data as any).meta,
    };
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

/**
 * Obtiene una aplicación específica por slug
 * GET /api/v1/applications/{slug}
 * @param slug - Identificador único de la aplicación
 * @returns Promise con los datos de la aplicación (normalizada)
 */
export const getApplicationBySlug = async (
  slug: string,
): Promise<ApplicationResponse> => {
  try {
    const response = await axiosInstance.get<{
      success: boolean;
      data: ApplicationRaw;
      message?: string;
    }>(`/v1/applications/${slug}`);
    return {
      data: normalizeApplication(response.data.data),
    };
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
type ApiResponse<T> = { success: boolean; data: T; message?: string };

type AppCategoriesPayload = {
  application: {
    id: number;
    name: string;
    slug: string;
    image_url?: string | null;
  };
  categories: Category[];
};

export const getApplicationCategories = async (
  slug: string,
): Promise<{
  data: Category[];
  application?: AppCategoriesPayload["application"];
}> => {
  const res = await axiosInstance.get<ApiResponse<AppCategoriesPayload>>(
    `/v1/applications/${slug}/categories`,
  );

  return {
    data: res.data.data?.categories ?? [],
    application: res.data.data?.application,
  };
};