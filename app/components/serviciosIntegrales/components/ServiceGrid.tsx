"use client";

import React from "react";
import CardServices from "./CardService";

type ApiCard = {
  title: string | null;
  text: string | null;
  bullets?: string | null;
};

const ServicesGrid = ({ cards }: { cards: ApiCard[] }) => {
  const cardsData = (cards ?? []).slice(0, 6);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
      {cardsData.map((card, index) => (
        <div key={index}>
          <CardServices
            title={card.title}
            description={card.text}
            bullets={[]}
          />
        </div>
      ))}
    </div>
  );
};

export default ServicesGrid;
