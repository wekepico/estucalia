"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useLanguage } from "@/app/context/LanguageContext";
import type { Lang } from "@/services/contactPageService";
import { sendWorkWithUsMessage } from "@/services/workWithUsMessageService";
import { useWorkWithUsPage } from "@/api/useWorkWithUsPage";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, Toaster } from "react-hot-toast";

import { isHtml, sanitizeBasicHtml, markInternalAnchors } from "./html";

const formSchema = (t: any) =>
  z.object({
    nombre: z
      .string()
      .min(1, { message: t("workWithUs.form.validation.nameRequired") }),
    telefono: z
      .string()
      .min(9, { message: t("workWithUs.form.validation.phoneRequired") })
      .regex(/^[0-9]+$/, {
        message: t("workWithUs.form.validation.phoneNumbersOnly"),
      }),
    email: z
      .string()
      .email({ message: t("workWithUs.form.validation.emailInvalid") }),
    especialidad: z
      .string()
      .min(1, { message: t("workWithUs.form.validation.specialtyRequired") }),
    mensaje: z
      .string()
      .min(1, { message: t("workWithUs.form.validation.messageRequired") }),
    curriculum: z
      .custom<FileList>((value) => value instanceof FileList, {
        message: t("workWithUs.form.validation.cvRequired"),
      })
      .refine((files) => files?.length > 0, {
        message: t("workWithUs.form.validation.cvRequired"),
      }),
    aceptarPolitica: z.boolean().refine((val) => val, {
      message: t("workWithUs.form.validation.privacyPolicyRequired"),
    }),
    aceptarComercial: z.boolean().optional(),
  });

type FormData = z.infer<ReturnType<typeof formSchema>>;

function HtmlWithNextLinks({ html }: { html: string }) {
  const nodes = useMemo(() => {
    const doc = document.implementation.createHTMLDocument("");
    const container = doc.createElement("div");
    container.innerHTML = html;

    const walk = (el: ChildNode): React.ReactNode => {
      if (el.nodeType === Node.TEXT_NODE) return el.textContent;
      if (el.nodeType !== Node.ELEMENT_NODE) return null;

      const elem = el as HTMLElement;
      const tag = elem.tagName.toLowerCase();
      const className = elem.getAttribute("class") || undefined;

      const children = Array.from(elem.childNodes).map((c, i) => (
        <React.Fragment key={i}>{walk(c)}</React.Fragment>
      ));

      if (tag === "a") {
        const href = elem.getAttribute("href") || "#";
        const internal = elem.getAttribute("data-internal-link") === "1";

        if (internal) {
          return (
            <Link href={href} className={className}>
              {children}
            </Link>
          );
        }

        return (
          <a
            href={href}
            className={className}
            target={elem.getAttribute("target") || undefined}
            rel={elem.getAttribute("rel") || undefined}
          >
            {children}
          </a>
        );
      }

      if (tag === "strong")
        return <strong className={className}>{children}</strong>;
      if (tag === "p") return <p className={className}>{children}</p>;
      if (tag === "span") return <span className={className}>{children}</span>;
      if (tag === "br") return <br />;
      if (tag === "h1") return <h1 className={className}>{children}</h1>;
      if (tag === "h2") return <h2 className={className}>{children}</h2>;
      if (tag === "h3") return <h3 className={className}>{children}</h3>;

      return <span className={className}>{children}</span>;
    };

    return Array.from(container.childNodes).map((n, i) => (
      <React.Fragment key={i}>{walk(n)}</React.Fragment>
    ));
  }, [html]);

  return <>{nodes}</>;
}

