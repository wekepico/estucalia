// app/blog/[id]/page.tsx
import BlogClient from "./BlogClient";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog?lang=es`);
  const json = await res.json();
  const blogs = json.response.blogs; // Generar un array con todos los slugs únicos
  const params = [];

  for (const post of blogs) {
    // Slug en español
    if (post.slug) params.push({ id: post.slug });
    // Slug en inglés
    if (post.slug_en) params.push({ id: post.slug_en });
    // Slug en francés
    if (post.slug_fr) params.push({ id: post.slug_fr });
  }

  return params;
}

export default function NoticiaPage() {
  return <BlogClient />;
}
