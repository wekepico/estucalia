"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { RxInstagramLogo } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa6";
import { TiSocialLinkedin, TiSocialFacebook } from "react-icons/ti";

import { useFooter } from "@/api/useFooter";
import { looksLikeHtml } from "@/lib/utils";

const SocialIcon = ({ keyName }: { keyName?: string | null }) => {
  const key = (keyName || "").toLowerCase();

  if (key === "linkedin")
    return <TiSocialLinkedin className="w-5 h-5 rounded-full" />;
  if (key === "facebook") return <TiSocialFacebook className="w-5 h-5" />;
  if (key === "instagram")
    return <RxInstagramLogo className="w-5 h-5 rounded-full" />;
  if (key === "youtube") return <FaYoutube className="w-5 h-5 rounded-full" />;

  // fallback
  return <TiSocialLinkedin className="w-5 h-5 rounded-full" />;
};

export default function Footer() {
  const { data: footer, isPending, isLoading } = useFooter();
  const loading = (isPending ?? isLoading) && !footer;

  if (loading) return null; // o tu loader si quieres

  const logoSrc = footer?.logo || "/img/logo.png";

  return (
    <footer className="bg-black text-sm mx-auto w-full text-white py-20">
      <div className="max-w-[240rem] mx-auto md:px-15 sm:px-10 px-5 lg:px-20">
        <div className="flex relative max-lg:flex-col flex-wrap items-center max-sm:items-start w-full max-sm:text-sm justify-between gap-y-12">
          {/* Logo Column */}
          <div className="flex">
            <Image
              src={logoSrc}
              alt="Grupo Estucalia"
              width={200}
              height={100}
              className="mb-6 -ml-2 h-14 w-auto absolute"
            />
            {(() => {
              const copyValue = footer?.copyright ?? "Copyright©2025";
              return looksLikeHtml(copyValue) ? (
                <div
                  className="mt-36 text-gray-100"
                  dangerouslySetInnerHTML={{ __html: copyValue }}
                />
              ) : (
                <p className="mt-36 text-gray-100">{copyValue}</p>
              );
            })()}
          </div>

          <div className="flex gap-10 lg:pl-32 max-sm:flex-col">
            {/* Legal */}
            <div className="w-max">
              {looksLikeHtml(footer?.legal?.title) ? (
                <div
                  className="mb-2 text-white"
                  dangerouslySetInnerHTML={{ __html: footer?.legal?.title ?? "" }}
                />
              ) : (
                <h3 className="text-sm text-white font-[600] mb-2">
                  {footer?.legal?.title ?? ""}
                </h3>
              )}
              <ul className="text-gray-200 space-y-0.5">
                {(footer?.legal?.links ?? []).map((l, idx) => (
                  <li key={idx}>
                    <Link
                      href={l.url}
                      className="hover:text-white transition-colors"
                      dangerouslySetInnerHTML={{ __html: l.label_html ?? "" }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              {looksLikeHtml(footer?.company?.title) ? (
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{ __html: footer?.company?.title ?? "" }}
                />
              ) : (
                <h3 className="font-[600] mb-2">
                  {footer?.company?.title ?? ""}
                </h3>
              )}
              <ul className="text-gray-200 space-y-0.5">
                {(footer?.company?.links ?? []).map((l, idx) => (
                  <li key={idx}>
                    <Link
                      href={l.url}
                      className="hover:text-white transition-colors"
                      dangerouslySetInnerHTML={{ __html: l.label_html ?? "" }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div className="w-max">
              {looksLikeHtml(footer?.products?.title) ? (
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{ __html: footer?.products?.title ?? "" }}
                />
              ) : (
                <h3 className="font-[600] mb-2">
                  {footer?.products?.title ?? ""}
                </h3>
              )}
              <ul className="text-gray-200 space-y-0.5">
                {(footer?.products?.links ?? []).map((l, idx) => (
                  <li key={idx}>
                    <Link
                      href={l.url}
                      className="hover:text-white transition-colors"
                      dangerouslySetInnerHTML={{ __html: l.label_html ?? "" }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-16 md:ml-14 max-sm:flex-col">
            {/* Contact */}
            <div>
              {looksLikeHtml(footer?.contact?.title) ? (
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{ __html: footer?.contact?.title ?? "" }}
                />
              ) : (
                <h3 className="font-[600] mb-2">
                  {footer?.contact?.title ?? ""}
                </h3>
              )}

              <p
                className="text-gray-200 mb-6"
                dangerouslySetInnerHTML={{
                  __html: footer?.contact?.address_html ?? "",
                }}
              />

              <div className="mb-4">
                {footer?.contact?.phone_1 ? (
                  <>
                    <a
                      href={`tel:${footer.contact.phone_1.replace(/\s+/g, "")}`}
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      {looksLikeHtml(footer.contact.phone_1) ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: footer.contact.phone_1,
                          }}
                        />
                      ) : (
                        footer.contact.phone_1
                      )}
                    </a>
                    <br />
                  </>
                ) : null}

                {footer?.contact?.phone_2 ? (
                  <>
                    <a
                      href={`tel:${footer.contact.phone_2.replace(/\s+/g, "")}`}
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      {looksLikeHtml(footer.contact.phone_2) ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: footer.contact.phone_2,
                          }}
                        />
                      ) : (
                        footer.contact.phone_2
                      )}
                    </a>
                    <br />
                  </>
                ) : null}

                {footer?.contact?.email ? (
                  <a
                    href={`mailto:${footer.contact.email}`}
                    className="text-gray-200 hover:text-white transition-colors"
                  >
                    {looksLikeHtml(footer.contact.email) ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: footer.contact.email,
                        }}
                      />
                    ) : (
                      footer.contact.email
                    )}
                  </a>
                ) : null}
              </div>
            </div>

            {/* Social */}
            <div className="flex flex-col items-start justify-center gap-2">
              {looksLikeHtml(footer?.follow?.title) ? (
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{ __html: footer?.follow?.title ?? "" }}
                />
              ) : (
                <h3 className="font-[600] mb-2">{footer?.follow?.title ?? ""}</h3>
              )}

              {(footer?.follow?.links ?? []).map((l, idx) => {
                const url = l.url || "#";
                const label = l.label_html ?? "";

                return (
                  <Link
                    key={idx}
                    target="_blank"
                    href={url}
                    className="text-gray-200 items-center flex gap-2 hover:text-white transition-colors"
                  >
                    <div className="p-1 mx-auto rounded-full bg-white text-black">
                      <SocialIcon keyName={l.icon_key ?? null} />
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: label }} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
