//usuario/[id]/page.tsx

'use client'

import { dadosGlobais } from "@/componentes/gerenciaContext/GlobalContext";
import Layout from "@/componentes/layout/Layout";
import HeaderUsuario from "@/componentes/pages/UsuarioPage/HeaderUsuario";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type retornoState = {
    email : string,
    nome : string,
    foto_perfil: string,
    pais: string,
    descricao: string,
    nivel: number
}

export default function PageUsuario(){

    const [dadosUsuario, setDadosUsuario] = useState<retornoState>();

    const {id} = useParams()!;

    const {usuario, loading} = dadosGlobais()!;



    //puxa dados daquele usuário;
    const puxarDadosDoUsuarioClient = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/api/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const resposta = await response.json();

        setDadosUsuario(resposta);

        console.log(resposta);
    }

    useEffect(() => {
        const puxar = async() => {
            await puxarDadosDoUsuarioClient();
        }

        if(!loading){
            console.log("Renderizando, Loading é", loading);

            puxar();
        }
    }, [loading, id])


    return(
            <>
               <div className="min-h-screen bg-gradient-to-r from-[rgb(33,50,57)]   
              to-[#2E222E]">
                        <Layout/>
            
                        <div className="pt-20.5">
                            <HeaderUsuario
                                idPage={id}
                                idUsuario={usuario?.id}
                                foto_perfil={dadosUsuario?.foto_perfil}
                                nome={dadosUsuario?.nome}
                                email={dadosUsuario?.email}
                                pais={dadosUsuario?.pais}
                                descricao={dadosUsuario?.descricao}
                                nivel={dadosUsuario?.nivel}
            
                            />
                        </div>
                </div>
            </>
    )
}