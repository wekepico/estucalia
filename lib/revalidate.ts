/**
 * TTL del cache SSR (`unstable_cache`) para datos y SEO del backend.
 * - En produccion: 20 minutos (para no machacar el backend y permitir indexado de Google).
 * - En desarrollo: 1 segundo (practicamente instantaneo para ver cambios del admin).
 *
 * Nota: unstable_cache exige number > 0 o `false`. Usamos 1s (no 0) por compatibilidad.
 */
export const BACKEND_CACHE_REVALIDATE =
  process.env.NODE_ENV === "production" ? 20 * 60 : 1;
