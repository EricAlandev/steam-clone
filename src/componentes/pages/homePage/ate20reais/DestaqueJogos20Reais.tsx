
import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link"
import { jogos } from "@/servers/types/TypeJogos"
import EsqJogo from "@/componentes/esqueletos/EsqJogo"


type recebeJogos = {
    jogos: jogos[]
}

export default function DestaqueJogos20Reais({jogos}: recebeJogos){

    return(
        <>
            <div className="flex gap-4 ">
                <Swiper 
                    breakpoints={{
                        0: {
                            slidesPerView: 1
                        },

                        640: {
                            slidesPerView: 2
                        }
                    }}
                    spaceBetween={20}
                >
                {jogos?.map((j) => (
                                
                                    <SwiperSlide
                                        key={j.id}
                                    >
                                        <Link
                                            href={`/jogos/${j.id}`}
                                            className="block w-full h-full"
                                        >
                                            <EsqJogo
                                              foto_jogo={j.foto_jogo}
                                              foto_destaque={j.foto_destaque}
                                              percentual={j.percentual}
                                              preco={j.preco}
                                              preco_desconto={j.preco_desconto}
                                            />
                                        </Link>
                                    </SwiperSlide>
                        ))
                    }
               </Swiper>
            </div>
        </>
    )
}