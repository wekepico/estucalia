// api/useEmpresa.ts

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getEmpresaData,
  type EmpresaPageResponse,
  type Lang,
  type SeoData, // 👈 Importar tipo SEO
} from "@/services/empresaService";
import { useLanguage } from "@/app/context/LanguageContext";

const normalizeLang = (l: string): Lang =>
  l === "en" || l === "fr" ? l : "es";

export const useEmpresa = (): UseQueryResult<EmpresaPageResponse, Error> => {
  const { language } = useLanguage();
  const lang = normalizeLang(language);

  return useQuery({
    queryKey: ["empresa", lang],
    queryFn: () => getEmpresaData(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

// 👇 NUEVO: Hook específico para SEO (puede usar caché)
export const useEmpresaSeo = (): {
  seo: SeoData | null;
  isLoading: boolean;
} => {
  const { data, isLoading, isPending } = useEmpresa();
  const loading = (isPending ?? isLoading) && !data;

  return {
    seo: data?.seo ?? null,
    isLoading: loading,
  };
};
