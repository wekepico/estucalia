'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { fetchBlogPosts } from '@/services/bolgsServices';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';

interface Blog {
  id: number;
  title: string;
  photo: string;
  slug: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

export default function NewsSection() {
  const router = useRouter();
  const { t } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const handleViewNews = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBlogPosts();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchData();
    console.log(blogs);
  }, []);

  return (
    <section className="pb-12 md:pb-28 bg-white">
      {/* Featured Image */}
      <div className="relative h-[250px] md:h-[470px] mb-16 md:mb-32">
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center"
          style={{
            backgroundImage: "url('/img/bg-down.png')"
          }}
        />
      </div>

      <div className="mx-auto md:px-15 sm:px-10 px-5 lg:px-20">
        {/* Texto traducido: "Actualidad" */}
        <h2 className="text-xl md:text-2xl font-[600] mb-6 md:mb-8 text-center md:text-left">
          {t('home.news.title')} {/* Asegúrate de que esta clave exista en tu JSON de traducciones */}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="border-none shadow-none flex flex-col group"
            >
              <CardHeader className="p-0 overflow-hidden">
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px] mb-4 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${blog.photo}')` }}
                  />
                </div>
                <h3 className="text-base md:text-2xl px-4 md:px-0 mb-4 font-medium">
                  {blog.title}
                </h3>
              </CardHeader>

              <CardContent className="px-4 md:px-0 mt-auto">
                <div className='w-full flex justify-end'>
                  <Button
                    variant="outline"
                    className="relative pl-5 pr-12 py-4 md:py-5 border-none rounded-none"
                    onClick={() => handleViewNews(blog.slug)}
                  >
                    {/* Texto traducido: "Ver Noticia" */}
                    <span>{t('home.news.readMore')}</span> {/* Usa 'common.readMore' si prefieres */}
                    <div className='absolute right-0'>
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}