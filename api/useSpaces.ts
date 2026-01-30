import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getSpaces } from "@/services/spacesService";

export const spaceKeys = {
  all: ["spaces"] as const,
};

export const useSpaces = (): UseQueryResult<
  Awaited<ReturnType<typeof getSpaces>>,
  Error
> => {
  return useQuery({
    queryKey: spaceKeys.all,
    queryFn: getSpaces,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
