import { jogos } from "@/servers/types/TypeJogos";


export default function EsqJogo({foto_jogo, foto_destaque, percentual, preco, preco_desconto} : jogos){

    const fotoJogo = foto_destaque || foto_jogo;

    return(
        <div
          className="w-[47vw]"
        >
            <img
                src={fotoJogo}
                className="w-full"
            />

            {/*Prices and percentuals */}
            <div className="flex gap-2 bg-[]">
                <p className="percentual">-{percentual}%</p> 

                <div className="flex gap-2">
                    <p className="preco_desconto">R$ {preco}</p> 

                    <p className="preco">R$ {preco_desconto}</p> 
                </div>

            </div>
        </div>
    )
}