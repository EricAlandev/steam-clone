'use client'

import Layout from "@/componentes/layout/Layout";
import DestaqueJogos20Reais from "@/componentes/pages/homePage/ate20reais/DestaqueJogos20Reais";
import DestaqueCategoria from "@/componentes/pages/homePage/categorias/DestaqueCategoria";
import JogosDestaques from "@/componentes/pages/homePage/destaques/JogosDestaque";
import Galeria from "@/componentes/pages/homePage/galerias/Galeria";
import RenderJogosGaleria from "@/componentes/pages/homePage/galerias/RenderJogosGaleria";
import { PuxarOpcoesJogos } from "@/servers/services/JogosService";
import { categorias } from "@/servers/types/TypeCategoria";
import { jogos } from "@/servers/types/TypeJogos";
import { useEffect, useState } from "react";

export type opcoesJogos = {
  id: number,
  opcao: string
}

type jogosElista = {
  tipos: opcoesJogos[],
  jogos: jogos[]
}


export  default function Home() {

    const [stateJogosDestaque, setStateJogosDestaque] = useState();
    const [stateCategorias, setStateCategorias] = useState<categorias[]>([]);

    const [statePuxaJogosEspecificos, setStatePuxaJogosEspecificos] = useState<jogos[]>([]);
    const [opcoesJogos, setOpcoesJogos] = useState<jogosElista>();


     //puxar os jogos em destaque
    const puxarJogos = async() => {
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/jogos/api`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
  
        const retorno = await response.json();

        console.log(retorno);
  
        setStateJogosDestaque(retorno);
      }
  
      catch(error){
        console.log(error)
      }
    }

     //puxar os jogos em destaque
     const puxarCategorias = async() => {
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/categorias/api`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
  
        const retorno = await response.json();

        console.log(retorno);

        setStateCategorias(retorno);
      }
  
      catch(error){
        console.log(error)
      }
    }

    //puxar os jogos em destaque
    const puxarAte20Reais = async() => {
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/jogos/api?valor=20`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
  
        const retorno = await response.json();
        
        setStatePuxaJogosEspecificos(retorno);
      }
  
      catch(error){
        console.log(error)
      }
    }

    const puxarOpcoesJogos = async(tipoJogo?: string) => {
      try{
          const opcoes = await PuxarOpcoesJogos(tipoJogo);

          console.log(opcoes);
          setOpcoesJogos(opcoes);
      }

      catch(error){
        console.log(error);
      }
    }

    useEffect(() => {
      puxarJogos();
      puxarCategorias();
      puxarAte20Reais();
      puxarOpcoesJogos();
    }, [])


  return (
    <>
      <div className="flex flex-col min-h-screen pb-5 bg-[#212429]">
        <Layout/>
        
        {/*HomePage */}
        <div className="flex-1  mt-16">


          {/*Jogos em Destaque */}
          <div className="w-[93vw] mx-auto
            md:min-w-[300px] md:max-w-[1159px] pt-10 md:mx-auto ">

            <p className="titulo_HomePage ">
              Descontos e eventos
            </p>

            <JogosDestaques
              jogos={stateJogosDestaque}
            />
          </div>

          {/*Jogos em Destaque */}
          <div className="pt-10 w-[93vw] mx-auto">
            <p className="titulo_HomePage uppercase">Explore por categoria</p>

            <DestaqueCategoria
              asCategorias={stateCategorias}
            />
          </div>

          {/*Games less than R$20,00 */}
          <div className="pt-10 w-[93vw] mx-auto">
            <p className="titulo_HomePage uppercase">Por até R$ 20</p>

            <DestaqueJogos20Reais
              jogos={statePuxaJogosEspecificos}
            />
          </div>

          {/*Gallery of games, like, new one, best sellers etc */}
          <div  className="pt-10 w-[93vw] mx-auto">
            <Galeria
              tiposOpcoes={opcoesJogos?.tipos || []}
              enviarObjeto={puxarOpcoesJogos}
            />

            <RenderJogosGaleria
              osJogos={opcoesJogos?.jogos!}
            />
          </div>
        </div>
      </div>
    </>
  );
}
