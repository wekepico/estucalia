'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { fetchBlogPosts } from '@/services/bolgsServices';

interface Blog {
  id: number;
  title: string;
  photo: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
}

export default function NewsGrid() {
  const router = useRouter();
  const { t } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const data = await fetchBlogPosts();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    fetchData();
  }, []);

  const handleViewNews = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="lg:py-20 py-10 bg-white">
      <div className="mx-auto px-5 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-20">
          {blogs.map((blog) => (
            <Card key={blog.id} className="border-none shadow-none group cursor-pointer">
              <CardHeader className="p-0">
                <div className="relative aspect-[16/9] mb-6 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${blog.photo}')` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </CardHeader>
              <CardContent className="px-0 space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-400">{blog.date}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-medium group-hover:text-gray-600 transition-colors duration-300">
                  {blog.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {blog.excerpt}
                </p>
                <Button 
                  onClick={() => handleViewNews(blog.slug)}
                  variant="outline"
                  className="relative pl-5 pr-12 py-4 md:py-5 border-none rounded-none mt-4"
                >
                  <span>{t('home.news.readMore')}</span>
                  <div className='absolute right-0'>
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5l7 7-7 7" />
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