import axiosInstance from "./axiosConfig";
import { getImageUrl } from "@/lib/i18nHelpers";
import type { Application } from "./applicationsService";

export interface SpaceRaw {
  id: number;
  title: string | null;
  title_en?: string | null;
  title_fr?: string | null;

  slug: string;
  slug_en?: string | null;
  slug_fr?: string | null;

  description?: string | null;
  description_en?: string | null;
  description_fr?: string | null;

  image?: string | null;
  image_url?: string | null;

  image_alt?: {
    es?: string | null;
    en?: string | null;
    fr?: string | null;
  } | null;
  image_title?: {
    es?: string | null;
    en?: string | null;
    fr?: string | null;
  } | null;

  seo_title?: {
    es?: string | null;
    en?: string | null;
    fr?: string | null;
  } | null;
  seo_description?: {
    es?: string | null;
    en?: string | null;
    fr?: string | null;
  } | null;

  order?: number;
  is_active?: boolean;

  applications?: Application[]; // viene del backend en /spaces/{slug}
  created_at?: string;
  updated_at?: string;

  meta_title_es?: string | null;
  meta_title_en?: string | null;
  meta_title_fr?: string | null;
  meta_description_es?: string | null;
  meta_description_en?: string | null;
  meta_description_fr?: string | null;
  meta_keywords_es?: string | null;
  meta_keywords_en?: string | null;
  meta_keywords_fr?: string | null;
  og_title_es?: string | null;
  og_title_en?: string | null;
  og_title_fr?: string | null;
  og_description_es?: string | null;
  og_description_en?: string | null;
  og_description_fr?: string | null;
  og_image?: string | null;
  seo?: {
    meta: {
      title: string | null;
      description: string | null;
      keywords: string | null;
      robots: string;
    };
    og: {
      title: string | null;
      description: string | null;
      image: string | null;
      type: string;
    };
    twitter: {
      card: string;
      title: string | null;
      description: string | null;
      image: string | null;
    };
  } | null;
}

export interface Space {
  id: number;

  // ES base
  title: string | null;
  title_en: string | null;
  title_fr: string | null;

  slug: string; // ES base
  slug_en: string | null;
  slug_fr: string | null;

  description: string | null;
  description_en: string | null;
  description_fr: string | null;

  image_url: string | null;

  image_alt: {
    es?: string | null;
    en?: string | null;
    fr?: string | null;
  } | null;
  image_title: {
    es?: string | null;
    en?: string | null;
    fr?: string | null;
  } | null;

  seo_title: {
    es?: string | null;
    en?: string | null;
    fr?: string | null;
  } | null;
  seo_description: {
    es?: string | null;
    en?: string | null;
    fr?: string | null;
  } | null;

  order: number;
  is_active: boolean;

  applications: Application[];

  seo?: {
    meta: {
      title: string | null;
      description: string | null;
      keywords: string | null;
      robots: string;
    };
    og: {
      title: string | null;
      description: string | null;
      image: string | null;
      type: string;
    };
    twitter: {
      card: string;
      title: string | null;
      description: string | null;
      image: string | null;
    };
  } | null;
}

function normalizeSpace(raw: SpaceRaw): Space {
  const rawImageUrl = raw.image_url || raw.image || null;

  return {
    id: raw.id,

    title: raw.title ?? null,
    title_en: raw.title_en ?? null,
    title_fr: raw.title_fr ?? null,

    slug: raw.slug,
    slug_en: raw.slug_en ?? null,
    slug_fr: raw.slug_fr ?? null,

    description: raw.description ?? null,
    description_en: raw.description_en ?? null,
    description_fr: raw.description_fr ?? null,

    image_url: getImageUrl(rawImageUrl),

    image_alt: raw.image_alt ?? null,
    image_title: raw.image_title ?? null,

    seo_title: raw.seo_title ?? null,
    seo_description: raw.seo_description ?? null,

    order: raw.order ?? 0,
    is_active: !!raw.is_active,

    applications: raw.applications ?? [],
    seo: raw.seo ?? null,
  };
}

export const getSpaces = async () => {
  const res = await axiosInstance.get<{ success: boolean; data: SpaceRaw[] }>(
    "/v1/spaces",
  );

  return {
    data: res.data.data.map(normalizeSpace),
  };
};

export const getSpaceBySlug = async (slug: string, lang: string = "es") => {
  const res = await axiosInstance.get<{ success: boolean; data: SpaceRaw }>(
    `/v1/spaces/${slug}`,
    { params: { lang } }, // 👈 PASAR IDIOMA
  );

  return {
    data: normalizeSpace(res.data.data),
  };
};
