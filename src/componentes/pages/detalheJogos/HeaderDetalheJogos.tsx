import { jogos } from "@/servers/types/TypeJogos";


export default function HeaderDetalheJogos({
    nome,
    descricao,
    lancamento,
    foto_jogo,
    categorias,
    desensolvedor_id,
    nomedesenvolvedor,
    distribuidora_id,
    nome_distribuidora,
    aceitacao_jogo,
    quantidade_comentarios



} : jogos) {


    return(
        <>  
            {/*Imagem */}
            <img
              src={foto_jogo}
            />

            <section className="mt-4 pl-4 pr-4">
                {/*Nome do jogo */}
                <p className="nomeJogo ">{nome}</p>
                
                
                <div className="mt-2">

                    {/*Cabeçário + dados*/}
                    <div className="flex">

                        {/*Cabeçário*/}
                        <div className="flex flex-col min-w-[120px] gap-2"> 
                            <p className="subCategoriasJogo">Desenvolvedor:</p>

                            <p className="subCategoriasJogo">
                            Distribuidora: 
                            </p>

                            <p className="subCategoriasJogo">
                                Lançado:
                            </p>

                            
                        </div>

                        {/*Dados */}
                        <div className="flex flex-col min-w-[120px] gap-2">

                        <p 
                                className=" text-[#45ACFF]"
                            >             
                            {nomedesenvolvedor}
                            </p>

                        <p 
                        className=" text-[#45ACFF]"
                        >  
                            {nome_distribuidora}
                        </p>

                        <p className="text-[#D0D0D0]">
                                {lancamento}
                            </p>
                        
                        </div>
                    </div>


                    {/*Descrição */}
                    <p className="texto mt-4">
                        {descricao}
                    </p>


                    {/*Categorias */}
                    {categorias && (
                        <div className="grid grid-cols-3 gap-4 mt-4 ">
                            {categorias?.map((categoria) => (
                                <p className="categoriasJogoNaPage">{categoria.nome_categoria}</p>
                            ))}
                        </div>
                    )}

                    {/*Análises */}
                    <p className="mt-4 mb-4  text-[17px] text-[white] uppercase" >
                        Análises
                    </p>

                    <div className="flex items-center gap-3 p-2 text-[16px] bg-[#131A24] rounded-t-md">
                        <p className="text-[15px] text-[gray] uppercase">RECENTES: </p>

                        <p className={`
                        ${
                            aceitacao_jogo === "Sem avaliações" ? "text-[#A0A0A0]" : 
                            aceitacao_jogo === "Extremamente Negativas" ? "text-red-900" : 
                            aceitacao_jogo === "Bem Negativas" ? "text-red-800" : 
                            aceitacao_jogo === "Negativas" ? "text-red-500" : 
                            aceitacao_jogo === "Neutras" ? "text-gray-500" : 
                            aceitacao_jogo === "Positivas" || aceitacao_jogo === "Bem positivas" || aceitacao_jogo === "Extremamente Positivas" ? "text-[#45ACFF]" : 
                            ""
                        }
                        `}>
                        {aceitacao_jogo}
                        </p>

                        <p className=" text-[#A0A0A0]">
                            ({quantidade_comentarios})
                        </p>
                    </div>
                </div>
            </section>

            
        </>
    )
}