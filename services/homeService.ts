import axiosInstance from './axiosConfig';

// Interfaces para tipar la respuesta
export interface HomeData {
  id: number;
  // First Section (Hero)
  first_description_es: string | null;
  first_description_en: string | null;
  first_description_fr: string | null;
  first_image_url: string | null;
  first_image_alt_es: string | null;
  first_image_alt_en: string | null;
  first_image_alt_fr: string | null;
  first_image_title_es: string | null;
  first_image_title_en: string | null;
  first_image_title_fr: string | null;

  // Second Section (Company Info)
  second_title_es: string | null;
  second_title_en: string | null;
  second_title_fr: string | null;
  second_description_es: string | null;
  second_description_en: string | null;
  second_description_fr: string | null;
  second_image_url: string | null;
  second_image_alt_es: string | null;
  second_image_alt_en: string | null;
  second_image_alt_fr: string | null;
  second_image_title_es: string | null;
  second_image_title_en: string | null;
  second_image_title_fr: string | null;

  // Third Section
  third_title_es: string | null;
  third_title_en: string | null;
  third_title_fr: string | null;
  third_description_es: string | null;
  third_description_en: string | null;
  third_description_fr: string | null;

  // CTA Help Section
  cta_help_title_es: string | null;
  cta_help_title_en: string | null;
  cta_help_title_fr: string | null;
  cta_help_text_es: string | null;
  cta_help_text_en: string | null;
  cta_help_text_fr: string | null;
  cta_help_button_es: string | null;
  cta_help_button_en: string | null;
  cta_help_button_fr: string | null;
  cta_help_url: string | null;
  cta_help_image_url: string | null;
  cta_help_image_title: string | null;
  cta_help_image_alt: string | null;

  // Inspiration Section
  inspiration_text_es: string | null;
  inspiration_text_en: string | null;
  inspiration_text_fr: string | null;
  inspiration_images_es: string | null;
  inspiration_images_en: string | null;
  inspiration_images_fr: string | null;

  // Blog Section
  blog_text_es: string | null;
  blog_text_en: string | null;
  blog_text_fr: string | null;

  // Applications & Finishes
  applications_items: any[];
  finishes_tabs: any[];

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
 * Obtiene los datos de la página home
 * @returns Promise con los datos de home
 */
export const getHomeData = async (): Promise<HomeData> => {
  try {
    const response = await axiosInstance.get<HomeData>('/home');
    return response.data;
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};

/**
 * Hook de ejemplo para usar en componentes de React
 * (Opcional: puedes crear esto en un archivo separado de hooks)
 */
export const useHomeData = () => {
  // Este es un ejemplo básico, puedes usar react-query o SWR para mejor manejo
  // import { useEffect, useState } from 'react';

  // const [data, setData] = useState<HomeData | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<Error | null>(null);

  // useEffect(() => {
  //   getHomeData()
  //     .then(setData)
  //     .catch(setError)
  //     .finally(() => setLoading(false));
  // }, []);

  // return { data, loading, error };
};
