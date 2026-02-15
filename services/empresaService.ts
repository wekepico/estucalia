import axiosInstance from "./axiosConfig";
import { Lang } from "./types";

export type { Lang };

type ApiEnvelope<T> = {
  status: number;
  message: string;
  response: T;
};

// ⬇️ Esto es lo que REALMENTE devuelve el backend (flat)
export type EmpresaApiFlat = {
  hero_title_es: string | null;
  hero_title_en: string | null;
  hero_title_fr: string | null;
  hero_video_url: string | null;
  hero_image: string | null;
  hero_image_title: string | null;
  hero_image_alt: string | null;

  about_title_es: string | null;
  about_title_en: string | null;
  about_title_fr: string | null;
  about_text_es: string | null;
  about_text_en: string | null;
  about_text_fr: string | null;
  about_illustration: string | null;
  about_illustration_title: string | null;
  about_illustration_alt: string | null;

  mission_title_es: string | null;
  mission_title_en: string | null;
  mission_title_fr: string | null;
  mission_text_es: string | null;
  mission_text_en: string | null;
  mission_text_fr: string | null;

  production_title_es: string | null;
  production_title_en: string | null;
  production_title_fr: string | null;
  production_text_es: string | null;
  production_text_en: string | null;
  production_text_fr: string | null;

  solutions_video_url: string | null;

  solutions_title_es: string | null;
  solutions_title_en: string | null;
  solutions_title_fr: string | null;
  solutions_intro_es: string | null;
  solutions_intro_en: string | null;
  solutions_intro_fr: string | null;

  featured_categories: { slug: string; label: string | null }[];
  featured_categories_items: { category_id: number }[];

  international_title_es: string | null;
  international_title_en: string | null;
  international_title_fr: string | null;
  international_text_es: string | null;
  international_text_en: string | null;
  international_text_fr: string | null;
  international_image: string | null;
  international_image_title: string | null;
  international_image_alt: string | null;

  certs_title_es: string | null;
  certs_title_en: string | null;
  certs_title_fr: string | null;
  certs_text_es: string | null;
  certs_text_en: string | null;
  certs_text_fr: string | null;
  certs_cta_text_es: string | null;
  certs_cta_text_en: string | null;
  certs_cta_text_fr: string | null;
  certs_cta_url: string | null;
  certs_logos: {
    logo_url: string | null;
    title: string | null;
    alt: string | null;
  }[];

  consulting_title_es: string | null;
  consulting_title_en: string | null;
  consulting_title_fr: string | null;
  consulting_text_es: string | null;
  consulting_text_en: string | null;
  consulting_text_fr: string | null;
  consulting_cta_text_es: string | null;
  consulting_cta_text_en: string | null;
  consulting_cta_text_fr: string | null;
  consulting_cta_url: string | null;
  consulting_bg_image: string | null;
  consulting_bg_image_title: string | null;
  consulting_bg_image_alt: string | null;

  bottom_bg_image: string | null;
  bottom_bg_image_title: string | null;
  bottom_bg_image_alt: string | null;
};

// ✅ Esta es la forma “normalizada” que usarán tus componentes
export type EmpresaPageResponse = {
  hero: {
    title: string | null;
    video_url: string | null;
    image: string | null;
    image_title: string | null;
    image_alt: string | null;
  };
  about: {
    title: string | null;
    text: string | null;
    illustration: string | null;
    illustration_title: string | null;
    illustration_alt: string | null;
  };
  mission: { title: string | null; text: string | null };
  production: { title: string | null; text: string | null };
  solutions_video_url: string | null;
  solutions: {
    title: string | null;
    intro: string | null;
    featured_categories: { slug: string; label: string | null }[];
    featured_categories_items: { category_id: number }[];
  };
  international: {
    title: string | null;
    text: string | null;
    image: string | null;
    image_title: string | null;
    image_alt: string | null;
  };
  certs: {
    title: string | null;
    text: string | null;
    cta_text: string | null;
    cta_url: string | null;
    logos: {
      logo_url: string | null;
      title: string | null;
      alt: string | null;
    }[];
  };
  consulting: {
    title: string | null;
    text: string | null;
    cta_text: string | null;
    cta_url: string | null;
    bg_image: string | null;
    bg_image_title: string | null;
    bg_image_alt: string | null;
  };
  bottom: {
    bg_image: string | null;
    bg_image_title: string | null;
    bg_image_alt: string | null;
  };
};

const pickLang = (flat: EmpresaApiFlat, base: string, lang: Lang) => {
  const key = `${base}_${lang}` as keyof EmpresaApiFlat;
  const fallback = `${base}_es` as keyof EmpresaApiFlat;
  return (flat[key] as any) ?? (flat[fallback] as any) ?? null;
};

const normalizeEmpresa = (
  flat: EmpresaApiFlat,
  lang: Lang,
): EmpresaPageResponse => {
  return {
    hero: {
      title: pickLang(flat, "hero_title", lang),
      video_url: flat.hero_video_url ?? null,
      image: flat.hero_image ?? null,
      image_title: flat.hero_image_title ?? null,
      image_alt: flat.hero_image_alt ?? null,
    },
    about: {
      title: pickLang(flat, "about_title", lang),
      text: pickLang(flat, "about_text", lang),
      illustration: flat.about_illustration ?? null,
      illustration_title: flat.about_illustration_title ?? null,
      illustration_alt: flat.about_illustration_alt ?? null,
    },
    mission: {
      title: pickLang(flat, "mission_title", lang),
      text: pickLang(flat, "mission_text", lang),
    },
    production: {
      title: pickLang(flat, "production_title", lang),
      text: pickLang(flat, "production_text", lang),
    },
    solutions_video_url: flat.solutions_video_url ?? null,
    solutions: {
      title: pickLang(flat, "solutions_title", lang),
      intro: pickLang(flat, "solutions_intro", lang),
      featured_categories: flat.featured_categories ?? [],
      featured_categories_items: flat.featured_categories_items ?? [],
    },
    international: {
      title: pickLang(flat, "international_title", lang),
      text: pickLang(flat, "international_text", lang),
      image: flat.international_image ?? null,
      image_title: flat.international_image_title ?? null,
      image_alt: flat.international_image_alt ?? null,
    },
    certs: {
      title: pickLang(flat, "certs_title", lang),
      text: pickLang(flat, "certs_text", lang),
      cta_text: pickLang(flat, "certs_cta_text", lang),
      cta_url: flat.certs_cta_url ?? null,
      logos: flat.certs_logos ?? [],
    },
    consulting: {
      title: pickLang(flat, "consulting_title", lang),
      text: pickLang(flat, "consulting_text", lang),
      cta_text: pickLang(flat, "consulting_cta_text", lang),
      cta_url: flat.consulting_cta_url ?? null,
      bg_image: flat.consulting_bg_image ?? null,
      bg_image_title: flat.consulting_bg_image_title ?? null,
      bg_image_alt: flat.consulting_bg_image_alt ?? null,
    },
    bottom: {
      bg_image: flat.bottom_bg_image ?? null,
      bg_image_title: flat.bottom_bg_image_title ?? null,
      bg_image_alt: flat.bottom_bg_image_alt ?? null,
    },
  };
};

export const getEmpresaData = async (
  lang: Lang,
): Promise<EmpresaPageResponse> => {
  const { data } = await axiosInstance.get<ApiEnvelope<EmpresaApiFlat>>(
    "/v1/empresa",
    {
      params: { lang },
    },
  );

  return normalizeEmpresa(data.response, lang);
};
