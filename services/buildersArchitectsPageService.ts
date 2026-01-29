import axiosInstance from "./axiosConfig";
import { getImageUrl } from "@/lib/i18nHelpers";

export type Lang = "es" | "en" | "fr";

export interface BuildersArchitectsApiResponse {
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
    banner: {
      image: { url: string | null; title: string | null; alt: string | null };
    };
    final: {
      title: string | null;
      description: string | null;
      items: Array<{
        slug: string;
        label: string | null;
      }>;
    };
    seo?: {
      title: string | null;
      description: string | null;
    };
  };
}

export interface BuildersArchitectsData {
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
  banner: {
    image: { url: string | null; title: string | null; alt: string | null };
  };
  final: {
    title: string | null;
    description: string | null;
    items: Array<{
      slug: string;
      label: string | null;
    }>;
  };
  seo?: {
    title: string | null;
    description: string | null;
  };
}

function normalize(
  raw: BuildersArchitectsApiResponse["data"],
): BuildersArchitectsData {
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

    banner: {
      image: {
        url: getImageUrl(raw.banner?.image?.url ?? null),
        title: raw.banner?.image?.title ?? null,
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

    seo: raw.seo
      ? {
          title: raw.seo.title ?? null,
          description: raw.seo.description ?? null,
        }
      : undefined,
  };
}

export const getBuildersArchitectsPage = async (
  lang: Lang = "es",
): Promise<BuildersArchitectsData> => {
  const res = await axiosInstance.get<BuildersArchitectsApiResponse>(
    "/v1/constructores-arquitectos",
    { params: { lang } },
  );

  return normalize(res.data.data);
};
