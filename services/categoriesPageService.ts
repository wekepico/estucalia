// services/categoriesPageService.ts

import axiosInstance from "./axiosConfig";
import { SeoData } from "./empresaService";

export type Lang = "es" | "en" | "fr";

type ApiEnvelope<T> = {
  status: number;
  message: string;
  response: T;
};

export interface CategoriesPageResponse {
  seo: SeoData | null;
}

export const getCategoriesPage = async (
  lang: Lang = "es",
): Promise<CategoriesPageResponse> => {
  const { data } = await axiosInstance.get<ApiEnvelope<CategoriesPageResponse>>(
    "/v1/categorias",
    { params: { lang } },
  );
  return data.response;
};
