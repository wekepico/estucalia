import axiosInstance from "./axiosConfig";
import { getImageUrl } from "@/lib/i18nHelpers";

export type Lang = "es" | "en" | "fr";

export interface IntegralProjectsApiResponse {
  success: boolean;
  data: {
    hero: {
      title: string | null;
      description: string | null;
      image: { url: string | null; title: string | null; alt: string | null };
    };
    columns: Array<{
      title: string | null;
      text: string | null;
      bullets: string | null;
    }>;
    cards?: Array<{
      title: string | null;
      text: string | null;
      bullets: string | null;
    }>;
    banner: {
      image: { url: string | null; title: string | null; alt: string | null };
    };
    seo?: {
      title: string | null;
      description: string | null;
    };
  };
}

export interface IntegralProjectsData {
  hero: {
    title: string | null;
    description: string | null;
    image: { url: string | null; title: string | null; alt: string | null };
  };
  columns: Array<{
    title: string | null;
    text: string | null;
    bullets: string | null;
  }>;
  cards: Array<{
    title: string | null;
    text: string | null;
    bullets: string | null;
  }>;
  banner: {
    image: { url: string | null; title: string | null; alt: string | null };
  };
  seo?: {
    title: string | null;
    description: string | null;
  };
}

function normalize(
  raw: IntegralProjectsApiResponse["data"],
): IntegralProjectsData {
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

    columns: (raw.columns ?? []).map((c) => ({
      title: c?.title ?? null,
      text: c?.text ?? null,
      bullets: c?.bullets ?? null,
    })),

    // ✅ el front debe consumir cards (6). Si no viene, cae a columns (3)
    cards: (raw.cards && raw.cards.length
      ? raw.cards
      : (raw.columns ?? [])
    ).map((c) => ({
      title: c?.title ?? null,
      text: c?.text ?? null,
      bullets: c?.bullets ?? null,
    })),

    banner: {
      image: {
        url: getImageUrl(raw.banner?.image?.url ?? null),
        title: raw.banner?.image?.title ?? null,
        alt: raw.banner?.image?.alt ?? null,
      },
    },

    seo: raw.seo
      ? {
          title: raw.seo.title ?? null,
          description: raw.seo.description ?? null,
        }
      : undefined,
  };
}

// 👇 usa la ruta que creaste en backend
export const getIntegralProjectsPage = async (
  lang: Lang = "es",
): Promise<IntegralProjectsData> => {
  const res = await axiosInstance.get<IntegralProjectsApiResponse>(
    "/v1/servicio-integral-proyectos",
    { params: { lang } },
  );

  return normalize(res.data.data);
};
