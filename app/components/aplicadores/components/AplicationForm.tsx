"use client";

import React, { useEffect, useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, Toaster } from "react-hot-toast";
import { isHtml } from "../utils";

type Benefit = { title: string | null; text: string | null };

const formSchema = (t: any) =>
  z.object({
    nombre: z
      .string()
      .min(1, { message: t("contact.form.validation.nameRequired") }),
    telefono: z
      .string()
      .min(9, { message: t("contact.form.validation.phoneRequired") })
      .regex(/^[0-9]+$/, {
        message: t("contact.form.validation.phoneNumbersOnly"),
      }),
    email: z
      .string()
      .email({ message: t("contact.form.validation.emailInvalid") }),
    asunto: z
      .string()
      .min(1, { message: t("contact.form.validation.subjectRequired") }),
    mensaje: z.string(),
    aceptarPolitica: z.boolean().refine((val) => val, {
      message: t("contact.form.validation.privacyPolicyRequired"),
    }),
    aceptarComercial: z.boolean().optional(),
  });

type FormData = z.infer<ReturnType<typeof formSchema>>;

export default function ApplicationForm({
  titleHtml,
  introHtml,
  benefits,
  privacyText,
  checkbox1Label,
  checkbox2Label,
}: {
  titleHtml: string | null;
  introHtml: string | null;
  benefits: Benefit[];
  privacyText: string | null;
  checkbox1Label: string | null;
  checkbox2Label: string | null;
}) {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lang = (["es", "en", "fr"].includes(language) ? language : "es") as
    | "es"
    | "en"
    | "fr";

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
  if (!mounted) return null;

  const API_BASE = (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
  ).replace(/\/$/, "");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const payload = {
        name: data.nombre,
        phone: data.telefono,
        email: data.email,
        subject: data.asunto,
        message: data.mensaje,

        // ✅ nombres EXACTOS como tu Laravel espera
        consent_privacy: data.aceptarPolitica, // accepted
        consent_commercial: !!data.aceptarComercial, // boolean
        lang, // opcional
      };

      const response = await fetch(`${API_BASE}/v1/contacto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("API error:", response.status, result);
        throw new Error(result?.message || "Error al enviar el formulario");
      }

      toast.success(t("contact.form.successMessage"));
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error(t("contact.form.errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    {
      name: "nombre",
      type: "text",
      placeholder: t("contact.form.name"),
      component: Input,
    },
    {
      name: "telefono",
      type: "tel",
      placeholder: t("contact.form.phone"),
      component: Input,
    },
    {
      name: "email",
      type: "email",
      placeholder: t("contact.form.email"),
      component: Input,
    },
    {
      name: "asunto",
      type: "text",
      placeholder: t("contact.form.subject"),
      component: Input,
    },
    {
      name: "mensaje",
      placeholder: t("contact.form.message"),
      component: Textarea,
    },
  ] as const;

  const privacyLabel = checkbox1Label ?? t("contact.form.privacyPolicy");
  const commercialLabel = checkbox2Label ?? t("contact.form.commercialInfo");
  const legalText = privacyText ?? t("contact.form.dataProtection");

  return (
    <section className="py-28">
      <Toaster position="top-right" />
      <div className="mx-auto md:px-15 sm:px-10 px-5 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-44">
          {/* Left */}
          <div>
            {isHtml(titleHtml) ? (
              <div dangerouslySetInnerHTML={{ __html: titleHtml ?? "" }} />
            ) : (
              <h2 className="text-4xl font-[600] w-[21rem] mb-3">
                {titleHtml ?? ""}
              </h2>
            )}

            <div className="flex flex-col gap-8">
              {isHtml(introHtml) ? (
                <div dangerouslySetInnerHTML={{ __html: introHtml ?? "" }} />
              ) : (
                <p className="text-gray-900 text-xl inline leading-relaxed">
                  {introHtml ?? ""}
                </p>
              )}

              {(benefits ?? []).map((b, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  {isHtml(b.title) ? (
                    <div dangerouslySetInnerHTML={{ __html: b.title ?? "" }} />
                  ) : (
                    <p className="text-gray-900 font-[600] text-lg inline leading-relaxed">
                      {b.title ?? ""}
                    </p>
                  )}

                  {isHtml(b.text) ? (
                    <div dangerouslySetInnerHTML={{ __html: b.text ?? "" }} />
                  ) : (
                    <p className="text-gray-900 text-lg inline leading-relaxed">
                      {b.text ?? ""}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="max-md:mb-16">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-6"
              >
                {inputFields.map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name}
                    render={({ field: formField }) => (
                      <FormItem
                        className={`${
                          field.name === "nombre" || field.name === "telefono"
                            ? "lg:col-span-1 col-span-2"
                            : "col-span-2"
                        }`}
                      >
                        <FormControl>
                          <div className="border-b border-black">
                            <field.component
                              className="border-none text-md"
                              type={(field as any).type}
                              placeholder={(field as any).placeholder}
                              {...formField}
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                {/* Legal text */}
                {isHtml(legalText) ? (
                  <div
                    className="col-span-2"
                    dangerouslySetInnerHTML={{ __html: legalText }}
                  />
                ) : (
                  <p className="text-sm col-span-2">{legalText}</p>
                )}

                {/* Checkbox 1 */}
                <FormField
                  control={form.control}
                  name="aceptarPolitica"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-2">
                      <FormControl>
                        <Checkbox
                          id="privacy_policy"
                          className="rounded-none"
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                        />
                      </FormControl>

                      <div className="space-y-1 leading-none">
                        {isHtml(privacyLabel) ? (
                          <div
                            dangerouslySetInnerHTML={{ __html: privacyLabel }}
                          />
                        ) : (
                          <FormLabel
                            htmlFor="privacy_policy"
                            className="text-sm text-gray-900"
                          >
                            {privacyLabel}
                          </FormLabel>
                        )}
                        <FormMessage />
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
                          id="commercial_info"
                          className="rounded-none"
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                        />
                      </FormControl>

                      <div className="space-y-1 leading-none">
                        {isHtml(commercialLabel) ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: commercialLabel,
                            }}
                          />
                        ) : (
                          <FormLabel
                            htmlFor="commercial_info"
                            className="text-sm text-gray-900"
                          >
                            {commercialLabel}
                          </FormLabel>
                        )}
                        <FormMessage />
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
