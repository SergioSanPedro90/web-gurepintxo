// i18n "a mano", sin librerías: los textos viven en dictionaries/*.json.
import es from "@/dictionaries/es.json";
import eu from "@/dictionaries/eu.json";
import en from "@/dictionaries/en.json";

// Idiomas soportados (el primero es el idioma por defecto).
export const locales = ["es", "eu", "en"] as const;
export type Locale = (typeof locales)[number];

// El tipo del diccionario se deduce de es.json: si a eu.json o en.json
// les falta una clave, TypeScript da error al compilar.
export type Dictionary = typeof es;

const dictionaries: Record<Locale, Dictionary> = { es, eu, en };

// Comprueba si un texto cualquiera (p. ej. el segmento de la URL) es un idioma válido.
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Devuelve los textos del idioma pedido.
export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
