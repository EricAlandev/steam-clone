import { jogos } from "@/servers/types/TypeJogos";


export default function Preco({
    nome, 
    preco, 
    preco_desconto, 
    percentual} : jogos){


    return(
        <div className="mt-4 ml-4 mr-4 bg-[#4D5C6A] rounded-md">
            <p className="nomeJogo ml-4">
                Comprar {nome}
            </p>
            
            <div className="flex justify-end mt-4 mr-4 ">


                {/*Preços */}
                {preco_desconto ? (
                <>
                    {/*Com desconto */}
                    <div className="flex h-[5vh] mb-4 gap-5 border-[2.5px] rounded-sm ">
                        <p className="percentual bg-[#4C6B22] text-[#BEEE11]">{percentual}%</p>


                        {/*Preços */}
                        <div className="flex items-center gap-3">
                            <div className="">
                                <p className="preco_desconto text-[15px]">
                                    R$ {preco}
                                </p>

                                <p className="mt-[-4.5px] mb-[1px] preco text-[18px]">
                                    R$ {preco_desconto}
                                </p>
                            </div>

                            {/*Carrinho */}
                            <div>
                                <p className="flex items-center h-[4.6vh] p-2 font-medium text-[white] bg-[#6BA721]">
                                    + Carrinho
                                </p>
                            </div>
                        </div>
                    </div>
                </>

                ) : (
                <div className="border-[2px]">
                    {/*Sem desconto */}
                        <p>{preco}</p>
                </div>
                )}
            </div>
        </div>
    )
}