'use client'

import { jogos } from "@/servers/types/TypeJogos"
import { slides } from "@/servers/types/TypeSlides";
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";

export default function SlidesJogos({slides} : jogos){

    //define por padrão o slide 1 como o slide com id 1;
    const [jogo, setJogo] = useState<slides>();

    //
    useEffect(() => {
        const PrimeiroSlide = slides?.find((slid) => slid?.slide_url !== "" )
        setJogo(PrimeiroSlide);
    }, [slides]);


    return(
        <div className="pt-0 pl-4 pr-4">

            {/*imagem principal */}
            <img 
                src={jogo?.slide_url}
                alt="" 
                className="w-full h-full mb-4"
            />

            {/*Array de fotos */}
            <Swiper 
            slidesPerView={3}
            spaceBetween={10}
            className="flex">
                {slides?.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <img 
                            src={slide?.slide_url} alt=""
                            onClick={() => setJogo(slide)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}