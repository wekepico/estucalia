"use client";

import React from "react";
import CardServices from "./AplicantCard";

type ApiColumn = {
  title: string | null;
  text: string | null;
  bullets: string | null;
};

const parseBullets = (bullets: string | null) =>
  (bullets ?? "")
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*-\s*/, "").trim())
    .filter(Boolean);

const ServicesGrid = ({ columns }: { columns: ApiColumn[] }) => {
  const cardsData = (columns ?? []).slice(0, 3).map((c) => ({
    title: c.title ?? "",
    description: c.text ?? "",
    bullets: parseBullets(c.bullets),
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
      {cardsData.map((card, index) => (
        <div key={index} className="">
          <CardServices
            title={card.title}
            description={card.description}
            bullets={card.bullets}
          />
        </div>
      ))}
    </div>
  );
};

export default ServicesGrid;
