import axiosInstance from "./axiosConfig";

export type Lang = "es" | "en" | "fr";

type ApiEnvelope<T> = {
  status: number;
  message: string;
  response: T;
};

export type FooterLink = {
  label_html: string | null;
  url: string;
  icon_key?: string | null;
};

export type FooterApiResponse = {
  logo: string | null;

  legal: { title: string | null; links: FooterLink[] };
  company: { title: string | null; links: FooterLink[] };
  products: { title: string | null; links: FooterLink[] };

  contact: {
    title: string | null;
    address_html: string | null;
    phone_1: string | null;
    phone_2: string | null;
    email: string | null;
  };

  follow: { title: string | null; links: FooterLink[] };

  copyright: string | null;
};

export const getFooterData = async (lang: Lang): Promise<FooterApiResponse> => {
  const { data } = await axiosInstance.get<ApiEnvelope<FooterApiResponse>>(
    "/v1/footer",
    { params: { lang } },
  );

  return data.response;
};
