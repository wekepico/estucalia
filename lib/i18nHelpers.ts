/**
 * Helpers para manejar campos multilenguaje desde el backend
 */

export type Language = 'es' | 'en' | 'fr';

/**
 * URL base para las imágenes del backend
 */
export const IMAGE_BASE_URL = 'https://www.grupoestucalia.com';

/**
 * Construye la URL completa de una imagen
 * @param imagePath - Ruta relativa de la imagen (ej: /img/mortero-cal.svg)
 * @returns URL completa de la imagen o la ruta original si ya es absoluta
 *
 * @example
 * getImageUrl('/img/mortero-cal.svg'); // 'https://www.grupoestucalia.com/img/mortero-cal.svg'
 * getImageUrl('https://example.com/img.png'); // 'https://example.com/img.png'
 * getImageUrl(null); // null
 */
export function getImageUrl(imagePath: string | null | undefined): string | null {
  if (!imagePath) return null;

  // Si ya es una URL absoluta, devolverla tal cual
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Concatenar con la URL base
  return `${IMAGE_BASE_URL}${imagePath}`;
}

/**
 * Obtiene el campo del objeto según el idioma seleccionado
 * @param obj - Objeto que contiene los campos multilenguaje
 * @param fieldName - Nombre base del campo (sin el sufijo de idioma)
 * @param language - Idioma seleccionado ('es', 'en', 'fr')
 * @returns El valor del campo en el idioma seleccionado o null
 *
 * @example
 * const product = { name_es: 'Mortero', name_en: 'Mortar', name_fr: 'Mortier' };
 * getLocalizedField(product, 'name', 'es'); // 'Mortero'
 * getLocalizedField(product, 'name', 'en'); // 'Mortar'
 */
export function getLocalizedField<T extends Record<string, any>>(
  obj: T | null | undefined,
  fieldName: string,
  language: Language
): string | null {
  if (!obj) return null;

  const fieldKey = `${fieldName}_${language}` as keyof T;
  return obj[fieldKey] as string | null || null;
}

/**
 * Obtiene múltiples campos localizados de un objeto
 * @param obj - Objeto que contiene los campos multilenguaje
 * @param fieldNames - Array de nombres base de campos
 * @param language - Idioma seleccionado
 * @returns Objeto con los campos localizados
 *
 * @example
 * const product = {
 *   name_es: 'Mortero', name_en: 'Mortar',
 *   description_es: 'Desc ES', description_en: 'Desc EN'
 * };
 * getLocalizedFields(product, ['name', 'description'], 'es');
 * // { name: 'Mortero', description: 'Desc ES' }
 */
export function getLocalizedFields<T extends Record<string, any>>(
  obj: T | null | undefined,
  fieldNames: string[],
  language: Language
): Record<string, string | null> {
  if (!obj) {
    return fieldNames.reduce((acc, field) => ({ ...acc, [field]: null }), {});
  }

  return fieldNames.reduce((acc, fieldName) => {
    return {
      ...acc,
      [fieldName]: getLocalizedField(obj, fieldName, language)
    };
  }, {});
}

/**
 * Crea un objeto con todos los campos localizados comunes
 * Útil para productos, aplicaciones y categorías
 */
export function getCommonLocalizedFields<T extends Record<string, any>>(
  obj: T | null | undefined,
  language: Language
) {
  return {
    name: getLocalizedField(obj, 'name', language),
    description: getLocalizedField(obj, 'description', language),
    short_description: getLocalizedField(obj, 'short_description', language),
    image_alt: getLocalizedField(obj, 'image_alt', language),
    image_title: getLocalizedField(obj, 'image_title', language),
    seo_title: getLocalizedField(obj, 'seo_title', language),
    seo_description: getLocalizedField(obj, 'seo_description', language),
  };
}

/**
 * Obtiene el slug localizado según el idioma, con fallback al slug principal
 * @param obj - Objeto que contiene los campos de slug multilenguaje
 * @param language - Idioma seleccionado ('es', 'en', 'fr')
 * @returns El slug del idioma seleccionado, el slug principal o null
 *
 * @example
 * const app = { slug: 'default', slug_es: 'revestimientos', slug_en: 'coatings' };
 * getLocalizedSlug(app, 'es'); // 'revestimientos'
 * getLocalizedSlug(app, 'fr'); // 'default' (fallback)
 */
export function getLocalizedSlug<T extends Record<string, any>>(
  obj: T | null | undefined,
  language: Language
): string | null {
  if (!obj) return null;

  // Intentar obtener el slug del idioma específico
  const localizedSlug = getLocalizedField(obj, 'slug', language);
  if (localizedSlug) return localizedSlug;

  // Fallback al slug principal
  return (obj.slug as string) || null;
}
