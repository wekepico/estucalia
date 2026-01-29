"use client";

import React, { useState } from "react";
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

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, Toaster } from "react-hot-toast";
import { useWorkWithUsPage } from "@/api/useWorkWithUsPage";

// Esquema de validación con Zod usando las traducciones (NO tocamos estructura)
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

const isProbablyHtml = (s?: string | null) =>
  !!s && /<\/?[a-z][\s\S]*>/i.test(s);

export default function ApplicationForm() {
  const langCtx = useLanguage() as any;
  const t = langCtx?.t;
  const lang = (langCtx?.lang ?? langCtx?.language ?? "es") as Lang;

  const { data: page } = useWorkWithUsPage(lang);

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

  // Textos del backend con fallback a t()
  const sectionTitle = page?.section?.title ?? t("workWithUs.form.title");

  // En tu API lo guardamos como text (puede ser HTML)
  const sectionText =
    page?.section?.text ??
    [
      t("workWithUs.form.description.part1"),
      `<strong>${t("workWithUs.form.description.part2")}</strong>`,
      t("workWithUs.form.description.part3"),
      `<strong>${t("workWithUs.form.description.part4")}</strong>`,
      t("workWithUs.form.description.part5"),
    ].join(" ");

  const fName = page?.form?.fields?.name ?? t("workWithUs.form.fields.name");
  const fPhone = page?.form?.fields?.phone ?? t("workWithUs.form.fields.phone");
  const fEmail = page?.form?.fields?.email ?? t("workWithUs.form.fields.email");
  const fSpec =
    page?.form?.fields?.speciality ?? t("workWithUs.form.fields.specialty");
  const fMsg =
    page?.form?.fields?.message ?? t("workWithUs.form.fields.message");
  const cvLabel = page?.form?.cvLabel ?? t("workWithUs.form.fields.cv");
  const submitText = page?.form?.submitText ?? t("workWithUs.form.submit");

  const legalInfoHtml =
    page?.form?.legalInfoHtml ?? t("workWithUs.form.privacy.info");
  const checkbox1 = page?.form?.checkbox1Label ?? null;
  const checkbox2 =
    page?.form?.checkbox2Label ?? t("workWithUs.form.commercial.accept");

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
            <h2 className="text-3xl font-[600] mb-3">{sectionTitle}</h2>

            {/* Mantiene el estilo, pero ahora viene del backend (permite <strong>) */}
            <div
              className="text-gray-900 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sectionText || "" }}
            />
          </div>

          {/* Form */}
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" grid grid-cols-2 gap-6"
              >
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
                              {cvLabel}
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

                {/* Legal info (backend) */}
                <div className="space-y-1 leading-none col-span-2">
                  <FormLabel className="text-sm text-gray-900">
                    {isProbablyHtml(legalInfoHtml) ? (
                      <span
                        dangerouslySetInnerHTML={{ __html: legalInfoHtml }}
                      />
                    ) : (
                      legalInfoHtml
                    )}
                  </FormLabel>
                </div>

                {/* Checkbox 1 */}
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
                          {checkbox1 ? (
                            isProbablyHtml(checkbox1) ? (
                              <span
                                dangerouslySetInnerHTML={{ __html: checkbox1 }}
                              />
                            ) : (
                              checkbox1
                            )
                          ) : (
                            <>
                              {t("workWithUs.form.privacy.accept")}{" "}
                              <a
                                className="underline"
                                href="/politica-privacidad"
                              >
                                {t("workWithUs.form.privacy.privacyPolicy")}
                              </a>{" "}
                              {t("common.and")}{" "}
                              <a className="underline" href="/aviso-legal">
                                {t("workWithUs.form.privacy.legalNotice")}
                              </a>{" "}
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
                          {checkbox2}
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
                    {isSubmitting
                      ? t("workWithUs.form.submitting")
                      : submitText}
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
