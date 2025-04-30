// Definimos la interfaz para la estructura de los datos del blog
// interface BlogPost {
//     id: number;
//     title: string;
//     content: string;
//     date: string;
//     // Agrega más campos según la estructura de la respuesta de la API
// }

// Función para obtener los posts del blog
export const fetchBlogPosts = async (): Promise<any> => {
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