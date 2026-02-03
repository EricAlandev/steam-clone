'use client'

import HeaderMobile from "@/componentes/header/HeaderMobile";
import HeaderPesquisa, { preco } from "@/componentes/pages/PesquisaPage/HeaderPesquisa";
import RenderJogosPesquisa from "@/componentes/pages/PesquisaPage/RenderJogosPesquisa";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { jogos } from "@/servers/types/TypeJogos";


export default  function PagePesquisa(){

    const [jogosFiltrados, setJogosFiltrados] = useState<jogos[]>([]);
    const [quantidadeJogos, setQuantidadeJogos] = useState(0);
    const [error, setError] = useState();

    const searchParams = useSearchParams();
    const pesquisa = searchParams.get("pesquisa")



    const Pesquisar = async (precoOrdem? : string) => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/pesquisa/api`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    pesquisa : pesquisa,
                    ordemPreco: precoOrdem || null
                })
            });
    
            const {quantidadeJogos, ArrayNovo} = await response.json();
            setQuantidadeJogos(quantidadeJogos)
            setJogosFiltrados(ArrayNovo);
        }

        catch(error : any){
            setError(error.message);
        }
    }

    //ativa a função de pesquisa toda vez que mudar a query;
    useEffect(() => {
        const ativaPesquisa = async () => {
            await Pesquisar();
        }

        if(pesquisa){
            ativaPesquisa();
        }
    }, [pesquisa])

    return(
        <div className="flex flex-col gap-20 min-h-screen bg-[#223E59]">
            <div >
                <HeaderMobile/>
            </div>
            
            <div>
                <HeaderPesquisa 
                    chamaFuncao={Pesquisar}
                    quantidadeResultados={quantidadeJogos}
                />

                <RenderJogosPesquisa
                    todosJogos={jogosFiltrados}
                />
            </div>
        </div>
    )
}