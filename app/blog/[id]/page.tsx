// app/blog/[id]/page.tsx
import BlogClient from "./BlogClient";

export async function generateStaticParams() {
  const res = await fetch("https://api.derecho-ciudadano.com/api/blog");
  const json = await res.json();
  return json.data.map((post: any) => ({
    id: post.slug,
  }));
}

export default function NoticiaPage() {
  return <BlogClient />;
}
