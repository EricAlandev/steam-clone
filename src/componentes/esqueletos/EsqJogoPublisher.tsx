import { jogos } from "@/servers/types/TypeJogos";



export default function EsqJogoPublisher(
    {nome, lancamento, foto_jogo, preco, preco_desconto, percentual}
    :
    jogos
){

    return(
        <div className="flex min-h-[80px] gap-2.5 border-b-[2px] border-[#414549]">
            <img
                src={foto_jogo}
                className=" min-w-[32vw] max-w-[32vw] h-auto w-full h-full"
            />

            {/*right side of the skeleton */}
            <div>
                 
                 <div className="flex items-center">
                    <p className="min-w-[180px] text-[white] font-medium">
                        {nome}
                    </p>

                    <p className="text-[#A0A0A0] text-[12px]">
                        {lancamento}
                    </p>
                 </div>
                
                 {/*Defines if the preco_descotno exiscts or not */}
                 {preco_desconto ? (
                    <div className="flex items-center mt-2">
                        <span className="flex items-center px-1.5 py-1  text-[14.5px] bg-[#A1CD44] font-medium text-center">
                                -{percentual}%
                        </span>

                        <div className="flex items-center w-max gap-2 p-1 bg-[black] rounded-r-md">
                        
                            <p className="pl-1 text-[gray] text-[16px] line-through">
                                R${preco}
                            </p>

                            <p className="text-[white] text-[16px]">
                                R${preco_desconto}
                            </p>

                        </div>
                    </div>
                 ) : (
                    <div>
                        <p className="text-[white] text-[16px]">
                            {preco}
                        </p>
                    </div>
                 )}
                 
            </div>
        </div>
    )
}