import { jogos } from "@/servers/types/TypeJogos";

export default function EsqJogosGaleria({nome ,foto_jogo, percentual, preco, preco_desconto} : jogos){

    return(
        <div
          className="w-[90vw] flex bg-[#1B2838]"
        >
            <img
                src={foto_jogo}
                className="w-[30vw]"
            />
            
            {/*Body of the skeleton  */}
            <div className="flex items-center gap-2">

                {/*Names and categorys */}
                <div className=" gap-2 ">
                    <p className="max-w-[130px] mt-1 ml-1.5 text-[14px] text-[white]">{nome}</p>

                </div>

                {/*Prices and percentuals */}
                <div className="flex items-center gap-2">
                        <p className="px-1 py-0.5 text-[13.5px] bg-[#A1CD44] rounded-[3px]">-{percentual}%</p>    
                        
                        <div className="leading-4 ">
                            <p className="flex justify-end text-[14px] line-through text-[gray]">R$ {preco}</p> 

                            <p className="text-[16px] text-[white]">R$ {preco_desconto}</p> 
                        </div>
                </div>
            </div>
        </div>
    )
}