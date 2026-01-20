import { jogos } from "@/servers/types/TypeJogos"

export default  function EsqJogosPesquisa(
    {nome, 
    foto_jogo, 
    preco_desconto, 
    preco, 
    aceitacao_jogo,
    categorias
} : jogos
){
    
    let qualidadeJogo;

    //função que verifica a qualidade do jogo no geral;
    if (aceitacao_jogo === "Extremamente Negativas" || aceitacao_jogo === "Bem Negativas" || aceitacao_jogo === "Negativas" ){
        qualidadeJogo = "negativa"
    }

    else if (aceitacao_jogo === "Neutras"){
        qualidadeJogo = "neutra"
    }

    else{
        qualidadeJogo = "positiva"

    }

    //verifica se tem categoria de dlc
    let categoria;
    for(let i = 0; i < categorias?.length; i ++){
        if(categorias[i].nome_categoria === "dlc"){
            categoria = "dlc";
        }
    }

    return(
        <div className="flex gap-5 w-[90vw] p-2.5 bg-[#101822] rounded-md">
            {/*Capa jogo - verifica se é dlc*/}
            {categoria === "dlc" ? (
                <div className="relative">
                    <img
                        src={foto_jogo}
                        className="min-w-[100px] max-w-[100px]"
                    />

                    <p></p>
                </div>
            ) : (
                <img
                  src={foto_jogo}
                  className="min-w-[100px] max-w-[130px]"
                />
            )}


            {/*Quadrante esquerdo */}
            <div>
                {/*Nome jogo */}
                <p className="max-w-[140px] text-[white]">{nome}</p>

                    {/*Aceitação do jogo */}
                    {qualidadeJogo === "negativa" && (
                        <img
                        src={"/gerais/Notlike.png"}
                        className="w-5 h-5 mt-0.5 "
                    />
                    )}

                    {qualidadeJogo === "neutra" && (
                        <p 
                        className="w-5 h-5 mt-0.5   bg-[#756448] text-[#D3B785] text-center"
                        >
                            ~
                        </p>
                    )}

                    {qualidadeJogo === "positiva" && (
                        <img
                        src={"/gerais/like.png"}
                        className="w-5 h-5 mt-0.5 "
                    />
                    )}
            </div>

            {/*
                Quadrante direito
                -Preço do jogo 
            */}
            {preco_desconto ? (
                <div>
                    <p className="preco_desconto">R${preco}</p>
                    <p className="preco">R${preco_desconto}</p>            
                </div>
            ) : (
                <>
                    <p className="preco">R${preco}</p>
                </>
            )}

            
        </div>
    )
}