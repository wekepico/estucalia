import ProjectHelpSection from "../contacto/ProjectHelpSection";

const inspirationImages = [
    {
        url: "img/image1.jpg",
        alt: "Contemporary architecture",
        size: "large" // Nueva propiedad para controlar el tamaño
    },
    {
        url: "img/img-8.jpg",
        alt: "Urban architecture",
        size: "medium"
    },
    {
        url: "img/img-3.jpg",
        alt: "Minimalist building design",
        size: "small"
    },
    {
        url: "img/img1.jpg",
        alt: "Minimalist building design",
        size: "small"
    },
    {
        url: "img/aplicaciones/terraza.jpg",
        alt: "Modern facade detail",
        size: "full"
    },
    {
        url: "img/img-4.jpg",
        alt: "Contemporary architecture",
        size: "medium"
    },
    {
        url: "img/Home.jpg",
        alt: "Urban architecture",
        size: "medium"
    },



];

export default function InspirationPage() {
    return (
        <section className="bg-white">
            {/* Featured Image */}
            <div className="w-full h-72 md:px-15 sm:px-10 px-5 lg:px-20 pt-20 pb-16 text-5xl font-[600] text-left items-end flex bg-[#ffffff] text-black">
                <h1 className="w-[36rem]">Casos reales que te ayudan a inspirarte</h1>
            </div>
            
            {/* Image Grid Modificado */}
            <div className="md:px-15 sm:px-10 px-5 lg:px-20 grid grid-cols-4 grid-rows-5 pb-28 gap-4">
                {inspirationImages.map((image, index) => (
                    <div
                        key={index}
                        className={`relative overflow-hidden group cursor-pointer
                            ${image.size === 'large' ? 
                                'col-span-2 row-span-2 h-800px' : 
                                image.size === 'full' ? 
                                'col-span-4 row-span-2 h-800px' : 
                             image.size === 'medium' ? 
                                'col-span-2 row-span-1 h-[400px]' : 
                                'col-span-1 row-span-1 h-[400px]'}
                        `}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-"
                            style={{ backgroundImage: `url('${image.url}')` }}
                            role="img"
                            aria-label={image.alt}
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300" />
                    </div>
                ))}
            </div>

            <ProjectHelpSection/>
        </section>
    )
}