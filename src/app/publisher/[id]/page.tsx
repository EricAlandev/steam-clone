'use client'

import { dadosGlobais } from "@/componentes/gerenciaContext/GlobalContext";
import HeaderMobile from "@/componentes/header/HeaderMobile";
import HeaderPublisher from "@/componentes/pages/publisher/HeaderPublisher";
import RenderGamesPublisher from "@/componentes/pages/publisher/RenderGamesPublisher";
import RenderGamesCategoryPublisher from "@/componentes/pages/publisher/RenderJogosPublisher";
import type { Distribuidora } from "@/servers/entitys/EntityDistribuira";
import type { Jogos } from "@/servers/entitys/EntityJogos";
import { AddFollower, GamesByCategoryPublisher, PuxarDadosPublisher } from "@/servers/services/PublisherService";
import { jogos } from "@/servers/types/TypeJogos";
import { data } from "framer-motion/client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type opcao = {
    id: number,
    opcao: string
}

export type asOpcoes = {
    id: number, 
    opcoes: opcao
}

type Publisher = {
    publisher: Distribuidora,
    jogos: Jogos[],
    follower: string,
    opcoesJogos: asOpcoes[],
}

export default function PublisherPage(){

    const [dataPublisher, setDataPublisher] = useState<Publisher | null>(null);

    const [gamesPublisher, setGamesPublisher] = useState<jogos[]>([]);
    
    
    const {usuario, token} = dadosGlobais()!;

    const parametros = useParams()!;
    const id = parametros?.id

    useEffect(() => {
        callDataPublisher();
    }, []);
    
 
    const callDataPublisher = async () => {

        if(!id){
            return;
        }   

        try{
            let idValue = {
                id: id
            };

            if(token !== "" && token){
                const tokenValue = {
                    token: token
                };

                idValue = {...idValue, ...tokenValue}; 
            }

            const publisherData = await PuxarDadosPublisher(idValue);

            setDataPublisher(publisherData);
        }

        catch(error){
            console.log(error);
        }
    }

    const SearchOnlyTheGame = async (categoria: string) => {

        if(!id || !categoria){
            return;
        }
        try{
            const valores = {
                id: id,
                categoria: categoria
            }
            const publisherData = await GamesByCategoryPublisher(valores);
            
            console.log("jogos RETORNADOS", publisherData);
           setGamesPublisher(publisherData);
        }

        catch(error){
            console.log(error);
        }
    }

    const AddFollowers = async () => {
        try{
            console.log("enter inside of the add followers");
            const publisherData = await AddFollower(id, token);
            
           await callDataPublisher();
            
        }

        catch(error){
            console.log(error);
        }
    }

    return(
        <div className="min-h-screen bg-[#212429]">
            <HeaderMobile/>
            
            {/*Header publisher */}
            <div className=" pt-15">
                <HeaderPublisher
                    fundo={dataPublisher?.publisher?.fundo}
                    capa={dataPublisher?.publisher?.capa}
                    nome_distribuidora={dataPublisher?.publisher?.nome_distribuidora}
                    seguidores={dataPublisher?.publisher?.seguidores}
                    adicionarSeguidor={AddFollowers}

                />
            </div>

            {/*Render of the games*/}
            <div className="w-[95vw] mx-auto pt-40">
                <RenderGamesCategoryPublisher
                    opcoes={dataPublisher?.opcoesJogos}
                    mudouCategoria={SearchOnlyTheGame}
                />

                <div className="mt-1">
                    <RenderGamesPublisher
                        jogos={gamesPublisher}
                    />
                </div>
            </div>
        </div>
    )
}