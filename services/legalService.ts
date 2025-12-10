import axiosInstance from './axiosConfig';

// Interface para tipar la respuesta
export interface LegalData {
  id: number;

  // Page Title
  page_title_es: string | null;
  page_title_en: string | null;
  page_title_fr: string | null;

  // Identification Info
  ident_info_es: string | null;
  ident_info_en: string | null;
  ident_info_fr: string | null;

  // IP Rights
  ip_rights_es: string | null;
  ip_rights_en: string | null;
  ip_rights_fr: string | null;

  // Terms of Use
  terms_use_es: string | null;
  terms_use_en: string | null;
  terms_use_fr: string | null;

  // Warranty Exclusion
  warranty_exclusion_es: string | null;
  warranty_exclusion_en: string | null;
  warranty_exclusion_fr: string | null;

  // Security Measures
  security_measures_es: string | null;
  security_measures_en: string | null;
  security_measures_fr: string | null;

  // Modifications
  modifications_es: string | null;
  modifications_en: string | null;
  modifications_fr: string | null;

  // Applicable Law
  applicable_law_es: string | null;
  applicable_law_en: string | null;
  applicable_law_fr: string | null;

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
 * Obtiene los datos de la página legal
 * @returns Promise con los datos legales
 */
export const getLegalData = async (): Promise<LegalData> => {
  try {
    const response = await axiosInstance.get<LegalData>('/legal');
    return response.data;
  } catch (error) {
    console.error('Error fetching legal data:', error);
    throw error;
  }
};
