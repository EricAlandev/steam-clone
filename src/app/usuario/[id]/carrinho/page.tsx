'use client'

import EsqCarrinho from "@/componentes/esqueletos/carrinho/EsqCarrinho";
import { dadosGlobais } from "@/componentes/gerenciaContext/GlobalContext";
import Layout from "@/componentes/layout/Layout";
import { AddGameCart, BuyGamesInCart, pullGames, RemoveGamesCart } from "@/servers/services/user/carrinho/ListToBuyService";
import { jogos } from "@/servers/types/TypeJogos";
import { useEffect, useState } from "react";

type ArrayJogos = {
    jogosCarrinhos: jogos[],
    valorEstimado : number
}

export default function Carrinho(){
     
    const [arrayJogos, setArrayJogos] = useState<ArrayJogos>();
    const [popUp, setPopUp] = useState<string>();


    const {usuario, token} = dadosGlobais()!;

    //puxa todos os jogos do Carrinho;
    const puxarJogosCarrinho = async() => {
        try{
          const gamesInTheCart = await pullGames(usuario.id, token);
          setArrayJogos(gamesInTheCart);
        }

        catch(error){
          console.log(error);
        }
    }

    //POST
    const AdicionarJogoAoCarrinho = async (id: number) => {
      try{
        
        const addGame = await AddGameCart(id, usuario.id, token);

        await puxarJogosCarrinho();
      }

      catch(error){ 
        console.log(error);
      }
     }
    
    //DELETE
    const deletaJogosDoCarrinho = async(id : number) => {
      try{
        const deleteGame = await RemoveGamesCart(id, usuario?.id, token);

        await puxarJogosCarrinho();
      }

      catch(error){
        console.log(error);
      }
    }

    //PAY FOR THE GAME
    const PayForTheGames = async() => {
      try{
        const pay = await BuyGamesInCart(usuario?.id, token);

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
                  pagar={PayForTheGames}
                />
            </div>
        </div>
    )
}