import axiosInstance from "./axiosConfig";
import { getImageUrl } from "@/lib/i18nHelpers";
import type { Lang } from "./contactPageService";

export interface WorkWithUsPageApiResponse {
  success: boolean;
  data: {
    hero?: {
      title?: string | null;
      bgImage?: {
        url?: string | null;
        title?: string | null;
        alt?: string | null;
      } | null;
    } | null;

    section?: {
      title?: string | null;
      text?: string | null; // puede ser HTML
    } | null;

    form?: {
      fields?: {
        name?: string | null;
        phone?: string | null;
        email?: string | null;
        speciality?: string | null;
        message?: string | null;
      } | null;

      cvLabel?: string | null;
      submitText?: string | null;

      legalInfoHtml?: string | null; // HTML o texto
      checkbox1Label?: string | null; // HTML o texto
      checkbox2Label?: string | null; // HTML o texto
    } | null;

    seo?: {
      title?: string | null;
      description?: string | null;
    } | null;
  };
}

export interface WorkWithUsPageData {
  hero: {
    title: string | null;
    bgImage: { url: string | null; title: string | null; alt: string | null };
  };

  section: {
    title: string | null;
    text: string | null; // HTML o texto
  };

  form: {
    fields: {
      name: string | null;
      phone: string | null;
      email: string | null;
      speciality: string | null;
      message: string | null;
    };

    cvLabel: string | null;
    submitText: string | null;

    legalInfoHtml: string | null;
    checkbox1Label: string | null;
    checkbox2Label: string | null;
  };

  seo?: { title: string | null; description: string | null };
}

function normalize(raw: WorkWithUsPageApiResponse["data"]): WorkWithUsPageData {
  return {
    hero: {
      title: raw?.hero?.title ?? null,
      bgImage: {
        url: getImageUrl(raw?.hero?.bgImage?.url ?? null),
        title: raw?.hero?.bgImage?.title ?? null,
        alt: raw?.hero?.bgImage?.alt ?? null,
      },
    },

    section: {
      title: raw?.section?.title ?? null,
      text: raw?.section?.text ?? null,
    },

    form: {
      fields: {
        name: raw?.form?.fields?.name ?? null,
        phone: raw?.form?.fields?.phone ?? null,
        email: raw?.form?.fields?.email ?? null,
        speciality: raw?.form?.fields?.speciality ?? null,
        message: raw?.form?.fields?.message ?? null,
      },
      cvLabel: raw?.form?.cvLabel ?? null,
      submitText: raw?.form?.submitText ?? null,
      legalInfoHtml: raw?.form?.legalInfoHtml ?? null,
      checkbox1Label: raw?.form?.checkbox1Label ?? null,
      checkbox2Label: raw?.form?.checkbox2Label ?? null,
    },

    seo: raw?.seo
      ? {
          title: raw.seo.title ?? null,
          description: raw.seo.description ?? null,
        }
      : undefined,
  };
}

export const getWorkWithUsPage = async (
  lang: Lang = "es",
): Promise<WorkWithUsPageData> => {
  const res = await axiosInstance.get<WorkWithUsPageApiResponse>(
    "/v1/trabaja-con-nosotros",
    {
      params: { lang },
    },
  );

  return normalize(res.data.data);
};
