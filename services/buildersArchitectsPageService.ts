// services/buildersArchitectsPageService.ts

import axiosInstance from "./axiosConfig";
import { getImageUrl } from "@/lib/i18nHelpers";
import { SeoData } from "./empresaService"; // 👈 Importar tipo SEO

export type Lang = "es" | "en" | "fr";

export interface BuildersArchitectsApiResponse {
  status: number;
  message: string;
  response: {
    hero: {
      title: string | null;
      image: { url: string | null; alt: string | null };
    };
    columns: Array<{
      title: string | null;
      text: string | null;
      bullets: string | null;
    }>;
    banner: {
      image: { url: string | null; alt: string | null };
    };
    final: {
      title: string | null;
      description: string | null;
      items: Array<{
        slug: string;
        label: string | null;
      }>;
    };
    seo: SeoData | null; // 👈 NUEVO: SEO completo
  };
}

export interface BuildersArchitectsData {
  hero: {
    title: string | null;
    image: { url: string | null; alt: string | null };
  };
  columns: Array<{
    title: string | null;
    text: string | null;
    bullets: string | null;
  }>;
  banner: {
    image: { url: string | null; alt: string | null };
  };
  final: {
    title: string | null;
    description: string | null;
    items: Array<{
      slug: string;
      label: string | null;
    }>;
  };
  seo: SeoData | null; // 👈 NUEVO: SEO completo
}

function normalize(
  raw: BuildersArchitectsApiResponse["response"],
): BuildersArchitectsData {
  return {
    hero: {
      title: raw.hero?.title ?? null,
      image: {
        url: getImageUrl(raw.hero?.image?.url ?? null),
        alt: raw.hero?.image?.alt ?? null,
      },
    },

    columns: (raw.columns ?? []).map((c) => ({
      title: c?.title ?? null,
      text: c?.text ?? null,
      bullets: c?.bullets ?? null,
    })),

    banner: {
      image: {
        url: getImageUrl(raw.banner?.image?.url ?? null),
        alt: raw.banner?.image?.alt ?? null,
      },
    },

    final: {
      title: raw.final?.title ?? null,
      description: raw.final?.description ?? null,
      items: (raw.final?.items ?? []).map((it) => ({
        slug: it.slug,
        label: it.label ?? null,
      })),
    },

    seo: raw.seo ?? null, // 👈 NUEVO: pasar SEO directamente
  };
}

export const getBuildersArchitectsPage = async (
  lang: Lang = "es",
): Promise<BuildersArchitectsData> => {
  const res = await axiosInstance.get<BuildersArchitectsApiResponse>(
    "/v1/constructores-arquitectos",
    { params: { lang } },
  );

  return normalize(res.data.response);
};
