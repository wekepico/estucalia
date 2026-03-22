// services/applicatorsPageService.ts

import axiosInstance from "./axiosConfig";
import { getImageUrl } from "@/lib/i18nHelpers";
import { SeoData } from "./empresaService"; // 👈 Importar tipo SEO

export type Lang = "es" | "en" | "fr";

export interface ApplicatorsApiResponse {
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
      benefits: Array<{
        title: string | null;
        text: string | null;
      }>;
      form: {
        privacy: string | null;
        checkbox1: string | null;
        checkbox2: string | null;
      };
    };
    seo: SeoData | null; // 👈 NUEVO: SEO completo
  };
}

// ✅ Datos normalizados para el frontend
export interface ApplicatorsData {
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
    benefits: Array<{
      title: string | null;
      text: string | null;
    }>;
    form: {
      privacy: string | null;
      checkbox1: string | null;
      checkbox2: string | null;
    };
  };
  seo: SeoData | null; // 👈 NUEVO: SEO completo
}

function normalize(raw: ApplicatorsApiResponse["response"]): ApplicatorsData {
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
      benefits: (raw.final?.benefits ?? []).map((b) => ({
        title: b?.title ?? null,
        text: b?.text ?? null,
      })),
      form: {
        privacy: raw.final?.form?.privacy ?? null,
        checkbox1: raw.final?.form?.checkbox1 ?? null,
        checkbox2: raw.final?.form?.checkbox2 ?? null,
      },
    },
    seo: raw.seo ?? null, // 👈 NUEVO: pasar SEO directamente
  };
}

export const getApplicatorsPage = async (
  lang: Lang = "es",
): Promise<ApplicatorsData> => {
  const res = await axiosInstance.get<ApplicatorsApiResponse>(
    "/v1/aplicadores",
    {
      params: { lang },
    },
  );

  return normalize(res.data.response);
};
