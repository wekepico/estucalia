import axiosInstance from "./axiosConfig";
import { getImageUrl } from "@/lib/i18nHelpers";

export type Lang = "es" | "en" | "fr";

export interface CertificationsDocumentationApiResponse {
  success: boolean;
  data: {
    title: string | null;

    documents: Array<{
      key: string | null;
      title: string | null;
      file?: { url: string | null; path: string | null };
      download_url?: string | null;
    }>;

    solutions: {
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

export interface CertificationsDocumentationData {
  title: string | null;

  documents: Array<{
    key: string;
    title: string | null;
    file: { url: string | null; path: string | null };
    downloadUrl: string | null;
  }>;

  solutions: {
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
  raw: CertificationsDocumentationApiResponse["data"],
): CertificationsDocumentationData {
  return {
    title: raw.title ?? null,

    documents: (raw.documents ?? []).map((d, idx) => ({
      key: d?.key ?? `doc-${idx}`,
      title: d?.title ?? null,
      file: {
        url: getImageUrl(d?.file?.url ?? null),
        path: d?.file?.path ?? null,
      },
      downloadUrl: d?.download_url ?? null,
    })),

    solutions: {
      title: raw.solutions?.title ?? null,
      description: raw.solutions?.description ?? null,
      items: (raw.solutions?.items ?? []).map((it) => ({
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

export const getCertificationsDocumentationPage = async (
  lang: Lang = "es",
): Promise<CertificationsDocumentationData> => {
  const res = await axiosInstance.get<CertificationsDocumentationApiResponse>(
    "/v1/certificaciones-documentacion",
    { params: { lang } },
  );

  return normalize(res.data.data);
};
