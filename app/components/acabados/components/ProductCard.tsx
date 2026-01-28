import Image from "next/image";

interface CategoryCardProps {
  slug: string;
  name: string;
  iconUrl: string | null;
}

export const ProductCard: React.FC<CategoryCardProps> = ({
  name,
  iconUrl,
  slug,
}) => {
  return (
    <div
      className="bg-gray-100 group hover:bg-stone-300 transition-colors cursor-pointer"
      onClick={() => {
        window.location.href = "/categories/" + slug;
      }}
    >
      <div className="min-w-[140px] py-4 flex flex-col items-center text-center">
        <div className="mb-2">
          {/* Opción rápida: si iconUrl es remoto y Next Image molesta con domains, usa <img> */}
          {iconUrl ? (
            <img src={iconUrl} alt={name} className="h-14 md:h-14 w-auto" />
          ) : (
            <div className="h-14 w-14 bg-gray-200" />
          )}
        </div>

        <h3
          title={name}
          className="text-[0.6rem] font-[600] mb-1 max-w-[min-content] line-clamp-2"
        >
          {name.toUpperCase()}
        </h3>
      </div>
    </div>
  );
};
