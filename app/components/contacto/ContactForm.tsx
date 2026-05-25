"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLanguage } from "@/app/context/LanguageContext";
import { looksLikeHtml } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, Toaster } from "react-hot-toast";
import { sendContactMessage } from "@/services/contactMessageService";
import type { ContactPageData, Lang } from "@/services/contactPageService";

const formSchema = (t: any) =>
  z.object({
    nombre: z
      .string()
      .min(1, { message: t("contact.form.validation.nameRequired") }),
    telefono: z
      .string()
      .min(1, { message: t("contact.form.validation.phoneRequired") })
      .max(50, { message: t("contact.form.validation.phoneRequired") }),
    email: z
      .string()
      .email({ message: t("contact.form.validation.emailInvalid") }),
    asunto: z
      .string()
      .min(1, { message: t("contact.form.validation.subjectRequired") }),
    mensaje: z
      .string()
      .min(1, { message: t("contact.form.validation.messageRequired") }),
    aceptarPolitica: z.boolean().refine((val) => val, {
      message: t("contact.form.validation.privacyPolicyRequired"),
    }),
    aceptarComercial: z.boolean().optional(),
  });

type FormData = z.infer<ReturnType<typeof formSchema>>;

function safeLang(raw: any): Lang {
  const v = (raw?.language ?? raw?.lang ?? "es") as string;
  return (["es", "en", "fr"].includes(v) ? v : "es") as Lang;
}

function telHref(phone: string) {
  return "tel:" + phone.replace(/\s+/g, "");
}

