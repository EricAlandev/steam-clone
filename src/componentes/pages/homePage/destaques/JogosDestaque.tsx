'use client'

import EsqJogosDestaques from "@/componentes/esqueletos/EsqJogosDestaques"

import { Swiper,SwiperSlide } from "swiper/react"

//types
import {ObjetoJogos } from "@/servers/types/TypeJogos"


export default function JogosDestaques({jogos}: ObjetoJogos){

    return(
        <>
            <Swiper 
            slidesPerView={1.45}
            spaceBetween={20}
            breakpoints={{
                320: {
                    slidesPerView: 1.45
                },
                1024: {
                    slidesPerView : 3
                }
            }}
            className=""
            >
                {jogos?.map((jogo) => (
                    <SwiperSlide key={jogo.id}>
                        <EsqJogosDestaques
                            idJogo={jogo.id}
                            nome_jogo={jogo.nome}
                            foto_destaque={jogo?.foto_destaque}
                            foto={jogo.foto_jogo}
                            percentual={jogo.percentual}
                            preco={jogo.preco}
                            precoDesconto={jogo.preco_desconto}
                            categorias={jogo.categorias}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}