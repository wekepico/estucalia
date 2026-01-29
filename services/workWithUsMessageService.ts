import axiosInstance from "./axiosConfig";
import type { Lang } from "./contactPageService";

export type WorkWithUsMessagePayload = {
  name: string;
  email: string;
  phone?: string | null;
  speciality: string;
  message: string;
  cv: File;

  consent_privacy: boolean;
  consent_commercial?: boolean;
  lang?: Lang;
};

export type WorkWithUsMessageResponse = {
  success: boolean;
  message: string;
};

export const sendWorkWithUsMessage = async (
  payload: WorkWithUsMessagePayload,
): Promise<WorkWithUsMessageResponse> => {
  const form = new FormData();
  form.append("name", payload.name);
  form.append("email", payload.email);
  if (payload.phone) form.append("phone", payload.phone);
  form.append("speciality", payload.speciality);
  form.append("message", payload.message);
  form.append("cv", payload.cv);

  // Laravel "accepted" => manda "1"
  form.append("consent_privacy", payload.consent_privacy ? "1" : "0");
  form.append("consent_commercial", payload.consent_commercial ? "1" : "0");
  if (payload.lang) form.append("lang", payload.lang);

  const res = await axiosInstance.post<WorkWithUsMessageResponse>(
    "/v1/trabaja-con-nosotros",
    form,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return res.data;
};
