import axiosInstance from "./axiosConfig";
import { getImageUrl } from "@/lib/i18nHelpers";

export type Lang = "es" | "en" | "fr";

export interface HomeApiResponse {
  success: boolean;
  data: {
    hero: {
      title: string | null;
      description: string | null;
      image: { url: string | null; title: string | null; alt: string | null };
    };
    about: {
      title: string | null;
      description: string | null;
    };
    help?: {
      title: string | null;
      text: string | null;
      button: string | null;
      url: string | null;
      image?: { url: string | null; title: string | null; alt: string | null };
    };
    seo?: {
      title: string | null;
      description: string | null;
    };
  };
}

export interface HomeData {
  hero: {
    title: string | null;
    description: string | null;
    image: { url: string | null; title: string | null; alt: string | null };
  };
  about: {
    title: string | null;
    description: string | null;
  };
  help?: {
    title: string | null;
    text: string | null;
    button: string | null;
    url: string | null;
    image?: { url: string | null; title: string | null; alt: string | null };
  };
  seo?: {
    title: string | null;
    description: string | null;
  };
}

function normalizeHome(raw: HomeApiResponse["data"]): HomeData {
  return {
    hero: {
      title: raw.hero?.title ?? null,
      description: raw.hero?.description ?? null,
      image: {
        url: getImageUrl(raw.hero?.image?.url ?? null),
        title: raw.hero?.image?.title ?? null,
        alt: raw.hero?.image?.alt ?? null,
      },
    },
    about: {
      title: raw.about?.title ?? null,
      description: raw.about?.description ?? null,
    },
    help: raw.help
      ? {
          title: raw.help.title ?? null,
          text: raw.help.text ?? null,
          button: raw.help.button ?? null,
          url: raw.help.url ?? null,
          image: raw.help.image
            ? {
                url: getImageUrl(raw.help.image.url ?? null),
                title: raw.help.image.title ?? null,
                alt: raw.help.image.alt ?? null,
              }
            : undefined,
        }
      : undefined,
    seo: raw.seo
      ? {
          title: raw.seo.title ?? null,
          description: raw.seo.description ?? null,
        }
      : undefined,
  };
}

export const getHome = async (lang: Lang = "es"): Promise<HomeData> => {
  const res = await axiosInstance.get<HomeApiResponse>("/v1/home", {
    params: { lang },
  });

  return normalizeHome(res.data.data);
};
