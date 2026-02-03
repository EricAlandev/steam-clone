import EsqJogosPesquisa from "@/componentes/esqueletos/EsqJogoPesquisa";
import { jogos } from "@/servers/types/TypeJogos";

type ArrayJogos = {
    jogosCarrinhos?: jogos[],
    valorEstimado? : number,
    adicionar: (id: number) => void,
    deletar: (id: number) => void
}

export default function EsqCarrinho({jogosCarrinhos, valorEstimado, adicionar, deletar} : ArrayJogos ){

    return(
        <div className="w-[85vw] mx-auto ">
            <div className="flex flex-col gap-12">
            {jogosCarrinhos ? (
                jogosCarrinhos?.map((jogo) => (
                        <>
                            <div className="relative">
                              <EsqJogosPesquisa
                                nome={jogo.nome}
                                foto_jogo={jogo.foto_jogo}
                                preco_desconto={jogo.preco_desconto}
                                preco={jogo.preco}
                                aceitacao_jogo={jogo.aceitacao_jogo}
                                categorias={jogo.categorias}
                              />
                              
                              {/*Adicionar / remover */}
                              <div className="absolute flex gap-4 right-[-14px] text-[white] ">
                                  <button
                                    onClick={() => {
                                      if (jogo.id){
                                        adicionar(jogo?.id)
                                      }
                                     } }
                                  >
                                    Adicionar
                                  </button>
        
                                  <p> | </p>
        
                                  <button
                                   onClick={() => {
                                    if (jogo.id){
                                      deletar(jogo?.id)
                                    }
                                   } }
                                  >
                                    Remover
                                  </button>
                              </div>
                            </div>
                            
                            
                        </>
                ))
            ) : (
                <> 
                    <p className="text-[white]">Nenhum jogo no carrinho</p>
                </>
            )}
            </div>

            {/*Valor + botão de pagamento */}
            <div>
              <p className="text-[white]">
                Valor estimado: R${valorEstimado ? valorEstimado : 0}
              </p>
              
              <button
                className="login_button mt-4"
                >
                    Continuar para o pagamento.
              </button>
            </div>
        </div>
    )
}