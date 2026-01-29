import React from "react";
import { isHtml, splitBullets } from "../utils";

interface CardServicesProps {
  title: string | null;
  description: string | null;
  bullets?: string | null;
}

const ConstructorCard = ({
  title,
  description,
  bullets,
}: CardServicesProps) => {
  const bulletLines = splitBullets(bullets);

  return (
    <div className="bg-transparent">
      <h3 className="text-xl font-semibold mb-2 border-b border-black border-solid">
        {isHtml(title) ? (
          <span dangerouslySetInnerHTML={{ __html: title ?? "" }} />
        ) : (
          title
        )}
      </h3>

      <p className="text-xl mb-4">
        {isHtml(description) ? (
          <span dangerouslySetInnerHTML={{ __html: description ?? "" }} />
        ) : (
          description
        )}
      </p>

      {bullets && (
        <>
          {isHtml(bullets) ? (
            <div
              className="list-none space-y-2"
              dangerouslySetInnerHTML={{ __html: bullets }}
            />
          ) : (
            <ul className="list-none space-y-2">
              {bulletLines.map((bullet, index) => (
                <li key={index} style={{ textDecoration: "none" }}>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ConstructorCard;
