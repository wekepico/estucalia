"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";

import SpacesPage from "@/app/components/espacios/SpacesPage";
import { useLanguage } from "@/app/context/LanguageContext";

import { getImageUrl } from "@/lib/i18nHelpers";
import { Category, getApplicationCategories } from "@/services";
import { getSpaceBySlug, Space } from "@/services/spacesService";

function pickLang(obj: any, lang: "es" | "en" | "fr", base: string) {
  // base = "title" o "description" o "name"
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

  const { t, language } = useLanguage(); // language: es|en|fr

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

    // ✅ lee desde ref para no recrear callback por cada cambio
    if (categoriesByAppRef.current[appKey]) return;

    const app = space.applications.find((a: any) => a.slug === appKey);
    if (!app) return;

    const res = await getApplicationCategories(app.slug);

    setCategoriesByApp((prev) => {
      if (prev[appKey]) return prev; // ✅ doble seguridad
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

    // Tabs = aplicaciones asociadas al espacio
    const aplications = (space.applications ?? []).map((app: any) => ({
      key: app.slug, // key estable (slug ES)
      label: pickLang(app, language as any, "name"), // nombre en el idioma actual
    }));

    // "products" = categorías, pero agrupadas por appKey (para filtrar igual que antes)
    const products = Object.entries(categoriesByApp).flatMap(
      ([appKey, cats]) => {
        const arr = Array.isArray(cats) ? cats : []; // ✅ blindaje
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

  // 4) Prefetch del primer tab para que al entrar no salga vacío
  useEffect(() => {
    if (!space?.applications?.length) return;

    const firstKey = space.applications[0].slug;
    onTabChangeFetchIfNeeded(firstKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
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
  );
}