export default function ApplicationForm() {
  const langCtx = useLanguage() as any;
  const t = langCtx?.t;

  const candidate = langCtx?.lang ?? langCtx?.language ?? "es";
  const lang: Lang = ["es", "en", "fr"].includes(candidate) ? candidate : "es";

  const { data: page } = useWorkWithUsPage();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      nombre: "",
      telefono: "",
      email: "",
      especialidad: "",
      mensaje: "",
      curriculum: undefined,
      aceptarPolitica: false,
      aceptarComercial: false,
    },
  });

  // ===== Textos backend =====
  const sectionTitleRaw = page?.section?.title ?? t("workWithUs.form.title");
  const sectionTextRaw = page?.section?.text ?? "";

  const sectionTitleHtml = useMemo(() => {
    if (!isHtml(sectionTitleRaw)) return null;
    return sanitizeBasicHtml(sectionTitleRaw); // respeta <h2 class="...">
  }, [sectionTitleRaw]);

  const sectionTextHtml = useMemo(() => {
    if (!sectionTextRaw) return "";
    if (!isHtml(sectionTextRaw)) {
      return sanitizeBasicHtml(
        `<p class="text-gray-900 text-base leading-relaxed">${sectionTextRaw}</p>`,
      );
    }
    return sanitizeBasicHtml(sectionTextRaw);
  }, [sectionTextRaw]);

  const fName = page?.form?.fields?.name ?? t("workWithUs.form.fields.name");
  const fPhone = page?.form?.fields?.phone ?? t("workWithUs.form.fields.phone");
  const fEmail = page?.form?.fields?.email ?? t("workWithUs.form.fields.email");
  const fSpec =
    page?.form?.fields?.speciality ?? t("workWithUs.form.fields.specialty");
  const fMsg =
    page?.form?.fields?.message ?? t("workWithUs.form.fields.message");
  const cvLabel = page?.form?.cvLabel ?? t("workWithUs.form.fields.cv");
  const submitText = page?.form?.submitText ?? t("workWithUs.form.submit");

  const legalRaw =
    page?.form?.legalInfoHtml ?? t("workWithUs.form.privacy.info");
  const checkbox1Raw = page?.form?.checkbox1Label ?? "";
  const checkbox2Raw =
    page?.form?.checkbox2Label ?? t("workWithUs.form.commercial.accept");

  const legalHtml = useMemo(() => sanitizeBasicHtml(legalRaw), [legalRaw]);

  const checkbox1Html = useMemo(() => {
    if (!checkbox1Raw) return "";
    const safe = sanitizeBasicHtml(checkbox1Raw);
    return markInternalAnchors(safe); // convierte <a href="/..."> a internal-link
  }, [checkbox1Raw]);

  const checkbox2Html = useMemo(
    () => sanitizeBasicHtml(checkbox2Raw),
    [checkbox2Raw],
  );

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      await sendWorkWithUsMessage({
        name: data.nombre,
        phone: data.telefono,
        email: data.email,
        speciality: data.especialidad,
        message: data.mensaje,
        cv: data.curriculum[0],
        consent_privacy: data.aceptarPolitica,
        consent_commercial: !!data.aceptarComercial,
        lang,
      });

      toast.success(t("workWithUs.form.successMessage"));
      form.reset();
      setFileName(null);
    } catch (error) {
      console.error("Error:", error);
      toast.error(t("workWithUs.form.errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-28 lg:px-32">
      <div className="container mx-auto px-11">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-44">
          {/* Description */}
          <div>
            {sectionTitleHtml ? (
              <div dangerouslySetInnerHTML={{ __html: sectionTitleHtml }} />
            ) : (
              <h2 className="text-3xl font-[600] mb-3">{sectionTitleRaw}</h2>
            )}

            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sectionTextHtml || "" }}
            />
          </div>

          {/* Form */}
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-6"
              >
                {/* Nombre */}
                <div className="border-b lg:col-span-1 col-span-2 border-black">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={fName}
                            className="border-none text-md"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Teléfono */}
                <div className="border-b lg:col-span-1 col-span-2 border-black">
                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="tel"
                            className="border-none text-md"
                            placeholder={fPhone}
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <div className="border-b border-black col-span-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            className="border-none text-md"
                            placeholder={fEmail}
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Especialidad */}
                <div className="border-b border-black col-span-2">
                  <FormField
                    control={form.control}
                    name="especialidad"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormControl>
                          <Input
                            placeholder={fSpec}
                            className="border-none text-md"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Mensaje */}
                <div className="border-b border-black col-span-2">
                  <FormField
                    control={form.control}
                    name="mensaje"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormControl>
                          <Input
                            placeholder={fMsg}
                            className="border-none text-md"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Upload CV */}
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="curriculum"
                    render={({ field: { onChange, ref } }) => (
                      <FormItem className="col-span-2">
                        <FormControl>
                          <Label
                            htmlFor="curriculum"
                            className="flex items-center gap-4 px-4 py-3 border-gray-300 cursor-pointer transition-colors"
                          >
                            <span className="text-gray-900 text-lg font-[600]">
                              {isHtml(cvLabel) ? (
                                <span
                                  dangerouslySetInnerHTML={{ __html: cvLabel }}
                                />
                              ) : (
                                cvLabel
                              )}
                            </span>
                            <Upload className="w-5 h-5" />
                            <Input
                              id="curriculum"
                              type="file"
                              className="hidden border-none rounded-none tx-md"
                              onChange={(e) => {
                                const files = e.target.files;
                                if (files?.length) {
                                  onChange(files);
                                  setFileName(files[0].name);
                                } else {
                                  setFileName(null);
                                }
                              }}
                              ref={ref}
                              disabled={isSubmitting}
                            />
                          </Label>
                        </FormControl>

                        {fileName && (
                          <div className="text-gray-600 mt-2">
                            {t("workWithUs.form.fields.fileSelected")}{" "}
                            {fileName}
                          </div>
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Legal info */}
                <div className="space-y-1 leading-none col-span-2">
                  {isHtml(legalHtml) ? (
                    <div dangerouslySetInnerHTML={{ __html: legalHtml }} />
                  ) : (
                    <p className="text-sm text-gray-900">{legalRaw}</p>
                  )}
                </div>

                {/* Checkbox 1 (con links internos Next) */}
                <FormField
                  control={form.control}
                  name="aceptarPolitica"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-none"
                          disabled={isSubmitting}
                        />
                      </FormControl>

                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-900">
                          {checkbox1Html ? (
                            <HtmlWithNextLinks html={checkbox1Html} />
                          ) : (
                            <>
                              {t("workWithUs.form.privacy.accept")}{" "}
                              <Link
                                className="underline"
                                href="/politica-privacidad"
                              >
                                {t("workWithUs.form.privacy.privacyPolicy")}
                              </Link>{" "}
                              {t("common.and")}{" "}
                              <Link className="underline" href="/aviso-legal">
                                {t("workWithUs.form.privacy.legalNotice")}
                              </Link>{" "}
                              {t("common.of")}{" "}
                              {t("workWithUs.form.privacy.companyName")}
                            </>
                          )}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Checkbox 2 */}
                <FormField
                  control={form.control}
                  name="aceptarComercial"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-none"
                          disabled={isSubmitting}
                        />
                      </FormControl>

                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-900">
                          {isHtml(checkbox2Html) ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: checkbox2Html,
                              }}
                            />
                          ) : (
                            checkbox2Raw
                          )}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  className="group w-[155px] flex gap-4 justify-end borde-1 p-2 py-6 border-black rounded-none"
                  variant="outline"
                  disabled={isSubmitting}
                >
                  <span>
                    {isSubmitting ? (
                      t("workWithUs.form.submitting")
                    ) : isHtml(submitText) ? (
                      <span
                        dangerouslySetInnerHTML={{ __html: submitText }}
                      />
                    ) : (
                      submitText
                    )}
                  </span>

                  {!isSubmitting && (
                    <svg
                      className="ml-2 w-10 h-10 transform transition-transform group-hover:translate-x-1 col-span-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={0.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </section>
  );
}
