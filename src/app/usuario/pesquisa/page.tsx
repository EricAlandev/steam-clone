'use client'

import Layout from "@/componentes/layout/Layout";
import HeaderPesquisaUser from "@/componentes/pages/PesquisaUsuariosPage/HeaderPesquisaUser";
import { Pesquisa } from "@/componentes/pages/PesquisaUsuariosPage/HeaderPesquisaUser";
import RenderUsuarios from "@/componentes/pages/PesquisaUsuariosPage/RenderUsuarios";
import { TypeUsuario } from "@/servers/types/TypeUsuario";
import { useState } from "react";

export default function PagePesquisaUsuarios(){

    const [resultadoPesquisa, setResultadoPesquisa] = useState<TypeUsuario[]>([]);

    const EfetuarPesquisa = async(pesquisa : Pesquisa) => {
        console.log(pesquisa);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/pesquisa/api`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                pesquisa: pesquisa
            })
        })
        const resposta = await response.json();
        setResultadoPesquisa(resposta);
    }

    return(
        <div className="min-h-screen bg-[#212429]">
            <Layout/>

            <div className="pt-20.5">
                <HeaderPesquisaUser
                    envioDaPesquisa={EfetuarPesquisa}
                />

                <RenderUsuarios
                    usuarios={resultadoPesquisa}
                />
            </div>
        </div>
    )
}