// services/applicationsPageService.ts

import axiosInstance from "./axiosConfig";
import { SeoData } from "./empresaService";

export type Lang = "es" | "en" | "fr";

type ApiEnvelope<T> = {
  status: number;
  message: string;
  response: T;
};

// Interfaz para una aplicación
export interface ApplicationItem {
  id: number;
  name: string;
  name_en: string;
  name_fr: string;
  slug: string;
  slug_en: string;
  slug_fr: string;
  image: string | null;
  image_url: string | null;
  short_description_es: string | null;
  short_description_en: string | null;
  short_description_fr: string | null;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
    image: string | null;
  }>;
}

// Interfaz para la respuesta
export interface ApplicationsPageResponse {
  applications: ApplicationItem[];
  seo: SeoData | null;
}

export const getApplicationsPage = async (
  lang: Lang = "es",
): Promise<ApplicationsPageResponse> => {
  console.log("📱 [APPLICATIONS SERVICE] fetching for lang:", lang);

  const { data } = await axiosInstance.get<
    ApiEnvelope<ApplicationsPageResponse>
  >("/v1/aplicaciones", { params: { lang } });

  console.log("📱 [APPLICATIONS SERVICE] response:", data);

  return data.response;
};
