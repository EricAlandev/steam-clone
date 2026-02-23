'use client'

import EsqPopUp from "@/componentes/esqueletos/popUps/EsqPopUp";

import Layout from "@/componentes/layout/Layout";
import FormAlterarPerfil from "@/componentes/pages/PageEditarPerfil/FormAlterarPerfil";
import { TypeUsuario } from "@/servers/types/TypeUsuario";
import { useState } from "react";
import { dadosGlobais } from "@/componentes/gerenciaContext/GlobalContext";
import { useRouter } from "next/navigation";

export default function PageEditarPerfil(){
    const [popUp, setPopUp] = useState<string>();

    const { token, loading} = dadosGlobais()!;
    const router = useRouter();



    const AlterarUsuario = async (dados: TypeUsuario) => {
        try{
            console.log("antes")
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/Edicao/api`, {
                method: 'PUT',
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify({
                    nome: dados.nome,
                    foto_perfil: dados.foto_perfil,
                    descricao: dados.descricao,
                    pais: dados.pais
    
                })
            })

            console.log("resposta")
            const resposta = await response.json();

            setPopUp(resposta.mensagem);
        }

        catch(error){
            if(error instanceof Error){//InstanceOf, verifica se a origem do elemento error vem do Objeto Error que é padrão TS;
                console.log(error?.message);

                setPopUp(`${error}`);
            }

            
        }
    }

    if (loading === true){
        return(
            <div>
                <p>Carregando...</p>
            </div>
        )
    }

    if (loading === false && !token){
            router.push("/login");
            return null;
    }

    return(
        <>
            <div className="h-screen bg-[#212429]">
                <Layout/>

                <div >
                    <FormAlterarPerfil
                        envioDados={AlterarUsuario}
                    />
                </div>

                {popUp === "Dados atualizados com sucesso" && (
                    <EsqPopUp
                        mensagem={popUp}
                        closePopUp={() => setPopUp("")}
                    />
                )}

                {popUp === "error" && (
                    <EsqPopUp
                        mensagem={popUp}
                        closePopUp={() => setPopUp("")}
                    />
                )}
            </div>
        </>
    )
}