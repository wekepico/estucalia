import { data } from '../../data/aplicaciones';
import AplicationClient from './AplicationClient';

export async function generateStaticParams() {
    return data.map((aplication) => ({
        id: aplication.id,
    }));
}

export default function Aplicaciones() {
    return <AplicationClient />;
}