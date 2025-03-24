import React from 'react';

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

    // Reemplazamos cualquier etiqueta <script> por "illegalscript" por seguridad
    const sanitizedContent = content.replace(/(<? *script)/gi, 'illegalscript');

    return (
        <p
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    );
};

export default ReachText;