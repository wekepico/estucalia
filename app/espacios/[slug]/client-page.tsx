// app/espacios/[slug]/client-page.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";

import SpacesPage from "@/app/components/espacios/SpacesPage";
import { useLanguage } from "@/app/context/LanguageContext";
import { useSpacesPage } from "@/api/useSpacesPage"; // 👈 NUEVO
import SeoHead from "@/components/SeoHead"; // 👈 NUEVO

import { getImageUrl } from "@/lib/i18nHelpers";
import { Category, getApplicationCategories } from "@/services";
import { getSpaceBySlug, Space } from "@/services/spacesService";

function pickLang(obj: any, lang: "es" | "en" | "fr", base: string) {
  if (lang === "en") return obj?.[`${base}_en`] ?? obj?.[base] ?? "";
  if (lang === "fr") return obj?.[`${base}_fr`] ?? obj?.[base] ?? "";
  return obj?.[base] ?? "";
}

function pickSlug(obj: any, lang: "es" | "en" | "fr") {
  if (lang === "en") return obj?.slug_en ?? obj?.slug ?? "";
  if (lang === "fr") return obj?.slug_fr ?? obj?.slug ?? "";
  return obj?.slug ?? "";
}

export default function ClientPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { t, language } = useLanguage();

  // 👇 Obtener SEO general para espacios (mismo que en listado)
  const { data: seoData } = useSpacesPage();

  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true);

  const [categoriesByApp, setCategoriesByApp] = useState<
    Record<string, Category[]>
  >({});

  const categoriesByAppRef = useRef(categoriesByApp);
  useEffect(() => {
    categoriesByAppRef.current = categoriesByApp;
  }, [categoriesByApp]);

  const onTabChangeFetchIfNeeded = useCallback(
    async (appKey: string) => {
      if (!space) return;

      if (categoriesByAppRef.current[appKey]) return;

      const app = space.applications.find((a: any) => a.slug === appKey);
      if (!app) return;

      const res = await getApplicationCategories(app.slug);

      setCategoriesByApp((prev) => {
        if (prev[appKey]) return prev;
        return { ...prev, [appKey]: res.data };
      });
    },
    [space],
  );

  // 1) Cargar Space por slug
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await getSpaceBySlug(slug);
        if (!mounted) return;
        setSpace(res.data);
      } catch (e) {
        if (!mounted) return;
        setSpace(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [slug]);

  // 3) ViewModel para tu UI (mismo layout)
  const vm = useMemo(() => {
    if (!space) return null;

    const aplications = (space.applications ?? []).map((app: any) => ({
      key: app.slug,
      label: pickLang(app, language as any, "name"),
    }));

    const products = Object.entries(categoriesByApp).flatMap(
      ([appKey, cats]) => {
        const arr = Array.isArray(cats) ? cats : [];
        return arr.map((cat: any) => ({
          id: pickSlug(cat, language as any),
          name: pickLang(cat, language as any, "name"),
          icon: getImageUrl(cat.image_url || cat.image || null) || "",
          appKey,
        }));
      },
    );

    return {
      aplication: pickLang(space, language as any, "title"),
      descripcion: pickLang(space, language as any, "description"),
      img: space.image_url || "",
      aplications,
      products,
    };
  }, [space, categoriesByApp, language]);

  // 4) Prefetch del primer tab
  useEffect(() => {
    if (!space?.applications?.length) return;

    const firstKey = space.applications[0].slug;
    onTabChangeFetchIfNeeded(firstKey);
  }, [space]);

  if (loading) {
    return (
      <main className="min-h-screen gap-4 flex justify-center items-center bg-white md:pt-28 pt-16 lg:pt-32">
        <Loader width={50} height={50} /> Loading...
      </main>
    );
  }

  if (!vm) {
    return <div>{t("common.notFound")}</div>;
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      {/* 👇 SEO DINÁMICO - MISMO SEO PARA TODOS LOS ESPACIOS */}
      <SeoHead
        seo={seoData?.seo || null}
        url={currentUrl}
        fallbackTitle="Grupo Estucalia | Espacios"
        fallbackDescription="Descubre cómo nuestros morteros se adaptan a diferentes espacios: fachadas, interiores, exteriores y más soluciones constructivas."
      />

      <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32">
        <SpacesPage
          aplication={vm.aplication}
          descripcion={vm.descripcion}
          img={vm.img}
          aplications={vm.aplications}
          products={vm.products}
          onTabChangeFetchIfNeeded={onTabChangeFetchIfNeeded}
        />
      </main>
    </>
  );
}
