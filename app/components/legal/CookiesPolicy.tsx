// app/components/legal/CookiesPolicy.tsx
"use client";

import { useCookiesPolicyPage } from "@/api/useCookiesPolicyPage";
import React from "react";

const HtmlBlock = ({ html }: { html: string | null }) => {
  if (!html) return null;
  return <div className="w-full" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default function CookiesPolicyComponent() {
  const { data, isLoading, isError, error } = useCookiesPolicyPage();

  console.log("🍪 [COOKIES COMPONENT] data:", data);
  console.log("🍪 [COOKIES COMPONENT] isLoading:", isLoading);
  console.log("🍪 [COOKIES COMPONENT] isError:", isError);

  if (isLoading) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-32 py-12">
        <div className="text-gray-600 animate-pulse">
          Cargando política de cookies...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-32 py-12">
        <div className="text-red-600">
          No se pudo cargar la Política de Cookies.
        </div>
        <div className="text-sm text-gray-500 mt-2">{error?.message}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-32 py-12">
        <div className="text-yellow-600">No hay datos disponibles.</div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-32 py-8">
      {/* Title */}
      <HtmlBlock html={data.page_title} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-8">
        {/* Columna izquierda */}
        <div className="space-y-8">
          {(data.columns?.left || []).map((block) => (
            <section key={block.key}>
              <HtmlBlock html={block.html} />
            </section>
          ))}
        </div>

        {/* Columna derecha */}
        <div className="space-y-8">
          {(data.columns?.right || []).map((block) => (
            <section key={block.key}>
              <HtmlBlock html={block.html} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
