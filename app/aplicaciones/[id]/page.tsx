import { data } from '../../data/aplicaciones';
import AplicationClient from './AplicationClient';
import { getApplications } from '@/services/applicationsService';

// app/aplicaciones/[id]/page.tsx

export async function generateStaticParams() {
  try {
    const response = await getApplications();
    const applications = response.data;

    const set = new Set<string>();

    applications.forEach((app) => {
      // ✅ SIEMPRE incluir slug base (ES)
      if (app.slug) set.add(app.slug);

      if (app.slug_en) set.add(app.slug_en);
      if (app.slug_fr) set.add(app.slug_fr);

      // si por alguna razón viniera slug_es ya normalizado
      if ((app as any).slug_es) set.add((app as any).slug_es);
    });

    return Array.from(set).map((id) => ({ id }));
  } catch (e) {
    console.error("Error generating static params for applications:", e);
    return data.map((aplication) => ({ id: aplication.id }));
  }
}

export default function Aplicaciones() {
  return <AplicationClient />;
}