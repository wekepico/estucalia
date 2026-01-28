// services/inspirationsService.ts
import axios from "./axiosConfig";

export type Lang = "es" | "en" | "fr";

export interface InspirationPageDTO {
  id: number;
  title_es: string | null;
  title_en: string | null;
  title_fr: string | null;
  description_es: string | null;
  description_en: string | null;
  description_fr: string | null;
  seo_title_es: string | null;
  seo_title_en: string | null;
  seo_title_fr: string | null;
  seo_description_es: string | null;
  seo_description_en: string | null;
  seo_description_fr: string | null;
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

export async function getInspirationPageWithItems(): Promise<{
  page: InspirationPageDTO | null;
  items: InspirationDTO[];
}> {
  const res = await axios.get("/v1/inspiration-page");

  // tu backend viene como { success, data: { page, items } }
  const payload = res.data?.data ?? res.data ?? {};

  return {
    page: payload.page ?? null,
    items: payload.items ?? [],
  };
}
