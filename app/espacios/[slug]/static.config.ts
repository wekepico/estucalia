import { data, Spaces } from '@/app/data/espacios';

export const getStaticPaths = async () => {
    const paths = data.map((space: Spaces) => ({
        params: { id: space.name },
    }));

    return {
        paths,
        fallback: false,
    };
}; 