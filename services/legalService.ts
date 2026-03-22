// services/legalService.ts

import axiosInstance from "./axiosConfig";
import { SeoData } from "./empresaService";

export type Lang = "es" | "en" | "fr";

type ApiEnvelope<T> = {
  status: number;
  message: string;
  response: T;
};

export type LegalColumnBlock = {
  key: string;
  html: string | null;
};

// ✅ Interfaz correcta para la respuesta
export interface LegalNoticeApiResponse {
  page_title: string | null;
  last_updated_at: string | null;
  columns: {
    left: LegalColumnBlock[];
    right: LegalColumnBlock[];
  };
  seo: SeoData | null; // 👈 SEO completo
}

export const getLegalNoticePage = async (
  lang: Lang = "es",
): Promise<LegalNoticeApiResponse> => {
  console.log("🌐 [LEGAL SERVICE] fetching for lang:", lang);

  const { data } = await axiosInstance.get<ApiEnvelope<LegalNoticeApiResponse>>(
    "/v1/aviso-legal",
    { params: { lang } },
  );

  console.log("🌐 [LEGAL SERVICE] response:", data);

  return data.response;
};
