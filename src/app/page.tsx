'use client'

import Layout from "@/componentes/layout/Layout";
import JogosDestaques from "@/componentes/pages/homePage/destaques/JogosDestaque";
import { useEffect, useState } from "react";


export  default function Home() {

    const [stateJogosDestaque, setStateJogosDestaque] = useState();

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

    useEffect(() => {
      puxarJogos();
    }, [])


  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#212429]">
        <Layout/>
        
        {/*HomePage */}
        <div className="flex-1  mt-16">
          {/*Jogos em Destaque */}
          <div className="pt-10 ">
            <JogosDestaques
              jogos={stateJogosDestaque}
            />
          </div>
        </div>
      </div>
    </>
  );
}
