"use client";
import ProductCategoryPage from "@/app/components/productos/ProductoPage";
import { useLanguage } from "@/app/context/LanguageContext";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import data from "../../components/productos/components/data-es.json";
import data2 from "../../components/productos/components/data-en.json";

export default function ProductPage() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [foundCategory, setFoundCategory] = useState<any>(null);

  // Obtenemos el ID de la categoría de la URL
  const idEncoded = pathname.split("/").pop();
  const categoryId = decodeURIComponent(idEncoded || "");

  // Cargar la categoría según el idioma
  useEffect(() => {
    setMounted(true);
    const currentData = language === "es" ? data : data2;
    const category = currentData.categorias.find(
      (cat: any) => cat.id.toLowerCase() === categoryId.toLowerCase()
    );
    setFoundCategory(category);
  }, [language, categoryId]);


  if (!mounted) {
    return (
      <main className="min-h-screen gap-4 flex justify-center items-center bg-white md:pt-28 pt-16 lg:pt-32">
        <Loader width={50} height={50} /> Loading...
      </main>
    );
  }

  if (!foundCategory) {
    return (
      <div className="pt-32 px-5">
        <h1 className="text-2xl font-bold">
          {t("categoryNotFound")}
        </h1>
      </div>
    );
  }

  return <ProductCategoryPage category={foundCategory} />;
}