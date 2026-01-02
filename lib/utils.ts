import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Elimina todas las etiquetas HTML de un string y devuelve solo el texto contenido.
 * Útil cuando el backend envía HTML con etiquetas (h1, h2, p, etc.) para SEO,
 * pero solo queremos mostrar el texto en la UI.
 * 
 * Esta función funciona tanto en el cliente como en el servidor (SSR).
 * 
 * @param html - String que puede contener etiquetas HTML
 * @returns String con solo el texto, sin etiquetas HTML
 * 
 * @example
 * stripHtmlTags('<h1>Título</h1>') // 'Título'
 * stripHtmlTags('<p>Texto <strong>importante</strong></p>') // 'Texto importante'
 */
export function stripHtmlTags(html: string | null | undefined): string {
  if (!html) return '';
  
  // Reemplazar entidades HTML comunes
  let text = html
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
  
  // Eliminar todas las etiquetas HTML (incluyendo contenido de script y style)
  text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<[^>]+>/g, '');
  
  // Limpiar espacios múltiples y trim
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}