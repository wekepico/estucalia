import React from 'react';

interface CardServicesProps {
    title: string;
    description: string;
    bullets?: string[]; // Lista de viñetas
}

const CardServices = ({ title, description, bullets }: CardServicesProps) => {
    return (
        <div className="bg-white">
            <h3 className="text-xl font-semibold mb-2 border-b border-black border-solid">{title}</h3>
            <p className="text-xl mb-4">{description}</p>
            {bullets && (
                <ul className=" list-none space-y-2" >
                    {bullets.map((bullet, index) => (
                        <li key={index} style={{textDecoration:"none"}} className="">{bullet}   </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CardServices;