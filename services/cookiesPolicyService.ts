import axiosInstance from "./axiosConfig";

export type Lang = "es" | "en" | "fr";

type ApiEnvelope<T> = {
  status: number;
  message: string;
  response: T;
};

export type CookiesColumnBlock = {
  key: string;
  html: string | null;
};

export type CookiesPolicyApiResponse = {
  page_title: string | null; // HTML <h1...>
  last_updated_at: string | null;

  columns: {
    left: CookiesColumnBlock[];
    right: CookiesColumnBlock[];
  };

  seo: {
    title: string | null;
    description: string | null;
  };
};

export const getCookiesPolicyPage = async (
  lang: Lang,
): Promise<CookiesPolicyApiResponse> => {
  const { data } = await axiosInstance.get<
    ApiEnvelope<CookiesPolicyApiResponse>
  >("/v1/politica-cookies", { params: { lang } });

  return data.response;
};
