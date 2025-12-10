import axiosInstance from './axiosConfig';

// Interface para tipar la respuesta
export interface ContactoData {
  id: number;

  // Map & Location
  map_embed_url: string | null;
  contact_title_es: string | null;
  contact_title_en: string | null;
  contact_title_fr: string | null;

  // Address
  address_line: string | null;
  city: string | null;
  region: string | null;
  country: string | null;

  // Contact Details
  phones: string | null;
  emails: string | null;

  // Schedule
  schedule_text_es: string | null;
  schedule_text_en: string | null;
  schedule_text_fr: string | null;

  // Legal Info
  legal_info_text_es: string | null;
  legal_info_text_en: string | null;
  legal_info_text_fr: string | null;

  // Form Checkboxes
  checkbox_1_label_es: string | null;
  checkbox_1_label_en: string | null;
  checkbox_1_label_fr: string | null;
  checkbox_2_label_es: string | null;
  checkbox_2_label_en: string | null;
  checkbox_2_label_fr: string | null;

  // CTA Section
  cta_title_es: string | null;
  cta_title_en: string | null;
  cta_title_fr: string | null;
  cta_text_es: string | null;
  cta_text_en: string | null;
  cta_text_fr: string | null;
  cta_button_text_es: string | null;
  cta_button_text_en: string | null;
  cta_button_text_fr: string | null;
  cta_button_url: string | null;
  cta_bg_image: string | null;
  cta_bg_image_title: string | null;
  cta_bg_image_alt: string | null;

  // Social Media
  social_linkedin: string | null;
  social_facebook: string | null;
  social_instagram: string | null;
  social_youtube: string | null;

  created_at: string;
  updated_at: string;
}

/**
 * Obtiene los datos de la página contacto
 * @returns Promise con los datos de contacto
 */
export const getContactoData = async (): Promise<ContactoData> => {
  try {
    const response = await axiosInstance.get<ContactoData>('/contacto');
    return response.data;
  } catch (error) {
    console.error('Error fetching contacto data:', error);
    throw error;
  }
};
