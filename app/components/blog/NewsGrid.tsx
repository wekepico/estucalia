// app/components/blog/NewsGrid.tsx

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { BlogPost } from "@/services";

export default function NewsGrid({ blogs }: { blogs: BlogPost[] }) {
  const router = useRouter();
  const { t } = useLanguage();

  const handleViewNews = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <section className="lg:py-20 py-10 bg-white">
      <div className="mx-auto px-5 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-20">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="border-none shadow-none group cursor-pointer"
            >
              <CardHeader className="p-0">
                <div className="relative aspect-[16/9] mb-6 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${blog.photo}')` }}
                    role="img"
                    aria-label={blog.title}
                    title={blog.title}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </CardHeader>
              <CardContent className="px-0 space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-400">
                    {new Date(blog.createdAt).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-medium group-hover:text-gray-600 transition-colors duration-300">
                  {blog.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {blog.description.replace(/<[^>]*>/g, "").substring(0, 150)}
                  ...
                </p>
                <Button
                  onClick={() => handleViewNews(blog.slug)}
                  variant="outline"
                  className="relative pl-5 pr-12 py-4 md:py-5 border-none rounded-none mt-4"
                >
                  <span>{t("home.news.readMore")}</span>
                  <div className="absolute right-0">
                    <svg
                      className="w-10 h-10"
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
                  </div>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
