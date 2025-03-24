"use client";

import Image from "next/image";
import FinishesSection from "../home/FinishesSection";
import { ProductCard } from "./components/ProductCard";






 const ProdutoPage = ()=> {


    return (

        <section className="md:px-15 sm:px-10 px-5 lg:px-20 flex py-32 flex-col gap-24">
                   {/* { seccion de logo y descripcion } */}
            <section className="flex w-full gap-8">
                <ProductCard icon={"http://localhost:3000/_next/static/media/mortero-piedra.3cf2b7ea.svg"} name="prueba"/>
               
                <label className="p-8">
                        <h2 className="font-[600] text-2xl pb-5"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore </h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde aliquid 
                            laudantium, sed nostrum dolores dolorem odio accusamus.
                             Impedit quidem nihil labore expedita voluptas enim officia, nostrum quibusdam voluptatibus consectetur!
                        </p>
                </label>
            </section>

            {/* seccion de aplicaciones y acabados */}
            <section className="flex gap-36">
                <div>
                    <h2 className="font-[600] text-xl">Aplicaciones</h2>
                    <p>klasndkalsd</p>
                    <p>klasndkalsd</p>
                    <p>klasndkalsd</p>
                    <p>klasndkalsd</p>
                    <p>klasndkalsd</p>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="font-[600] text-xl">Acabados</h2>
                    <div className="flex gap-6">
                        {/* card */}
                        <div className="flex flex-col gap-2">
                            <h3 className=" text-lg">Impreso</h3>
                            <Image
                            alt="sad"
                            src={"asdasd"}
                            width={200}
                            height={140}
                            className="bg-gray-200"
                            />
                        </div>
                    </div>

                </div>
            </section>



        </section>
    )
 }





 export default ProdutoPage;




