// app/components/legal/LegalNotice.tsx
"use client";

import React from "react";
import { useLegal } from "@/api/useLegal";

const HtmlBlock = ({ html }: { html: string | null }) => {
  if (!html) return null;
  return <div className="w-full" dangerouslySetInnerHTML={{ __html: html }} />;
};

const LegalNotice = () => {
  const { data, isLoading, isError } = useLegal();

  if (isLoading) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-32 py-12">
        <div className="text-gray-600 animate-pulse">
          Cargando aviso legal...
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-32 py-12">
        <div className="text-red-600">No se pudo cargar el Aviso legal.</div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-32 py-8">
      {/* Title viene como HTML */}
      <HtmlBlock html={data.page_title} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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

export default LegalNotice;
