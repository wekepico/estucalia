// services/spacesPageService.ts

import axiosInstance from "./axiosConfig";
import { SeoData } from "./empresaService";

export type Lang = "es" | "en" | "fr";

type ApiEnvelope<T> = {
  status: number;
  message: string;
  response: T;
};

export interface SpacesPageResponse {
  page: {
    title: string | null;
    description: string | null;
    image_url: string | null;
    image_title: string | null;
    image_alt: string | null;
  };
  spaces: any[];
  seo: SeoData | null;
}

export const getSpacesPage = async (
  lang: Lang = "es",
): Promise<SpacesPageResponse> => {
  const { data } = await axiosInstance.get<ApiEnvelope<SpacesPageResponse>>(
    "/v1/espacios",
    { params: { lang } },
  );
  return data.response;
};
