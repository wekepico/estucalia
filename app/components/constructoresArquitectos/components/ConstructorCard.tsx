import React from "react";
import { splitBullets } from "../utils";

interface CardServicesProps {
  title: string | null;
  description: string | null;
  bullets?: string | null;
}

const hasTag = (html: string | null, tag: string) => {
  if (!html) return false;
  return new RegExp(`<\\s*${tag}\\b`, "i").test(html);
};

const isHtml = (value: string | null) => {
  if (!value) return false;
  return /<\/?[a-z][\s\S]*>/i.test(value);
};

const ConstructorCard = ({
  title,
  description,
  bullets,
}: CardServicesProps) => {
  const bulletLines = splitBullets(bullets);

  return (
    <div className="bg-transparent">
      {/* ✅ TITLE */}
      {isHtml(title) && hasTag(title, "h3") ? (
        <div dangerouslySetInnerHTML={{ __html: title ?? "" }} />
      ) : (
        <h3 className="text-xl font-semibold mb-2 border-b border-black border-solid">
          {isHtml(title) ? (
            <span dangerouslySetInnerHTML={{ __html: title ?? "" }} />
          ) : (
            title
          )}
        </h3>
      )}

      {/* ✅ DESCRIPTION */}
      {isHtml(description) && hasTag(description, "p") ? (
        <div dangerouslySetInnerHTML={{ __html: description ?? "" }} />
      ) : (
        <p className="text-xl mb-4">
          {isHtml(description) ? (
            <span dangerouslySetInnerHTML={{ __html: description ?? "" }} />
          ) : (
            description
          )}
        </p>
      )}

      {/* ✅ BULLETS */}
      {bullets ? (
        isHtml(bullets) && (hasTag(bullets, "ul") || hasTag(bullets, "li")) ? (
          <div dangerouslySetInnerHTML={{ __html: bullets }} />
        ) : (
          <ul className="list-none space-y-2">
            {bulletLines.map((bullet, index) => (
              <li key={index} style={{ textDecoration: "none" }} className="">
                {bullet}
              </li>
            ))}
          </ul>
        )
      ) : null}
    </div>
  );
};

export default ConstructorCard;
