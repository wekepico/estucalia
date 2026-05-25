'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // En produccion: 1 minuto de cache cliente (suaviza navegacion).
            // En desarrollo: 0 = siempre stale, refetch al instante para ver cambios del admin.
            staleTime: process.env.NODE_ENV === 'production' ? 60 * 1000 : 0,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
