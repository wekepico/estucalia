import React from 'react';
import { stripHtmlTags } from '@/lib/utils';

// Definimos las props del componente
interface ReachTextProps {
    content: string | null; // El contenido puede ser una cadena o null
    className?: string;     // className es opcional
}

export const ReachText: React.FC<ReachTextProps> = ({ content, className }) => {
    // Si no hay contenido, retornamos null
    if (!content) {
        return null;
    }

    // Extraer solo el texto, eliminando todas las etiquetas HTML
    // (el backend envía HTML para SEO pero solo queremos mostrar el texto en la UI)
    const textContent = stripHtmlTags(content);

    return (
        <p className={className}>
            {textContent}
        </p>
    );
};

export default ReachText;