// services/cookiesPolicyService.ts

import axiosInstance from "./axiosConfig";
import { SeoData } from "./empresaService"; // 👈 Importar tipo SEO

export type Lang = "es" | "en" | "fr";

type ApiEnvelope<T> = {
  status: number;
  message: string;
  response: T;
};

export type CookiesColumnBlock = {
  key: string;
  html: string | null;
};

// ✅ Interfaz correcta con SEO completo
export type CookiesPolicyApiResponse = {
  page_title: string | null;
  last_updated_at: string | null;
  columns: {
    left: CookiesColumnBlock[];
    right: CookiesColumnBlock[];
  };
  seo: SeoData | null; // 👈 SEO completo
};

export const getCookiesPolicyPage = async (
  lang: Lang = "es",
): Promise<CookiesPolicyApiResponse> => {
  console.log("🍪 [COOKIES SERVICE] fetching for lang:", lang);

  const { data } = await axiosInstance.get<
    ApiEnvelope<CookiesPolicyApiResponse>
  >("/v1/politica-cookies", { params: { lang } });

  console.log("🍪 [COOKIES SERVICE] response:", data);

  return data.response;
};
