import axiosInstance from "./axiosConfig";
import type { Lang } from "./contactPageService";

export type ContactMessagePayload = {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  consent_privacy: boolean;
  consent_commercial?: boolean;
  lang?: Lang;
};

export type ContactMessageResponse = {
  success: boolean;
  message: string;
};

export const sendContactMessage = async (
  payload: ContactMessagePayload,
): Promise<ContactMessageResponse> => {
  const res = await axiosInstance.post<ContactMessageResponse>(
    "/v1/contacto",
    payload,
  );
  return res.data;
};
