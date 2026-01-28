import axiosInstance from "./axiosConfig";
import { getImageUrl } from "@/lib/i18nHelpers";

type Lang = "es" | "en" | "fr";

interface FinishRaw {
  id: number;
  slug: string;
  slug_en?: string | null;
  slug_fr?: string | null;

  name?: string | null; // ES (según tu seeder)
  name_en?: string | null;
  name_fr?: string | null;

  description_es?: string | null;
  description_en?: string | null;
  description_fr?: string | null;

  image?: string | null;
  image_url?: string | null;

  // viene del eager load
  categories?: any[];
}

export interface FinishCategoryUI {
  id: number;
  slug: string;
  name_es: string | null;
  name_en: string | null;
  name_fr: string | null;
  icon_url: string | null; // usaremos image como icono por ahora
}

export interface FinishUI {
  id: number;
  slug: string;
  slug_en: string | null;
  slug_fr: string | null;

  name_es: string | null;
  name_en: string | null;
  name_fr: string | null;

  description_es: string | null;
  description_en: string | null;
  description_fr: string | null;

  image_url: string | null;

  categories: FinishCategoryUI[];
}

function normalizeFinishCategory(raw: any): FinishCategoryUI {
  const rawIcon =
    raw.icon_url || raw.icon || raw.image_url || raw.image || null;

  return {
    id: raw.id,
    slug: raw.slug,
    name_es: raw.name_es || raw.name || null,
    name_en: raw.name_en || raw.name || null,
    name_fr: raw.name_fr || raw.name || null,
    icon_url: getImageUrl(rawIcon),
  };
}

function normalizeFinish(raw: FinishRaw): FinishUI {
  const rawImage = raw.image_url || raw.image || null;

  return {
    id: raw.id,
    slug: raw.slug,
    slug_en: raw.slug_en || null,
    slug_fr: raw.slug_fr || null,

    name_es: raw.name || null,
    name_en: raw.name_en || raw.name || null,
    name_fr: raw.name_fr || raw.name || null,

    description_es: raw.description_es || null,
    description_en: raw.description_en || null,
    description_fr: raw.description_fr || null,

    image_url: getImageUrl(rawImage),

    categories: (raw.categories || []).map(normalizeFinishCategory),
  };
}

export const getFinishes = async (): Promise<FinishUI[]> => {
  const res = await axiosInstance.get<{ success: boolean; data: FinishRaw[] }>(
    "/v1/finishes",
  );
  return res.data.data.map(normalizeFinish);
};
