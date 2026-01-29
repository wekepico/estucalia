"use client";

import React from "react";
import ConstructorCard from "./ConstructorCard";

type Column = {
  title: string | null;
  text: string | null;
  bullets: string | null;
};

const ConstructorGrid = ({ columns }: { columns: Column[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
      {columns.map((col, index) => (
        <div key={index}>
          <ConstructorCard
            title={col.title}
            description={col.text}
            bullets={col.bullets}
          />
        </div>
      ))}
    </div>
  );
};

export default ConstructorGrid;
