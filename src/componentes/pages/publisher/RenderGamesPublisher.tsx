import EsqJogoPublisher from "@/componentes/esqueletos/EsqJogoPublisher"
import { jogos } from "@/servers/types/TypeJogos"
import Link from "next/link"


type renderGames = {
    jogos: jogos[]
}

export default function RenderGamesPublisher({
    jogos = []
}: renderGames){

    return(
        <div className="p-2 bg-[#292C31]">
            <div className="flex flex-col gap-4">
                {jogos && jogos.length > 0 && (
                    jogos?.map((j) => (
                        <Link 
                         href={`/jogos/${j?.id}`}
                        >
                            <EsqJogoPublisher
                            nome={j?.nome}
                            lancamento={j?.lancamento}
                            foto_jogo={j?.foto_jogo}
                            preco={j?.preco}
                            preco_desconto={j?.preco_desconto}
                            percentual={j?.percentual}
        
                            />
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}