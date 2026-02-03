'use client'

import EsqCarrinho from "@/componentes/esqueletos/carrinho/EsqCarrinho";
import { dadosGlobais } from "@/componentes/gerenciaContext/GlobalContext";
import Layout from "@/componentes/layout/Layout";
import { jogos } from "@/servers/types/TypeJogos";
import { useEffect, useState } from "react";

type ArrayJogos = {
    jogosCarrinhos: jogos[],
    valorEstimado : number
}

export default function Carrinho(){
     
    const [arrayJogos, setArrayJogos] = useState<ArrayJogos>();


    const {usuario, token} = dadosGlobais()!;

    //puxa todos os jogos do Carrinho;
    const puxarJogosCarrinho = async() => {
        try{
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/${usuario.id}/carrinho/api`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
          })

          const resposta = await response.json();
          setArrayJogos(resposta);

          console.log(arrayJogos?.valorEstimado)
        }

        catch(error){
          console.log(error);
        }
    }

    //POST
    const AdicionarJogoAoCarrinho = async (id: number) => {
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/${usuario?.id}/carrinho/api`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
          },
            body: JSON.stringify({
            idJogo: id
          })
        })

        await puxarJogosCarrinho();
      }

      catch(error){
        console.log(error);
      }
     }
    
    //DELETE
    const deletaJogosDoCarrinho = async(id : number) => {
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/${usuario.id}/carrinho/api/?idJogo=${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `Bearer ${token}`
          }
        });

        await puxarJogosCarrinho();
      }

      catch(error){
        console.log(error);
      }
    }

    useEffect(() => {
       puxarJogosCarrinho();
    }, [])

    return(
        <div className="min-h-screen bg-[#223E59]">
            <Layout/>
            
            <div
             className="pt-20.5"
            >
                <EsqCarrinho
                  jogosCarrinhos={arrayJogos?.jogosCarrinhos}
                  valorEstimado={arrayJogos?.valorEstimado}
                  adicionar={AdicionarJogoAoCarrinho}
                  deletar={deletaJogosDoCarrinho}
                />
            </div>
        </div>
    )
}