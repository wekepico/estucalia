// app/blog/[id]/page.tsx
import BlogClient from "./BlogClient";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog?lang=es`);
  const json = await res.json();
  const blogs = json.response.blogs;
  return blogs.map((post: any) => ({ id: post.slug }));
}

export default function NoticiaPage() {
  return <BlogClient />;
}
