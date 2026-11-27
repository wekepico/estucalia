import { notFound } from "next/navigation";

/**
 * Responde 404 solo cuando el backend confirma que el contenido no existe.
 * Un fallo de red o un 500 no convierte una página válida en un 404.
 */
export async function notFoundIfMissing(load: () => Promise<unknown>) {
  try {
    await load();
  } catch (error: any) {
    if (error?.response?.status === 404) notFound();
  }
}
