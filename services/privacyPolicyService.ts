// services/privacyPolicyService.ts

import axiosInstance from "./axiosConfig";
import { SeoData } from "./empresaService"; // 👈 Importar tipo SEO

export type Lang = "es" | "en" | "fr";

type ApiEnvelope<T> = {
  status: number;
  message: string;
  response: T;
};

export type PrivacyColumnBlock = {
  key: string;
  html: string | null;
};

// ✅ Interfaz correcta con SEO completo
export type PrivacyPolicyApiResponse = {
  page_title: string | null;
  last_updated_at: string | null;
  columns: {
    left: PrivacyColumnBlock[];
    right: PrivacyColumnBlock[];
  };
  seo: SeoData | null; // 👈 SEO completo
};

export const getPrivacyPolicyPage = async (
  lang: Lang = "es",
): Promise<PrivacyPolicyApiResponse> => {
  console.log("🔒 [PRIVACY SERVICE] fetching for lang:", lang);

  const { data } = await axiosInstance.get<
    ApiEnvelope<PrivacyPolicyApiResponse>
  >("/v1/politica-privacidad", { params: { lang } });

  console.log("🔒 [PRIVACY SERVICE] response:", data);

  return data.response;
};
