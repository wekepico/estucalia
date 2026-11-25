export default function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // Se escapa "<" para que ningún texto pueda cerrar la etiqueta script.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
