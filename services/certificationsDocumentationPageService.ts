// services/certificationsDocumentationPageService.ts

import axiosInstance from "./axiosConfig";
import { getImageUrl } from "@/lib/i18nHelpers";
import { SeoData } from "./empresaService";

export type Lang = "es" | "en" | "fr";

// ✅ CORREGIDO: Estructura real del backend
export interface CertificationsDocumentationApiResponse {
  success: boolean;
  data: {
    title: string | null;
    documents: Array<{
      key: string | null;
      title: string | null;
      file?: { url: string | null; path: string | null };
      downloadUrl?: string | null;
    }>;
    solutions: {
      title: string | null;
      description: string | null;
      items: Array<{
        slug: string;
        label: string | null;
      }>;
    };
    seo: {
      title: string | null;
      description: string | null;
    } | null;
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
  seo: {
    title: string | null;
    description: string | null;
  } | null;
}

// ✅ CORREGIDO: Normalizar con la estructura correcta
function normalize(
  raw: CertificationsDocumentationApiResponse["data"] | undefined,
): CertificationsDocumentationData {
  if (!raw) {
    console.warn(
      "⚠️ normalize: raw data is undefined, returning empty structure",
    );
    return {
      title: null,
      documents: [],
      solutions: {
        title: null,
        description: null,
        items: [],
      },
      seo: null,
    };
  }

  return {
    title: raw.title ?? null,
    documents: (raw.documents ?? []).map((d, idx) => ({
      key: d?.key ?? `doc-${idx}`,
      title: d?.title ?? null,
      file: {
        url: getImageUrl(d?.file?.url ?? null),
        path: d?.file?.path ?? null,
      },
      downloadUrl: d?.downloadUrl ?? null,
    })),
    solutions: {
      title: raw.solutions?.title ?? null,
      description: raw.solutions?.description ?? null,
      items: (raw.solutions?.items ?? []).map((it) => ({
        slug: it.slug,
        label: it.label ?? null,
      })),
    },
    seo: raw.seo ?? null,
  };
}

export const getCertificationsDocumentationPage = async (
  lang: Lang = "es",
): Promise<CertificationsDocumentationData> => {
  console.log("🌐 [SERVICE] calling API with lang:", lang);

  try {
    const res = await axiosInstance.get<CertificationsDocumentationApiResponse>(
      "/v1/certificaciones-documentacion",
      { params: { lang } },
    );

    console.log("🌐 [SERVICE] API response:", res.data);

    // ✅ Extraer data directamente
    const responseData = res.data?.data;
    console.log("🌐 [SERVICE] extracted data:", responseData);

    const normalized = normalize(responseData);
    console.log("🌐 [SERVICE] normalized data:", normalized);

    return normalized;
  } catch (error) {
    console.error("🌐 [SERVICE] API error:", error);
    return normalize(undefined);
  }
};
