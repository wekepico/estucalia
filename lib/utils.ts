import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Detecta si un string contiene HTML (cualquier etiqueta <tag> o </tag>).
 * Util para decidir entre:
 *  - renderizar como texto plano (aplicando los estilos CSS del frontend), o
 *  - renderizar el HTML "as-is" via dangerouslySetInnerHTML (respetando lo
 *    que escribio el cliente en el admin: negritas, parrafos, colores, etc.).
 */
export function looksLikeHtml(value?: string | null): boolean {
  if (!value) return false;
  return /<\/?[a-z][\s\S]*?>/i.test(value);
}

export function htmlToText(input?: string | null): string {
  if (!input) return "";

  // Si no parece HTML, solo trim
  if (!input.includes("<")) return input.replace(/\u00a0/g, " ").trim();

  // En navegador (CategoryClient es "use client")
  if (typeof window !== "undefined" && typeof DOMParser !== "undefined") {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return (doc.body.textContent || "").replace(/\u00a0/g, " ").trim();
  }

  // Fallback server (por si algún día lo usas en server components)
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}
