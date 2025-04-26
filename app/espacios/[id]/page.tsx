import { data } from '@/app/data/espacios';
import ClientPage from '@/app/espacios/[id]/client-page';

export async function generateStaticParams() {
    return data.map((space) => ({
        id: space.id
    }));
}

export default function Page() {
    return <ClientPage />;
}