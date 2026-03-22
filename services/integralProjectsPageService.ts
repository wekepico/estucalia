// services/integralProjectsPageService.ts

import axiosInstance from "./axiosConfig";
import { getImageUrl } from "@/lib/i18nHelpers";
import { SeoData } from "./empresaService"; // 👈 Importar tipo SEO

export type Lang = "es" | "en" | "fr";

export interface IntegralProjectsApiResponse {
  status: number;
  message: string;
  response: {
    hero: {
      title: string | null;
      image: { url: string | null; alt: string | null };
    };
    cards: Array<{
      title: string | null;
      text: string | null;
      bullets: string | null;
    }>;
    banner: {
      image: { url: string | null; title: string | null; alt: string | null };
    };
    seo: SeoData | null; // 👈 NUEVO: SEO completo
  };
}

export interface IntegralProjectsData {
  hero: {
    title: string | null;
    image: { url: string | null; alt: string | null };
  };
  cards: Array<{
    title: string | null;
    text: string | null;
    bullets: string | null;
  }>;
  banner: {
    image: { url: string | null; title: string | null; alt: string | null };
  };
  seo: SeoData | null; // 👈 NUEVO: SEO completo
}

function normalize(
  raw: IntegralProjectsApiResponse["response"],
): IntegralProjectsData {
  return {
    hero: {
      title: raw.hero?.title ?? null,
      image: {
        url: getImageUrl(raw.hero?.image?.url ?? null),
        alt: raw.hero?.image?.alt ?? null,
      },
    },
    cards: (raw.cards ?? []).map((c) => ({
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
    seo: raw.seo ?? null, // 👈 NUEVO: pasar SEO directamente
  };
}

export const getIntegralProjectsPage = async (
  lang: Lang = "es",
): Promise<IntegralProjectsData> => {
  const res = await axiosInstance.get<IntegralProjectsApiResponse>(
    "/v1/servicio-integral-proyectos",
    { params: { lang } },
  );

  return normalize(res.data.response);
};
