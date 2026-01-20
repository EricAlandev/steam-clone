import EsqJogosPesquisa from "@/componentes/esqueletos/EsqJogoPesquisa"
import { jogos } from "@/servers/types/TypeJogos"
import Link from "next/link"

type props = {
    todosJogos: jogos[]
}

export default function RenderJogosPesquisa({todosJogos} : props){

    return(
        <div className="mt-4 p-4 ">
            <div className=" w-[90vw] mx-auto">
                {todosJogos ? (
                    <div className="flex flex-col gap-4">
                        {todosJogos?.map((jogo : jogos) => (
                        <>
                           <Link href={`/jogos/${jogo.id}`}>
                            <EsqJogosPesquisa
                                    key={jogo.id}
                                    nome={jogo.nome}
                                    foto_jogo={jogo.foto_jogo}
                                    preco_desconto={jogo.preco_desconto}
                                    preco={jogo.preco}
                                    aceitacao_jogo={jogo.aceitacao_jogo}
                                    categorias={jogo.categorias}
                                />
                            </Link>
                        </>
                    ))}
                    </div>
        
                ) : (
                    <p className=" text-center text-[white]">Nenhum jogo encontrado</p>
                )}
            </div>
        </div>
    )
}