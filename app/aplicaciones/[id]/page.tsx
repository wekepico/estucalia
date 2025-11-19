import { data } from '../../data/aplicaciones';
import AplicationClient from './AplicationClient';
import { getApplications } from '@/services/applicationsService';

export async function generateStaticParams() {
    try {
        // Intentar obtener aplicaciones del backend
        const response = await getApplications();
        const applications = response.data;

        // Generar rutas para todos los slugs de todos los idiomas
        const params: { id: string }[] = [];

        applications.forEach((app) => {
            // Agregar slug español si existe
            if (app.slug_es) {
                params.push({ id: app.slug_es });
            }
            // Agregar slug inglés si existe
            if (app.slug_en) {
                params.push({ id: app.slug_en });
            }
            // Agregar slug francés si existe
            if (app.slug_fr) {
                params.push({ id: app.slug_fr });
            }
            // Fallback al slug principal
            if (!app.slug_es && !app.slug_en && !app.slug_fr) {
                params.push({ id: app.slug });
            }
        });

        return params;
    } catch (error) {
        console.error('Error generating static params for applications:', error);
        // Fallback a datos locales
        return data.map((aplication) => ({
            id: aplication.id,
        }));
    }
}

export default function Aplicaciones() {
    return <AplicationClient />;
}