'use client'

import { dadosGlobais } from "@/componentes/gerenciaContext/GlobalContext";
import Layout from "@/componentes/layout/Layout";
import HeaderPesquisaUser from "@/componentes/pages/PesquisaUsuariosPage/HeaderPesquisaUser";
import { Pesquisa } from "@/componentes/pages/PesquisaUsuariosPage/HeaderPesquisaUser";
import RenderUsuarios from "@/componentes/pages/PesquisaUsuariosPage/RenderUsuarios";
import { adicionarUserAmizade } from "@/servers/services/SystemFriendShipService";
import { TypeUsuario } from "@/servers/types/TypeUsuario";
import { useState } from "react";

export type RetornoUsuarios = TypeUsuario & {
    estadoAmizade: string
}

export default function PagePesquisaUsuarios(){

    const [resultadoPesquisa, setResultadoPesquisa] = useState<RetornoUsuarios[]>([]);

    const {token} = dadosGlobais()!;

    const EfetuarPesquisa = async(pesquisa : Pesquisa) => {
        console.log(pesquisa);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/pesquisa/api`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({
                pesquisa: pesquisa
            })
        })
        const resposta = await response.json();
        setResultadoPesquisa(resposta);
    }

    const adicionarAmigo = async (idUserAdd: number) => {
        try{
            const adicaoAmigo = await adicionarUserAmizade(idUserAdd, token!) ;
        }

        catch(error){
            console.log(error);
        }
    }

    return(
        <div className="min-h-screen bg-[#212429]">
            <Layout/>

            <div className="pt-20.5">
                <HeaderPesquisaUser
                    envioDaPesquisa={EfetuarPesquisa}
                />

                <RenderUsuarios 
                    resultado={resultadoPesquisa}
                    addFriend={adicionarAmigo}
                />
            </div>
        </div>
    )
}