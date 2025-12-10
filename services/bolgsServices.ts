// Interface para los datos del blog que vienen del backend
// Basado en la respuesta real del endpoint: https://apiestucalia.innet.es/api/blog
export interface BlogPost {
    id: number;
    title: string;
    description: string;
    slug: string;
    photo: string;
    active: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    writer_id?: number | null;
    blog_category_id?: number | null;
    notified: number;
    writer?: any | null;
    // Campos calculados/derivados (no vienen del backend directamente)
    excerpt?: string;
    date?: string;
    category?: string;
}

// Función para obtener los posts del blog
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
    try {
        const response = await fetch('https://apiestucalia.innet.es/api/blog');
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data: any = await response.json();
        return data.data;
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : 'An unknown error occurred');
    }
};