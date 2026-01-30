import axiosInstance from "./axiosConfig";

export type Lang = "es" | "en" | "fr";

type ApiEnvelope<T> = {
  status: number;
  message: string;
  response: T;
};

export type PrivacyColumnBlock = {
  key: string;
  html: string | null;
};

export type PrivacyPolicyApiResponse = {
  page_title: string | null; // HTML (<h1...>)
  last_updated_at: string | null;

  columns: {
    left: PrivacyColumnBlock[];
    right: PrivacyColumnBlock[];
  };

  seo: {
    title: string | null;
    description: string | null;
  };
};

export const getPrivacyPolicyPage = async (
  lang: Lang,
): Promise<PrivacyPolicyApiResponse> => {
  const { data } = await axiosInstance.get<
    ApiEnvelope<PrivacyPolicyApiResponse>
  >("/v1/politica-privacidad", { params: { lang } });

  return data.response;
};
