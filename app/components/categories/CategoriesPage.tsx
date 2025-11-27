"use client";
import { useCategories } from '@/api/useCategories';
import { useLanguage } from '@/app/context/LanguageContext';
import { getLocalizedField, getLocalizedSlug } from '@/lib/i18nHelpers';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CategoriesPage() {
    const { t, language } = useLanguage();
    const { data: categoriesData, isLoading, error } = useCategories();

    if (isLoading) {
        return (
            <main className="min-h-screen gap-4 flex justify-center items-center bg-white md:pt-28 pt-16 lg:pt-32">
                <Loader width={50} height={50} /> Loading...
            </main>
        );
    }

    if (error || !categoriesData?.data) {
        return (
            <main className="min-h-screen gap-4 flex justify-center items-center bg-white md:pt-28 pt-16 lg:pt-32">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">{t("common.error") || "Error"}</h1>
                    <p>{t("common.errorMessage") || "Error loading categories"}</p>
                </div>
            </main>
        );
    }

    const categories = categoriesData.data;

    return (
        <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32">
            <div className="px-5 sm:px-10 md:px-15 lg:px-20 py-8 md:py-16">
                <h1 className="text-2xl md:text-4xl font-[600] mb-8 md:mb-12">
                    {t("navigation.products.label") || "Categories"}
                </h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {categories.map((category) => {
                        const categorySlug = getLocalizedSlug(category, language as 'es' | 'en' | 'fr') || category.slug;
                        const categoryName = getLocalizedField(category, 'name', language as 'es' | 'en' | 'fr') || category.slug;
                        const categoryImage = category.image_url || '/img/default.jpg';

                        return (
                            <Link 
                                key={category.id || category.slug} 
                                href={`/categories/${categorySlug}`}
                                className="bg-stone-50 group hover:bg-stone-100 transition-colors cursor-pointer block"
                            >
                                <div className="px-4 py-8 md:px-8 md:py-16 lg:px-16 lg:py-20 flex flex-col items-center text-center">
                                    <div className="mb-4 md:mb-6">
                                        <Image
                                            src={categoryImage}
                                            alt={categoryName}
                                            width={180}
                                            height={100}
                                            className="h-32 md:h-48 w-auto object-contain"
                                        />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-[600] mb-1">
                                        {categoryName.toUpperCase()}
                                    </h3>
                                </div>
                                <div className='w-full p-4 flex justify-end'>
                                    <Button
                                        variant="outline"
                                        className="border-none relative pl-5 pr-10 py-4 md:py-5 rounded-none"
                                    >
                                        <span>{t('common.viewProduct') || 'View Products'}</span>
                                        <div className='absolute right-0'>
                                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </Button>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {categories.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">
                            {t("common.noCategories") || "No categories available"}
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}

