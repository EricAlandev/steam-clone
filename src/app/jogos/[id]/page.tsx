'use client'

import { dadosGlobais } from "@/componentes/gerenciaContext/GlobalContext";
import Layout from "@/componentes/layout/Layout";
import PorComentario from "@/componentes/pages/detalheJogos/PorComentario";
import HeaderDetalheJogos from "@/componentes/pages/detalheJogos/HeaderDetalheJogos";
import Preco from "@/componentes/pages/detalheJogos/Preco";
import SlidesJogos from "@/componentes/pages/detalheJogos/SlidesJogos";
import { jogos } from "@/servers/types/TypeJogos";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RenderizacaoComents from "@/componentes/pages/detalheJogos/RenderizacaoComents";
import WebSocketClient from "@/servers/websockets/WebSocketClient";

type TipoComentario = {
  comentario : string,
  gostou: boolean
}

     //puxar os jogos em destaque
     export const DetalheJogos = async(id: string) => {
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/jogos/api/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
    
        const detalheJogos = await response.json();
        console.log(detalheJogos)


        return(
          detalheJogos
        )
      }

      catch(error){
        console.log(error);
      }
   }

export default function JogoPage(){

  
const {id} = useParams();

const {usuario, token} = dadosGlobais()!;

const [detalhes, setDetalhes] = useState<jogos>();

     useEffect(() => {
       if(id === '0'){
          return
       }

       const puxaDetalhes = async() => {
        const responsta = await DetalheJogos(id);
        setDetalhes(responsta);
       }

       puxaDetalhes();
     }, [id])


     //Adiciona Comentário
     const AdicionarComentario = async (comentario : TipoComentario) => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/avaliacoes/api`, {
              method: "POST",
              headers: {
                'Content-Type' : `application/json`,
                'Authorization' : `Bearer ${token}`
              }, 
                body: JSON.stringify({
                  comentario: comentario.comentario,
                  recomenda: comentario.gostou,
                  idJogo: id
                })
            })

            const resposta = await DetalheJogos(id);

            setDetalhes(resposta);
        }

        catch(error){
          console.log(error)
        }
     }

    return(
        <div className=" pb-40 min-h-screen bg-[#212429]">

            <WebSocketClient stateDetalhes={setDetalhes}/>

            <Layout/>

            <div className="pt-15 ">
              {/*Cabeçário */}
               <HeaderDetalheJogos
                  nome={detalhes?.nome}
                  descricao={detalhes?.descricao}
                  lancamento={detalhes?.lancamento}
                  foto_jogo={detalhes?.foto_jogo}
                  percentual={detalhes?.percentual}
                  preco={detalhes?.preco}
                  preco_desconto={detalhes?.preco_desconto}
                  categorias={detalhes?.categorias}
                  desensolvedor_id={detalhes?.desensolvedor_id}
                  nomedesenvolvedor={detalhes?.nomedesenvolvedor}
                  distribuidora_id={detalhes?.distribuidora_id}
                  nome_distribuidora={detalhes?.nome_distribuidora}

                  aceitacao_jogo={detalhes?.aceitacao_jogo}
                  quantidade_comentarios={detalhes?.quantidade_comentarios}
               />

               {/*Slides */}
               <SlidesJogos
                 slides={detalhes?.slides}
               />

               {/*Preço */}
               <Preco
                 nome={detalhes?.nome}
                 preco={detalhes?.preco}
                 preco_desconto={detalhes?.preco_desconto}
                 percentual={detalhes?.percentual}
               />


               {/*Por comentário */}
               <PorComentario
                foto_perfil={usuario?.foto_perfil}
                dados={AdicionarComentario}
               />

               {/*Array de comentários*/}
               <RenderizacaoComents
                nome={usuario?.email}
                foto_perfil={usuario?.foto_perfil}
                comentarios={detalhes?.comentarios}
               />
            </div>
        </div>
    )
}