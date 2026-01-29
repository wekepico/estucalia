import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getEmpresaData,
  type EmpresaPageResponse,
  type Lang,
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
