'use client'

import { opcoesJogos } from "@/app/page";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

type opcoes = {
    tiposOpcoes : opcoesJogos[],
    enviarObjeto : (valor: string) => void
}


export default function Galeria({tiposOpcoes, enviarObjeto}: opcoes){

    const [tipoCategoria, setTipoCategoria] = useState<string>("Novidades populares");

    useEffect(() => {
        console.log("Enter in the useEffect", tipoCategoria);
        enviarObjeto(tipoCategoria);
    }, [tipoCategoria])

    return(
        <>
        {/*bg-[#2A475E]  bg-[#1B2838*/}
            <div
             className={`flex items-center bg-[#212429]`}>
                <Swiper
                slidesPerView={2}
                >
                    {tiposOpcoes?.map((o) => (
                        <SwiperSlide>
                            <p className={`
                                min-w-[170px] max-w-[170px]
                                p-2  text-center 
                                ${tipoCategoria === o.opcao ? 
                                    "p-2.5 text-[white] bg-[#2A475E] rounded-t-[10px] duration-150" 
                                        : 
                                    "text-[#A0A0A0]"
                                }`
                            }
                                onClick={() => setTipoCategoria(o.opcao)}
                            >
                                {o.opcao}
                            </p>
                        </SwiperSlide>
                    ))}
                </Swiper>
                
                <img
                    src={"/gerais/triangle.png"}
                    className="min-w-[25px] min-h-[25px] max-w-[35px] max-h-[35px] p-2 bg-[#2A475E] rounded-[5px]"
                />
            </div>
        </>
    )
}