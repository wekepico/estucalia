import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getApplications,
  type ApplicationsResponse,
} from "@/services/applicationsService";
import {
  getSpaces,
  getSpaceBySlug,
  type Space,
} from "@/services/spacesService";

/**
 * Trae aplicaciones (tabs)
 */
export const useApplicationsTabs = (): UseQueryResult<
  ApplicationsResponse,
  Error
> => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Trae espacios (cards base)
 */
export const useSpacesList = (): UseQueryResult<{ data: Space[] }, Error> => {
  return useQuery({
    queryKey: ["spaces"],
    queryFn: getSpaces,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Enriquecer spaces con sus applications usando /spaces/{slug}
 * (sin cambiar backend)
 */
export const useSpacesWithApplications = (): UseQueryResult<
  { data: Space[] },
  Error
> => {
  return useQuery({
    queryKey: ["spaces", "with-applications"],
    queryFn: async () => {
      const base = await getSpaces(); // { data: Space[] }
      const spaces = base.data;

      // Traemos detalle para obtener applications
      const detailed = await Promise.all(
        spaces.map(async (s) => {
          try {
            const res = await getSpaceBySlug(s.slug); // devuelve { data: Space }
            return res.data;
          } catch {
            return s; // fallback sin apps
          }
        }),
      );

      return { data: detailed };
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
