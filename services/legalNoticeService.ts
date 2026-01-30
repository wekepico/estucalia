import axiosInstance from "./axiosConfig";

export type Lang = "es" | "en" | "fr";

type ApiEnvelope<T> = {
  status: number;
  message: string;
  response: T;
};

export type LegalColumnBlock = {
  key: string;
  html: string | null;
};

export type LegalNoticeApiResponse = {
  page_title: string | null; // viene con HTML (<h1 ...>...)
  last_updated_at: string | null;

  columns: {
    left: LegalColumnBlock[];
    right: LegalColumnBlock[];
  };

  seo: {
    title: string | null;
    description: string | null;
  };
};

export const getLegalNoticePage = async (
  lang: Lang,
): Promise<LegalNoticeApiResponse> => {
  const { data } = await axiosInstance.get<ApiEnvelope<LegalNoticeApiResponse>>(
    "/v1/aviso-legal",
    { params: { lang } },
  );

  return data.response;
};
