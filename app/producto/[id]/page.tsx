"use client";

import ProductCategoryPage from "@/app/components/productos/ProductoPage";
import { useLanguage } from "@/app/context/LanguageContext";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Controlamos el montaje para prevenir errores de hidratación
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Obtenemos la última parte de la ruta (ej. “morteros_cal”),
  // la decodificamos por si tiene caracteres especiales
  const aplicationEncoded = pathname.split("/").pop();
  const aplication = decodeURIComponent(aplicationEncoded || "");


  // Mientras no estemos montados, mostramos un loader
  if (!mounted) {
    return (
      <main className="min-h-screen gap-4 flex justify-center items-center bg-white md:pt-28 pt-16 lg:pt-32">
        <Loader width={50} height={50} /> Loading...
      </main>
    );
  }

  // Ya montados, renderizamos la página de producto
  return <ProductCategoryPage categoryId={aplication} />;
}
