"use client";

import React from "react";
import CertificationCard from "./CertificationCard";

type DocItem = {
  key: string;
  title: string | null;
  downloadUrl: string | null;
  file?: { url: string | null; path: string | null };
};

const ServicesGrid = ({ documents }: { documents: DocItem[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
      {documents.map((doc, index) => (
        <div key={doc.key ?? index}>
          <CertificationCard
            title={doc.title ?? ""}
            filePath={doc.downloadUrl ?? doc.file?.url ?? "#"}
          />
        </div>
      ))}
    </div>
  );
};

export default ServicesGrid;
