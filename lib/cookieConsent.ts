// Consentimiento de cookies de estadísticas (Google Analytics 4).

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-J426TCE767";

export const OPEN_COOKIE_SETTINGS_EVENT = "estucalia:open-cookie-settings";

export type AnalyticsConsent = "granted" | "denied";

const STORAGE_KEY = "cookie-consent-analytics";
// Pasado este plazo se vuelve a preguntar.
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export function readConsent(): AnalyticsConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { value, date } = JSON.parse(raw);
    if (value !== "granted" && value !== "denied") return null;
    if (Date.now() - date > MAX_AGE_MS) return null;
    return value;
  } catch {
    return null;
  }
}

export function saveConsent(value: AnalyticsConsent) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ value, date: Date.now() }),
    );
  } catch {
    // Sin almacenamiento: la decisión vale solo para esta visita.
  }
}

// Borra las cookies _ga y _ga_* al retirar el consentimiento. GA las crea en el
// dominio raíz (.grupoestucalia.com), así que se prueban todas las variantes.
export function deleteAnalyticsCookies() {
  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) {
    domains.push(`; domain=.${parts.slice(i).join(".")}`);
  }

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (name !== "_ga" && !name.startsWith("_ga_")) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    });
  });
}
