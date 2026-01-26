"use client";

import { FC } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { getLocalizedField } from "@/lib/i18nHelpers";

interface IDocumento {
    nombre: string;
    accion: string;
    enlace?: string;
}

interface IProducto {
    nombre: string;
    subtitulo?: string;
    imagen?: string;
    imagen2?: string;
    composicion?: string;
    caracteristicas?: string[];
    recomendaciones?: string[];
    precauciones?: string[];
    informacion_relevante?: string[];
    informacion_general?: string;
    aplicacion?: string[]; // If you use an array of strings
    documentacion?: IDocumento[];
    // Campos del backend para alt y title de imágenes
    image_alt_es?: string | null;
    image_alt_en?: string | null;
    image_alt_fr?: string | null;
    image_title_es?: string | null;
    image_title_en?: string | null;
    image_title_fr?: string | null;
    // Campos para imagen2 (si el backend los envía)
    image2_alt_es?: string | null;
    image2_alt_en?: string | null;
    image2_alt_fr?: string | null;
    image2_title_es?: string | null;
    image2_title_en?: string | null;
    image2_title_fr?: string | null;
}

interface ProductDetailProps {
    product: IProducto;
}


export const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
    const { t, language } = useLanguage();
    
    // Obtener alt y title del backend según el idioma actual, con fallback al nombre
    const imageAlt = getLocalizedField(product, 'image_alt', language) || product.nombre;
    const imageTitle = getLocalizedField(product, 'image_title', language) || product.nombre;
    const image2Alt = getLocalizedField(product, 'image2_alt', language) || product.nombre;
    const image2Title = getLocalizedField(product, 'image2_title', language) || product.nombre;

    // Helper para limpiar guiones al inicio de los items de lista
    const cleanListItem = (item: string) => {
        return item.replace(/^-\s*/, '').trim();
    };


    if (product.nombre === "MOLDES CENEFAS RODILLOS" || product.nombre === "HERRAMIENTAS") {
        return (
            <>
                <div className="flex max-md:flex-col gap-12">
                    {product.documentacion && product.documentacion.length > 0 && (
                        <div >

                            <ul className="list-none mt-5 ml-5">
                                <li>
                                    <strong>{t("productsSection.documentation")}</strong>
                                </li>
                                {product.documentacion.map((doc, i) => (
                                    <li key={i} className="flex items-center text-lg justify-between  gap-2">
                                        <span>{doc.nombre}</span>
                                        <a
                                            href={doc.enlace}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex gap-1 items-center"
                                        >
                                            {doc.accion || t('common.download')}
                                            <svg
                                                className={`w-5 h-5 transition-all rotate-90`}
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
                                        </a>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </>
        )
    }

    return (
        <div className="flex max-md:flex-col gap-12">
            <div className="flex-1 md:w-3/4">
                <h3 className="text-xl font-semibold">{product.nombre}</h3>
                {product.subtitulo && (
                    <h4 className="text-lg mb-4">{product.subtitulo}</h4>
                )}

                {product.composicion && (
                    <>
                        <p>
                            <strong>{t("productsSection.composition")}</strong>
                        </p>
                        <p>
                            {product.composicion}
                        </p>
                    </>
                )}

                {product.caracteristicas && product.caracteristicas.length > 0 && (
                    <div className="my-4">
                        <strong>{t("productsSection.features")}</strong>
                        <ul className="list-disc ml-5">
                            {product.caracteristicas.map((item, i) => (
                                <li key={i}>{cleanListItem(item)}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {product.recomendaciones && product.recomendaciones.length > 0 && (
                    <div className="my-4">
                        <strong>{t("productsSection.recommendations")}</strong>
                        <ul className="list-disc ml-5">
                            {product.recomendaciones.map((item, i) => (
                                <li key={i}>{cleanListItem(item)}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {product.aplicacion && product.aplicacion.length > 0 && (
                    <div className="my-4">
                        <strong>{t("productsSection.application")}:</strong>
                        <ul className="list-disc ml-5">
                            {product.aplicacion.map((item, i) => (
                                <li key={i}>{cleanListItem(item)}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {product.precauciones && product.precauciones.length > 0 && (
                    <div className="my-4">
                        <strong>{t("productsSection.cautions")}</strong>
                        <ul className="list-disc ml-5">
                            {product.precauciones.map((item, i) => (
                                <li key={i}>{cleanListItem(item)}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {product.informacion_relevante && product.informacion_relevante.length > 0 && (
                    <div className="my-4">
                        <strong>{t("productsSection.relevantInfo")}</strong>
                        <ul className="list-disc ml-5">
                            {product.informacion_relevante.map((info, i) => (
                                <li key={i}>{cleanListItem(info)}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {product.informacion_general && (
                    <p className="my-2">{product.informacion_general}</p>
                )}
            </div>

            {/* Documentation (if it exists) */}
            {product.documentacion && product.documentacion.length > 0 && (
                <div className="my-4 md:w-1/4 max-md:w-3/4">
                    <section className={`flex ${product.nombre === "MALLA REFUERZO" || product.nombre === "REINFORCEMENT MESH" || product.nombre === "MALLA DE REFUERZO" || product.nombre.includes("PVC") ? "ml-6" : ""}`}>
                        <Image
                            src={product.imagen || "/images/no-image.png"}
                            alt={imageAlt}
                            title={imageTitle}
                            width={180}
                            height={180}
                            style={{ height: 'auto' }}
                        />
                        {
                            product.imagen2 &&
                            <Image
                                src={product.imagen2 || "/images/no-image.png"}
                                alt={image2Alt}
                                title={image2Title}
                                width={180}
                                height={180}
                                style={{ height: 'auto' }}
                            />
                        }
                    </section>

                    <ul className="list-none mt-5 ml-5">
                        <li>
                            <strong>{t("productsSection.documentation")}</strong>
                        </li>
                        {product.documentacion.map((doc, i) => (
                            <li key={i} className="flex items-center justify-between mb-1.5  gap-2">
                                <span>{doc.nombre}</span>
                                <a
                                    href={doc.enlace}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-1 items-center hover:underline active:text-blue-400 hover:text-blue-600"
                                >
                                    {doc.accion || t('common.download')}
                                    <svg
                                        className={`w-5 h-5 transition-all rotate-90`}
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
                                </a>

                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
