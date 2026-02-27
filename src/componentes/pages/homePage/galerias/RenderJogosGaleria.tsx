import { jogos } from "@/servers/types/TypeJogos"
import EsqJogosGaleria from "./EsqJogosGaleria"
import Link from "next/link"


type jogosRecebidos = {
    osJogos: jogos[]
}

export default function RenderJogosGaleria({osJogos}: jogosRecebidos){

    return(
        <div className="p-2 bg-[#2A475E] ">
            {osJogos?.map((j) => (
                <Link
                 href={`/jogos/${j.id}`}
                >
                    <EsqJogosGaleria
                        nome={j.nome}
                        foto_jogo={j.foto_jogo}
                        percentual={j.percentual}
                        preco={j.preco}
                        preco_desconto={j.preco_desconto}
                    />
                </Link>
            ))}
        </div>
    )
}