'use client'

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

type opcao = {
    id: number,
    opcao: string
}

export type asOpcoes = {
    id: number, 
    opcoes: opcao
}

type RenderGamesPublisher = {
    opcoes?: asOpcoes[],
    mudouCategoria: (categoria: string) => void
}

export default function RenderGamesCategoryPublisher(
    {opcoes, mudouCategoria} 
    : 
    RenderGamesPublisher
    ){

    const [categoria, setCategoria] = useState<string>("Maiores descontos");

    useEffect(() => {
        mudouCategoria(categoria);
    }, [categoria]);


    
    return(
        <div className=" z-10">
            <Swiper
             slidesPerView={1}
             breakpoints={
                {
                    320: {
                        slidesPerView : 2
                    },

                    640: {
                        slidesPerView: 2
                    }
                }
             }
            >
                {opcoes?.map((o) => (
                    <SwiperSlide
                        key={o.id}
                        className={`p-2 text-[white] text-center
                            ${
                            o.opcoes.opcao === categoria 
                                ? 
                                    "bg-[#292C31] rounded-md" 
                                : 
                                ""
                            }
                        `}
                        onClick={() => setCategoria(o.opcoes.opcao)}
                    >
                        {o.opcoes.opcao}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}