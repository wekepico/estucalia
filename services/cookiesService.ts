import axiosInstance from './axiosConfig';

// Interface para tipar la respuesta
export interface CookiesData {
  id: number;

  // Page Title
  page_title_es: string | null;
  page_title_en: string | null;
  page_title_fr: string | null;

  // Introduction
  intro_es: string | null;
  intro_en: string | null;
  intro_fr: string | null;

  // Collected Info
  collected_info_es: string | null;
  collected_info_en: string | null;
  collected_info_fr: string | null;

  // Personal Data Note
  personal_data_note_es: string | null;
  personal_data_note_en: string | null;
  personal_data_note_fr: string | null;

  // Consent
  consent_es: string | null;
  consent_en: string | null;
  consent_fr: string | null;

  // Disable, Reject & Delete
  disable_reject_delete_es: string | null;
  disable_reject_delete_en: string | null;
  disable_reject_delete_fr: string | null;

  // Metadata
  last_updated_at: string | null;

  // SEO
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
 * Obtiene los datos de la página de cookies
 * @returns Promise con los datos de cookies
 */
export const getCookiesData = async (): Promise<CookiesData> => {
  try {
    const response = await axiosInstance.get<CookiesData>('/cookies');
    return response.data;
  } catch (error) {
    console.error('Error fetching cookies data:', error);
    throw error;
  }
};
