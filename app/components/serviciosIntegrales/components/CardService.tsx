"use client";

import React from "react";
import { isHtml } from "../utils"; // ajusta la ruta según tu estructura

interface CardServicesProps {
  title: string | null;
  description: string | null;
  bullets?: string[]; // no lo usas, pero lo dejamos
}

const CardServices = ({ title, description, bullets }: CardServicesProps) => {
  return (
    <div className="bg-white">
      {/* TITLE: si viene <h3 ...> ya NO lo envuelvas */}
      {isHtml(title) ? (
        <div dangerouslySetInnerHTML={{ __html: title ?? "" }} />
      ) : (
        <h3 className="text-xl font-semibold mb-2 border-b border-black border-solid">
          {title ?? ""}
        </h3>
      )}

      {/* DESCRIPTION: si viene <p ...> ya NO lo envuelvas */}
      {isHtml(description) ? (
        <div dangerouslySetInnerHTML={{ __html: description ?? "" }} />
      ) : (
        <p className="text-xl mb-4">{description ?? ""}</p>
      )}

      {/* bullets opcional */}
      {!!bullets?.length && (
        <ul className="list-none space-y-2">
          {bullets.map((b, idx) => (
            <li key={idx} style={{ textDecoration: "none" }}>
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CardServices;
