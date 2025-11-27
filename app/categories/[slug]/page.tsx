import data from "@/app/components/productos/components/data-es.json";
import data2 from "@/app/components/productos/components/data-en.json";
import CategoryClient from "./CategoryClient";
import { getCategories } from '@/services/categoriesService';

// This function is used for static generation
export async function generateStaticParams() {
    try {
        // Intentar obtener categorías del backend
        const response = await getCategories();
        const categories = response.data;

        // Generar rutas para todos los slugs de todos los idiomas
        const params: { slug: string }[] = [];

        categories.forEach((category) => {
            // Agregar slug español si existe
            if (category.slug_es) {
                params.push({ slug: category.slug_es });
            }
            // Agregar slug inglés si existe
            if (category.slug_en) {
                params.push({ slug: category.slug_en });
            }
            // Agregar slug francés si existe
            if (category.slug_fr) {
                params.push({ slug: category.slug_fr });
            }
            // Fallback al slug principal
            if (!category.slug_es && !category.slug_en && !category.slug_fr) {
                params.push({ slug: category.slug });
            }
        });

        return params;
    } catch (error) {
        console.error('Error generating static params for categories:', error);
        // Fallback a datos locales
        const categories = [...data.categorias, ...data2.categorias];
        return categories.map((category) => ({
            slug: category.id,
        }));
    }
}

export default function CategoryPage() {
    return <CategoryClient />;
}

