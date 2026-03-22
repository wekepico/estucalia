// services/inspirationsService.ts
import axios from "./axiosConfig";
import { SeoData } from "./empresaService"; // 👈 Importar tipo SEO

export type Lang = "es" | "en" | "fr";

export interface InspirationPageDTO {
  id: number;
  title_es: string | null;
  title_en: string | null;
  title_fr: string | null;
  description_es: string | null;
  description_en: string | null;
  description_fr: string | null;
  default_limit: number | null;
}

export interface InspirationDTO {
  id: number;
  image_path: string | null;
  image_url: string | null;
  title_es: string | null;
  title_en: string | null;
  title_fr: string | null;
  alt_es: string | null;
  alt_en: string | null;
  alt_fr: string | null;
  position: number;
  is_active: boolean;
}

export interface InspirationPageApiResponse {
  status: number;
  message: string;
  response: {
    page: InspirationPageDTO | null;
    items: InspirationDTO[];
    seo: SeoData | null; // 👈 NUEVO: SEO completo
  };
}

export interface InspirationPageData {
  page: InspirationPageDTO | null;
  items: InspirationDTO[];
  seo: SeoData | null; // 👈 NUEVO: SEO completo
}

export async function getInspirationPageWithItems(
  lang: Lang = "es",
): Promise<InspirationPageData> {
  const res = await axios.get<InspirationPageApiResponse>(
    "/v1/inspiration-page",
    {
      params: { lang },
    },
  );

  return {
    page: res.data.response.page ?? null,
    items: res.data.response.items ?? [],
    seo: res.data.response.seo ?? null,
  };
}
