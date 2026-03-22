// services/contactPageService.ts

import axiosInstance from "./axiosConfig";
import { getImageUrl } from "@/lib/i18nHelpers";
import { SeoData } from "./empresaService"; // 👈 Importar tipo SEO

export type Lang = "es" | "en" | "fr";

export interface ContactPageApiResponse {
  status: number;
  message: string;
  response: {
    map: {
      embedUrl: string | null;
    };
    contact: {
      title: string | null;
      address: {
        line: string | null;
        city: string | null;
        region: string | null;
        country: string | null;
      };
      phones: Array<{ label?: string | null; number?: string | null }>;
      emails: Array<{ label?: string | null; email?: string | null }>;
      scheduleHtml: string | null;
    };
    form: {
      legalInfoHtml: string | null;
      checkbox1Label: string | null;
      checkbox2Label: string | null;
    };
    cta: {
      title: string | null;
      text: string | null;
      buttonText: string | null;
      buttonUrl: string | null;
      bgImage: { url: string | null; title: string | null; alt: string | null };
    };
    social: {
      linkedin: string | null;
      facebook: string | null;
      instagram: string | null;
      youtube: string | null;
    };
    seo: SeoData | null; // 👈 NUEVO: SEO completo
  };
}

export interface ContactPageData {
  map: {
    embedUrl: string | null;
  };
  contact: {
    title: string | null;
    address: {
      line: string | null;
      city: string | null;
      region: string | null;
      country: string | null;
    };
    phones: Array<{ label: string | null; number: string | null }>;
    emails: Array<{ label: string | null; email: string | null }>;
    scheduleText: string | null;
  };
  form: {
    legalInfoHtml: string | null;
    checkbox1Label: string | null;
    checkbox2Label: string | null;
  };
  cta: {
    title: string | null;
    text: string | null;
    buttonText: string | null;
    buttonUrl: string | null;
    bgImage: { url: string | null; title: string | null; alt: string | null };
  };
  social: {
    linkedin: string | null;
    facebook: string | null;
    instagram: string | null;
    youtube: string | null;
  };
  seo: SeoData | null; // 👈 NUEVO: SEO completo
}

function normalize(raw: ContactPageApiResponse["response"]): ContactPageData {
  return {
    map: {
      embedUrl: raw.map?.embedUrl ?? null,
    },
    contact: {
      title: raw.contact?.title ?? null,
      address: {
        line: raw.contact?.address?.line ?? null,
        city: raw.contact?.address?.city ?? null,
        region: raw.contact?.address?.region ?? null,
        country: raw.contact?.address?.country ?? null,
      },
      phones: (raw.contact?.phones ?? []).map((p) => ({
        label: (p?.label ?? null) as string | null,
        number: (p?.number ?? null) as string | null,
      })),
      emails: (raw.contact?.emails ?? []).map((e) => ({
        label: (e?.label ?? null) as string | null,
        email: (e?.email ?? null) as string | null,
      })),
      scheduleText: raw.contact?.scheduleHtml ?? null,
    },
    form: {
      legalInfoHtml: raw.form?.legalInfoHtml ?? null,
      checkbox1Label: raw.form?.checkbox1Label ?? null,
      checkbox2Label: raw.form?.checkbox2Label ?? null,
    },
    cta: {
      title: raw.cta?.title ?? null,
      text: raw.cta?.text ?? null,
      buttonText: raw.cta?.buttonText ?? null,
      buttonUrl: raw.cta?.buttonUrl ?? null,
      bgImage: {
        url: getImageUrl(raw.cta?.bgImage?.url ?? null),
        title: raw.cta?.bgImage?.title ?? null,
        alt: raw.cta?.bgImage?.alt ?? null,
      },
    },
    social: {
      linkedin: raw.social?.linkedin ?? null,
      facebook: raw.social?.facebook ?? null,
      instagram: raw.social?.instagram ?? null,
      youtube: raw.social?.youtube ?? null,
    },
    seo: raw.seo ?? null, // 👈 NUEVO: pasar SEO directamente
  };
}

export const getContactPage = async (
  lang: Lang = "es",
): Promise<ContactPageData> => {
  const res = await axiosInstance.get<ContactPageApiResponse>("/v1/contacto", {
    params: { lang },
  });

  return normalize(res.data.response);
};
