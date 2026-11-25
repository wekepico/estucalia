"use client";

// Banner de cookies + carga de Google Analytics.
// El script de Google NO se descarga hasta que el visitante acepta las cookies
// de estadísticas.

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

import { useLanguage } from "@/app/context/LanguageContext";
import {
  AnalyticsConsent,
  deleteAnalyticsCookies,
  GA_ID,
  OPEN_COOKIE_SETTINGS_EVENT,
  readConsent,
  saveConsent,
} from "@/lib/cookieConsent";

const BUTTON_CLASS =
  "border border-black px-6 py-2 text-sm font-[600] transition-colors hover:bg-black hover:text-white";

export default function CookieConsent() {
  const { t, language } = useLanguage();
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const [open, setOpen] = useState(false);

  // localStorage solo existe en el navegador: se lee tras montar para que el
  // HTML del servidor y el del cliente coincidan.
  useEffect(() => {
    const saved = readConsent();
    setConsent(saved);
    setOpen(saved === null);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () =>
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const choose = (value: AnalyticsConsent) => {
    const withdrawn = consent === "granted" && value === "denied";
    saveConsent(value);
    setConsent(value);
    setOpen(false);

    if (withdrawn) {
      // Un script ya cargado no se puede descargar: se desactiva, se borran
      // sus cookies y se recarga la página.
      (window as any)[`ga-disable-${GA_ID}`] = true;
      deleteAnalyticsCookies();
      window.location.reload();
    }
  };

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {open && (
        <div
          role="dialog"
          aria-label={t("cookieBanner.title")}
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-gray-300 bg-white text-black shadow-lg"
        >
          <div className="mx-auto flex max-w-[240rem] flex-col gap-4 px-5 py-5 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-20">
            <div className="text-sm">
              <p className="mb-1 font-[600]">{t("cookieBanner.title")}</p>
              <p>
                {t("cookieBanner.text")}{" "}
                <Link
                  href={`/politica-cookies?lang=${language}`}
                  className="underline"
                >
                  {t("cookieBanner.policy")}
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                className={BUTTON_CLASS}
                onClick={() => choose("denied")}
              >
                {t("cookieBanner.reject")}
              </button>
              <button
                type="button"
                className={BUTTON_CLASS}
                onClick={() => choose("granted")}
              >
                {t("cookieBanner.accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
