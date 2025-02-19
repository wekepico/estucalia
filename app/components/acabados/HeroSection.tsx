import MorteroCal from '../../../public/img/mortero-cal.svg'
import MorteroMonocapa from '../../../public/img/mortero-monocapa.svg'
import MorteroImpreso from '../../../public/img/mortero-impreso.svg'
import Piedra from '../../../public/img/mortero-piedra.svg'
import { ProductCard } from './components/ProductCard'



interface Acabado {
    name: string;
    descripcion: string;
    img: string;
    products: {
        name: string;
        icon: string;
    }[]
}

const data: Acabado[] = [
    {
        name: "Abujardado/raspado",
        img: "/img/acabados/raspado_abujardado.jpg",
        descripcion: "El acabado abujardado o raspado en morteros se caracteriza por una textura rugosa y uniforme obtenida mediante el raspado superficial del material antes de su endurecimiento. Esta solución constructiva es ideal para fachadas y paredes exteriores, ya que proporciona una gran resistencia al desgaste y a las inclemencias climáticas. Además, el aspecto texturizado disimula imperfecciones y aporta un carácter rústico y elegante al diseño arquitectónico, siendo perfecto para proyectos que buscan un acabado artesanal y robusto.",
        products: [
            {
                name: 'Mortero monocapa',
                icon: MorteroCal

            },
            {
                name: 'Mortero de cal',
                icon: MorteroMonocapa

            },
            {
                name: 'Mortero impreso',
                icon: MorteroImpreso
            },
        ]

    },
    {
        name: "Lavado/fratasado",
        img: "/img/acabados/lavado_fratasado.jpg",
        descripcion: "El acabado lavado o fratasado se obtiene mediante el uso de una llana o fratacho, alisando la superficie del mortero hasta lograr una textura suave y uniforme. Esta técnica es ideal para fachadas, paredes interiores y suelos, ofreciendo una apariencia limpia y moderna. El mortero con acabado fratasado garantiza una buena adherencia a pinturas o revestimientos adicionales. Además, su capacidad para repeler el agua y evitar fisuras lo convierte en una solución duradera y estéticamente versátil.",
        products: [
            {
                name: 'Mortero monocapa',
                icon: MorteroCal

            },
            {
                name: 'Mortero de cal',
                icon: MorteroMonocapa

            },
            {
                name: 'Mortero impreso',
                icon: MorteroImpreso
            },
        ]

    },
    {
        name: "Impreso",
        img: "/img/acabados/impreso.jpg",
        descripcion: "El acabado impreso en morteros permite replicar texturas de piedra, madera, adoquines o cualquier diseño decorativo sobre la superficie antes de su endurecimiento. Es una solución muy utilizada en suelos exteriores, patios y caminos debido a su gran resistencia al tránsito y condiciones climáticas. La posibilidad de personalización en colores y patrones hace del mortero impreso una opción ideal para proyectos arquitectónicos que buscan estética, funcionalidad y durabilidad en sus pavimentos o revestimientos.",
        products: [
            {
                name: 'Mortero de cal',
                icon: MorteroMonocapa

            },
            {
                name: 'Mortero impreso',
                icon: MorteroImpreso
            },
        ]

    },
    {
        name: "Piedra proyectada",
        img: "/img/acabados/piedra proyectada.jpg",
        descripcion: "El acabado de piedra proyectada consiste en la incorporación de partículas de piedra natural sobre el mortero fresco mediante una proyección controlada. Este acabado es ideal para fachadas y paredes exteriores, ya que proporciona una gran resistencia al desgaste y a las condiciones climáticas.Además, su aspecto pétreo y rústico aporta un diseño elegante y atemporal a las construcciones. La durabilidad y el bajo mantenimiento hacen de la piedra proyectada una solución arquitectónica eficiente y decorativa.",
        products: [
            {
                name: 'Mortero Piedra',
                icon: Piedra
            },
        ]

    },
    {
        name: "Liso",
        img: "/img/acabados/liso.jpg",
        descripcion: "El acabado liso se obtiene mediante el alisado completo del mortero, creando una superficie uniforme, suave y sin texturas visibles. Este tipo de acabado es ideal para interiores modernos y elegantes, así como para fachadas donde se busca una apariencia minimalista. Su aplicación es compatible con pinturas y revestimientos adicionales, lo que amplía las posibilidades decorativas. El mortero liso proporciona una excelente protección frente a la humedad y garantiza una solución constructiva versátil y estéticamente atractiva.",
        products: [
            {
                name: 'Mortero monocapa',
                icon: MorteroCal

            },
            {
                name: 'Mortero de cal',
                icon: MorteroMonocapa

            },
            {
                name: 'Mortero impreso',
                icon: MorteroImpreso
            },
        ]

    },

]






export const HeroSection: React.FC = () => {
    return (
        <div className="flex flex-col gap-16 md:gap-28 px-5 sm:px-10 md:px-15 lg:px-20 pb-16">
            {data.map((element, index) => (
                <div
                    key={element.name + index}
                    className={`w-full flex flex-col ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } gap-8 md:gap-16 h-auto md:h-[520px]`}
                >
                    {/* Contenedor de texto y productos */}
                    <div className="flex flex-col w-full md:w-2/5 gap-6 justify-between">
                        <h1 className="font-semibold text-3xl">{element.name}</h1>
                        <p className="text-lg">{element.descripcion}</p>
                        <div className="flex gap-4 flex-wrap">
                            {element.products.map((product, productIndex) => (
                                <ProductCard key={productIndex} {...product} />
                            ))}
                        </div>
                    </div>

                    {/* Contenedor de la imagen */}
                    <div className="relative w-full md:w-3/5 h-64 md:h-auto bg-slate-500">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${element.img}')` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};