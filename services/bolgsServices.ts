// Interface para los datos del blog que vienen del backend
// Basado en la respuesta real del endpoint: https://apiestucalia.innet.es/api/blog// services/blogService.ts

import axiosInstance from "./axiosConfig";
import { SeoData } from "./empresaService";
import { Lang } from "./types"; 


export interface BlogPostRaw {
    id: number;
    title: string;
    description: string;
    slug: string;
    photo: string | null;
    active: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    // ... otros campos
    meta_title_es?: string | null;
    meta_description_es?: string | null;
    // ...
    seo?: SeoData | null;
}

export interface BlogPost {
    id: number;
    title: string;
    description: string;
    slug: string;
    photo: string | null;
    createdAt: string;
    seo?: SeoData | null;
}

function normalizeBlogPost(raw: BlogPostRaw): BlogPost {
    return {
        id: raw.id,
        title: raw.title,
        description: raw.description,
        slug: raw.slug,
        photo: raw.photo,
        createdAt: raw.created_at,
        seo: raw.seo ?? null,
    };
}

export interface BlogPageResponse {
    blogs: BlogPost[];
    seo: SeoData | null;
}

export const getBlogPage = async (lang: Lang = "es"): Promise<BlogPageResponse> => {
    const { data } = await axiosInstance.get<{ status: number; response: { blogs: BlogPostRaw[]; seo: SeoData } }>(
        "/v1/blog",
        { params: { lang } }
    );
    return {
        blogs: data.response.blogs.map(normalizeBlogPost),
        seo: data.response.seo,
    };
};

export const getBlogPostBySlug = async (slug: string, lang: Lang = "es"): Promise<BlogPost> => {
    const { data } = await axiosInstance.get<{ success: boolean; data: BlogPostRaw }>(
        `/v1/blog/${slug}`,
        { params: { lang } }
    );
    return normalizeBlogPost(data.data);
};