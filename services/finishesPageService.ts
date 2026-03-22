// services/finishesPageService.ts

import axiosInstance from "./axiosConfig";
import { SeoData } from "./empresaService";

export type Lang = "es" | "en" | "fr";

type ApiEnvelope<T> = {
  status: number;
  message: string;
  response: T;
};

// Interfaz para la página de acabados
export interface FinishesPageResponse {
  page: {
    title: string | null;
    intro: string | null;
    finishes_items: any[];
  };
  finishes: any[]; // los acabados ya los tienes en otro servicio
  seo: SeoData | null;
}

export const getFinishesPage = async (
  lang: Lang = "es",
): Promise<FinishesPageResponse> => {
  const { data } = await axiosInstance.get<ApiEnvelope<FinishesPageResponse>>(
    "/v1/acabados",
    { params: { lang } },
  );
  return data.response;
};
