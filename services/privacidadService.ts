import axiosInstance from './axiosConfig';

// Interface para tipar la respuesta
export interface PrivacidadData {
  id: number;

  // Page Title
  page_title_es: string | null;
  page_title_en: string | null;
  page_title_fr: string | null;

  // Introduction
  intro_es: string | null;
  intro_en: string | null;
  intro_fr: string | null;

  // Controller Info
  controller_info_es: string | null;
  controller_info_en: string | null;
  controller_info_fr: string | null;

  // Purpose
  purpose_es: string | null;
  purpose_en: string | null;
  purpose_fr: string | null;

  // Legal Basis
  legal_basis_es: string | null;
  legal_basis_en: string | null;
  legal_basis_fr: string | null;

  // Security Measures
  security_measures_es: string | null;
  security_measures_en: string | null;
  security_measures_fr: string | null;

  // Data Sharing
  data_sharing_es: string | null;
  data_sharing_en: string | null;
  data_sharing_fr: string | null;

  // International Transfers
  intl_transfers_es: string | null;
  intl_transfers_en: string | null;
  intl_transfers_fr: string | null;

  // Retention
  retention_es: string | null;
  retention_en: string | null;
  retention_fr: string | null;

  // Rights & How To
  rights_howto_es: string | null;
  rights_howto_en: string | null;
  rights_howto_fr: string | null;

  // Modifications
  modifications_es: string | null;
  modifications_en: string | null;
  modifications_fr: string | null;

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
 * Obtiene los datos de la página de privacidad
 * @returns Promise con los datos de privacidad
 */
export const getPrivacidadData = async (): Promise<PrivacidadData> => {
  try {
    const response = await axiosInstance.get<PrivacidadData>('/privacidad');
    return response.data;
  } catch (error) {
    console.error('Error fetching privacidad data:', error);
    throw error;
  }
};
