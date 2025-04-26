
import data from "../../components/productos/components/data-es.json";
import data2 from "../../components/productos/components/data-en.json";
import ProductClient from "./ProductClient";

// This function is used for static generation
export async function generateStaticParams() {
    const categories = [...data.categorias, ...data2.categorias];
    return categories.map((category) => ({
        id: category.id,
    }));
}

export default function ProductPage() {
    return <ProductClient />;
}