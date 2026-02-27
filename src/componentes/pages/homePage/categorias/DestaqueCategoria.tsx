import { categorias } from "@/servers/types/TypeCategoria"
import EsqCategorias from "./EsqCategorias"
import { Swiper, SwiperSlide } from "swiper/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

type TodasCategorias = {
    asCategorias: categorias[]
}

export default function DestaqueCategoria({asCategorias}: TodasCategorias){

    const router = useRouter();

    return(
        <>
            <div className="flex gap-4 ">
                <Swiper 
                    slidesPerView={3}
                    spaceBetween={20}
                >
                {asCategorias?.map((c) => {
                    if(c.nome_categoria !== "Destaque" && c.nome_categoria !== "dlc"){
                        return(
                                
                                    <SwiperSlide
                                        key={c.id}
                                    >
                                        <Link
                                            href={`/pesquisa?pesquisaCategoria=${c.nome_categoria}`}
                                            className="block w-full h-full"
                                        >
                                            <EsqCategorias
                                            nomeCategoria={c.nome_categoria!}
                                            />
                                        </Link>
                                    </SwiperSlide>
                        )
                    }
                })}
               </Swiper>
            </div>
        </>
    )
}