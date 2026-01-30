import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
