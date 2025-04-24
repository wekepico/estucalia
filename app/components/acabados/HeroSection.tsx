'use client';

import MorteroCal from '../../../public/img/mortero-cal.svg';
import MorteroMonocapa from '../../../public/img/mortero-monocapa.svg';
import MorteroImpreso from '../../../public/img/mortero-impreso.svg';
import Piedra from '../../../public/img/mortero-piedra.svg';
import { ProductCard } from './components/ProductCard';
import { useLanguage } from '@/app/context/LanguageContext';

interface Acabado {
    name: string;
    descripcion: string;
    img: string;
    products: {
        id:string,
        name: string;
        icon: string;
    }[]
}

export const HeroSection: React.FC = () => {
    const { t } = useLanguage();
    
    const data: Acabado[] = [
        {
            name: t('finishes.categories.hammered'), // "Abujardado/raspado"
            img: "/img/acabados/raspado_abujardado.jpg",
            descripcion: t('finishes.descriptions.hammered'),
            products: [
                {
                    id:"sigleLayerMortar",
                    name: t('finishes.products.monocapa'), // "Mortero monocapa"
                    icon: MorteroMonocapa
                },
                {
                    id:"limeMortar",
                    name: t('finishes.products.lime'), // "Mortero cal"
                    icon:MorteroCal 
                },
                {
                    id:"stampedMortar",
                    name: t('finishes.products.printed'), // "Mortero impreso"
                    icon: MorteroImpreso
                },
            ]
        },
        {
            name: t('finishes.categories.washed'), // "Lavado/fratasado"
            img: "/img/acabados/lavado_fratasado.jpg",
            descripcion: t('finishes.descriptions.washed'),
            products: [
                {
                    id:"sigleLayerMortar",
                    name: t('finishes.products.monocapa'),
                    icon: MorteroMonocapa
                },
                {
                    id:"limeMortar",
                    name: t('finishes.products.lime'),
                    icon:MorteroCal 
                },
                {
                    id:"stampedMortar",
                    name: t('finishes.products.printed'),
                    icon: MorteroImpreso
                },
            ]
        },
        {
            name: t('finishes.categories.printed'), // "Impreso"
            img: "/img/acabados/impreso.jpg",
            descripcion: t('finishes.descriptions.printed'),
            products: [
                {
                    id:"limeMortar",
                    name: t('finishes.products.lime'),
                    icon: MorteroCal
                },
                {
                    id:"stampedMortar",
                    name: t('finishes.products.printed'),
                    icon: MorteroImpreso
                },
            ]
        },
        {
            name: t('finishes.categories.stone'), // "Piedra proyectada"
            img: "/img/acabados/piedra proyectada.jpg",
            descripcion: t('finishes.descriptions.stone'),
            products: [
                {
                    id:"stoneMortar",
                    name: t('finishes.products.stone'), // "Mortero Piedra"
                    icon: Piedra
                },
            ]
        },
        {
            name: t('finishes.categories.smooth'), // "Liso"
            img: "/img/acabados/liso.jpg",
            descripcion: t('finishes.descriptions.smooth'),
            products: [
                {
                    id:"singleLayerMortar",
                    name: t('finishes.products.monocapa'),
                    icon: MorteroMonocapa
                },
                {
                    id:"limeMortar",
                    name: t('finishes.products.lime'),
                    icon: MorteroCal
                },
                {
                    id:"stampedMortar",
                    name: t('finishes.products.printed'),
                    icon: MorteroImpreso
                },
            ]
        },
    ];

    return (
        <div className="flex flex-col gap-16 md:gap-28 px-5 sm:px-10 md:px-15 lg:px-20 pb-16">
            {data.map((element, index) => (
                <div
                  
                    className={`w-full flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                        } gap-8 md:gap-16 h-auto md:h-[520px]`}
                >
                    {/* Contenedor de texto y productos */}
                    <div className="flex flex-col w-full md:w-2/5 gap-6 justify-between">
                        <div className='flex flex-col gap-6'>
                            <h1 className="font-semibold text-3xl">{element.name}</h1>
                            <p className="text-lg">{element.descripcion}</p>
                        </div>
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