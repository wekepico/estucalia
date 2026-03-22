// app/components/legal/PrivacyPolicy.tsx
"use client";

import { usePrivacyPolicyPage } from "@/api/usePrivacyPolicyPage";
import React from "react";

const HtmlBlock = ({ html }: { html: string | null }) => {
  if (!html) return null;
  return <div className="w-full" dangerouslySetInnerHTML={{ __html: html }} />;
};

const PrivacyPolicy = () => {
  const { data, isLoading, isError, error } = usePrivacyPolicyPage();

  console.log("📦 [PRIVACY COMPONENT] data:", data);
  console.log("📦 [PRIVACY COMPONENT] isLoading:", isLoading);
  console.log("📦 [PRIVACY COMPONENT] isError:", isError);

  if (isLoading) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-32 py-12">
        <div className="text-gray-600 animate-pulse">
          Cargando política de privacidad...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-32 py-12">
        <div className="text-red-600">
          No se pudo cargar la Política de privacidad.
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        {/* Left */}
        <div className="space-y-12">
          {(data.columns?.left || []).map((block) => (
            <section key={block.key}>
              <HtmlBlock html={block.html} />
            </section>
          ))}
        </div>

        {/* Right */}
        <div className="space-y-12">
          {(data.columns?.right || []).map((block) => (
            <section key={block.key}>
              <HtmlBlock html={block.html} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
