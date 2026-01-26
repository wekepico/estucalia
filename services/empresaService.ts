import axiosInstance from './axiosConfig';

// Interface para tipar la respuesta
export interface EmpresaData {
  id: number;

  // Hero Section
  hero_title_es: string | null;
  hero_title_en: string | null;
  hero_title_fr: string | null;
  hero_video_url: string | null;
  hero_image: string | null;
  hero_image_title: string | null;
  hero_image_alt: string | null;

  // About Section
  about_title_es: string | null;
  about_title_en: string | null;
  about_title_fr: string | null;
  about_text_es: string | null;
  about_text_en: string | null;
  about_text_fr: string | null;
  about_illustration: string | null;
  about_illustration_title: string | null;
  about_illustration_alt: string | null;

  // Mission Section
  mission_title_es: string | null;
  mission_title_en: string | null;
  mission_title_fr: string | null;
  mission_text_es: string | null;
  mission_text_en: string | null;
  mission_text_fr: string | null;

  // Production Section
  production_title_es: string | null;
  production_title_en: string | null;
  production_title_fr: string | null;
  production_text_es: string | null;
  production_text_en: string | null;
  production_text_fr: string | null;
  production_stat: string | null;
  production_media_url: string | null;
  production_image: string | null;
  production_image_title: string | null;
  production_image_alt: string | null;

  // Solutions Section
  solutions_title_es: string | null;
  solutions_title_en: string | null;
  solutions_title_fr: string | null;
  solutions_intro_es: string | null;
  solutions_intro_en: string | null;
  solutions_intro_fr: string | null;
  solutions_items_es: any[];
  solutions_items_en: any[];
  solutions_items_fr: any[];

  // International Section
  international_title_es: string | null;
  international_title_en: string | null;
  international_title_fr: string | null;
  international_text_es: string | null;
  international_text_en: string | null;
  international_text_fr: string | null;
  international_image: string | null;
  international_image_title: string | null;
  international_image_alt: string | null;

  // Certifications Section
  certs_title_es: string | null;
  certs_title_en: string | null;
  certs_title_fr: string | null;
  certs_text_es: string | null;
  certs_text_en: string | null;
  certs_text_fr: string | null;
  certs_logos: any[];

  // Consulting Section
  consulting_title_es: string | null;
  consulting_title_en: string | null;
  consulting_title_fr: string | null;
  consulting_text_es: string | null;
  consulting_text_en: string | null;
  consulting_text_fr: string | null;
  consulting_cta_text_es: string | null;
  consulting_cta_text_en: string | null;
  consulting_cta_text_fr: string | null;
  consulting_cta_url: string | null;
  consulting_bg_image: string | null;
  consulting_bg_image_title: string | null;
  consulting_bg_image_alt: string | null;

  created_at: string;
  updated_at: string;
}

/**
 * Obtiene los datos de la página empresa
 * @returns Promise con los datos de empresa
 */
export const getEmpresaData = async (): Promise<EmpresaData> => {
  try {
    const response = await axiosInstance.get<EmpresaData>('/empresa');
    return response.data;
  } catch (error) {
    console.error('Error fetching empresa data:', error);
    throw error;
  }
};