export default function ContactForm({
  pageData,
}: {
  pageData?: ContactPageData | null;
}) {
  const langCtx = useLanguage() as any;
  const { t } = langCtx;
  const lang = safeLang(langCtx);

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      nombre: "",
      telefono: "",
      email: "",
      asunto: "",
      mensaje: "",
      aceptarPolitica: false,
      aceptarComercial: false,
    },
  });

  useEffect(() => setMounted(true), []);

  const contact = pageData?.contact;
  const formInfo = pageData?.form;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await sendContactMessage({
        name: data.nombre,
        phone: data.telefono,
        email: data.email,
        subject: data.asunto,
        message: data.mensaje,
        consent_privacy: data.aceptarPolitica,
        consent_commercial: !!data.aceptarComercial,
        lang,
      });

      if (!res?.success) throw new Error("Error al enviar el formulario");

      toast.success(res.message || t("contact.form.successMessage"));
      form.reset();
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        t("contact.form.errorMessage");

      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  const inputFields = [
    {
      name: "nombre",
      type: "text",
      placeholder: t("contact.form.name"),
      component: Input,
      required: true,
    },
    {
      name: "telefono",
      type: "tel",
      placeholder: t("contact.form.phone"),
      component: Input,
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: t("contact.form.email"),
      component: Input,
      required: true,
    },
    {
      name: "asunto",
      type: "text",
      placeholder: t("contact.form.subject"),
      component: Input,
      required: true,
    },
    {
      name: "mensaje",
      component: Textarea,
      placeholder: t("contact.form.message"),
      required: true,
    },
  ];

  const checkbox1Label =
    formInfo?.checkbox1Label ?? t("contact.form.privacyPolicy");
  const checkbox2Label =
    formInfo?.checkbox2Label ?? t("contact.form.commercialInfo");

  const phones = (contact?.phones ?? []).filter((p) => !!p?.number);
  const emails = (contact?.emails ?? []).filter((e) => !!e?.email);

  // Legal text: lo metemos en el MISMO <p> para no cambiar layout
  const legalHtmlOrText =
    formInfo?.legalInfoHtml ?? t("contact.form.dataProtection");

  return (
    <section className="lg:pr-64 lg:pl-28 lg:py-28 py-16 ">
      <Toaster position="top-right" />
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-2 md: gap-12">
          {/* Información de contacto */}
          <div className="min-w-max">
            {(() => {
              const titleValue = contact?.title ?? t("contact.title");
              return looksLikeHtml(titleValue) ? (
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{ __html: titleValue }}
                />
              ) : (
                <h1 className="text-3xl mb-2" style={{ fontWeight: "600" }}>
                  {titleValue}
                </h1>
              );
            })()}

            <div className="space-y-6">
              <div>
                {(() => {
                  const lineValue =
                    contact?.address?.line ?? t("contact.address.line1");
                  return looksLikeHtml(lineValue) ? (
                    <div dangerouslySetInnerHTML={{ __html: lineValue }} />
                  ) : (
                    <p>{lineValue}</p>
                  );
                })()}
                {(() => {
                  const cityValue =
                    contact?.address?.city ?? t("contact.address.line2");
                  return looksLikeHtml(cityValue) ? (
                    <div dangerouslySetInnerHTML={{ __html: cityValue }} />
                  ) : (
                    <p>{cityValue}</p>
                  );
                })()}
                {(() => {
                  const regionValue = contact?.address?.region
                    ? `${contact.address.region} (${contact?.address?.country ?? ""}).`
                    : t("contact.address.line3");
                  return looksLikeHtml(regionValue) ? (
                    <div dangerouslySetInnerHTML={{ __html: regionValue }} />
                  ) : (
                    <p>{regionValue}</p>
                  );
                })()}
              </div>

              <div className="flex flex-col w-max">
                {phones.length ? (
                  phones.map((p, idx) => (
                    <a
                      key={idx}
                      href={telHref(p.number!)}
                      style={{ fontWeight: "600" }}
                      className="inline w-max hover:text-gray-600 transition-colors"
                    >
                      {looksLikeHtml(p.number) ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: p.number || "" }}
                        />
                      ) : (
                        p.number
                      )}
                    </a>
                  ))
                ) : (
                  <>
                    <a
                      href="tel:+34968862467"
                      style={{ fontWeight: "600" }}
                      className=" inline w-max hover:text-gray-600 transition-colors"
                    >
                      +34 968 862 467
                    </a>
                    <a
                      href="tel:+34663519854"
                      style={{ fontWeight: "600" }}
                      className="inline w-max hover:text-gray-600 transition-colors"
                    >
                      +34 663 519 854
                    </a>
                  </>
                )}

                {emails.length ? (
                  emails.map((e, idx) => (
                    <a
                      key={idx}
                      href={`mailto:${e.email}`}
                      className="inline w-max hover:text-gray-600 transition-colors"
                    >
                      {looksLikeHtml(e.email) ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: e.email || "" }}
                        />
                      ) : (
                        e.email
                      )}
                    </a>
                  ))
                ) : (
                  <a
                    href="mailto:grupoestucalia@grupoestucalia.com"
                    className="inline w-max hover:text-gray-600 transition-colors"
                  >
                    grupoestucalia@grupoestucalia.com
                  </a>
                )}
              </div>

              <div>
                <h2 className=" text-lg" style={{ fontWeight: "700" }}>
                  {t("contact.schedule.title")}
                </h2>

                {/* Sin cambiar layout global: mostramos el texto del backend respetando saltos */}
                {(() => {
                  const scheduleValue =
                    contact?.scheduleText ??
                    `${t("contact.schedule.weekdays")}\n${t("contact.schedule.weekdaysHours")}\n\n${t("contact.schedule.friday")}\n${t("contact.schedule.fridayHours")}\n\n${t("contact.schedule.summer")}\n${t("contact.schedule.summerHours")}`;
                  return looksLikeHtml(scheduleValue) ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: scheduleValue }}
                    />
                  ) : (
                    <div className="whitespace-pre-line">{scheduleValue}</div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="max-md:mb-16">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" grid grid-cols-2  gap-6"
              >
                {inputFields.map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name as keyof FormData}
                    render={({ field: formField }) => (
                      <FormItem
                        className={`${field.name == "nombre" || field.name == "telefono" ? "lg:col-span-1 col-span-2" : "col-span-2"}`}
                      >
                        <FormControl>
                          <div className="border-b border-black">
                            <field.component
                              className="border-none text-md"
                              type={(field as any).type}
                              placeholder={(field as any).placeholder}
                              {...formField}
                              value={formField.value as string}
                              onChange={formField.onChange}
                              onBlur={formField.onBlur}
                              ref={formField.ref}
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <p className="text-sm col-span-2">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: String(legalHtmlOrText ?? ""),
                    }}
                  />
                </p>

                {/* Checkbox 1 */}
                <FormField
                  control={form.control}
                  name={"aceptarPolitica"}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-2">
                      <FormControl>
                        <Checkbox
                          className="rounded-none"
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                          required={true}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-900">
                          {looksLikeHtml(checkbox1Label) ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: String(checkbox1Label ?? ""),
                              }}
                            />
                          ) : (
                            checkbox1Label
                          )}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Checkbox 2 */}
                <FormField
                  control={form.control}
                  name={"aceptarComercial"}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-2">
                      <FormControl>
                        <Checkbox
                          className="rounded-none"
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-900">
                          {looksLikeHtml(checkbox2Label) ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: String(checkbox2Label ?? ""),
                              }}
                            />
                          ) : (
                            checkbox2Label
                          )}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="group w-[155px] flex gap-4 justify-end borde-1 p-2 py-6 border-black rounded-none"
                  variant="outline"
                  disabled={isSubmitting}
                >
                  <span>
                    {isSubmitting
                      ? t("contact.form.submitting")
                      : t("contact.form.submit")}
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
    </section>
  );
}
