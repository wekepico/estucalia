"use client";

import React from "react";
import CardServices from "./AplicantCard";

type ApiColumn = {
  title: string | null;
  text: string | null;
  bullets: string | null;
};

const ServicesGrid = ({ columns }: { columns: ApiColumn[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
      {(columns ?? []).slice(0, 3).map((c, index) => (
        <div key={index}>
          <CardServices
            title={c.title}
            description={c.text}
            bullets={c.bullets}
          />
        </div>
      ))}
    </div>
  );
};

export default ServicesGrid;
