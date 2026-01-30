"use client";

import React from "react";
import { isHtml } from "../utils";

interface CardServicesProps {
  title: string | null;
  description: string | null;
  bullets?: string | null; // ahora lo dejamos como string
}

const splitBullets = (bullets: string | null) =>
  (bullets ?? "")
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*-\s*/, "").trim())
    .filter(Boolean);

const CardServices = ({ title, description, bullets }: CardServicesProps) => {
  const bulletLines = splitBullets(bullets ?? null);

  return (
    <div className="bg-transparent">
      {/* TITLE */}
      {isHtml(title) ? (
        <div dangerouslySetInnerHTML={{ __html: title ?? "" }} />
      ) : (
        <h3 className="text-xl font-semibold mb-2 border-b border-black border-solid">
          {title ?? ""}
        </h3>
      )}

      {/* DESCRIPTION */}
      {isHtml(description) ? (
        <div dangerouslySetInnerHTML={{ __html: description ?? "" }} />
      ) : (
        <p className="text-xl mb-4">{description ?? ""}</p>
      )}

      {/* BULLETS */}
      {bullets ? (
        isHtml(bullets) ? (
          <ul
            className="list-none space-y-2"
            dangerouslySetInnerHTML={{ __html: bullets }}
          />
        ) : (
          <ul className="list-none space-y-2">
            {bulletLines.map((b, idx) => (
              <li key={idx} style={{ textDecoration: "none" }}>
                {b}
              </li>
            ))}
          </ul>
        )
      ) : null}
    </div>
  );
};

export default CardServices;
