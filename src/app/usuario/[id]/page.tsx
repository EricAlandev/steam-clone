//usuario/[id]/page.tsx

'use client'
import EsqPopUpAmigos from "@/componentes/esqueletos/popUps/EsqPopUpAmigos";
import { dadosGlobais } from "@/componentes/gerenciaContext/GlobalContext";
import Layout from "@/componentes/layout/Layout";
import PorComentario from "@/componentes/pages/detalheJogos/PorComentario";
import HeaderUsuario from "@/componentes/pages/UsuarioPage/HeaderUsuario";
import PorComentariosU from "@/componentes/pages/UsuarioPage/PorComentariosU";
import RenderComentarios from "@/componentes/pages/UsuarioPage/RenderComentarios";

import { adicionarComentariosPerfil, deletarComentarioPerfil } from "@/servers/services/SystemComentsService";
import { adicionarUserAmizade, deletarAmigo } from "@/servers/services/SystemFriendShipService";
import { TypeUsuario } from "@/servers/types/TypeUsuario";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


type comentarioUser = {
    id?: number,
    comentario?: string,
    data_publicacao?: string
}

export type TypeAmigos = {
    id: number,
    usuario1: TypeUsuario,
    usuario2: TypeUsuario
}

type retornoState = {
    amigo1: TypeAmigos[],
    amigo2: TypeAmigos[],
    usuario_que_recebeu?: comentarioUser[],
    usuario?: comentarioUser[],
    email? : string,
    nome? : string,
    foto_perfil?: string,
    pais?: string,
    descricao?: string,
    nivel?: number
}

export default function PageUsuario(){

    const [dadosUsuario, setDadosUsuario] = useState<retornoState>();
    const [tipoPopUp, setTipPopUp] = useState<string | null>();


    const {id} = useParams()!;

    const {usuario, loading, token} = dadosGlobais()!;

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

    //friendships merge
    const amigosDoUser = [...(dadosUsuario?.amigo2 || []), ...(dadosUsuario?.amigo1 || [])]

    //Add friend
    const AddFriend = async(idUsuarioParaAdd: number) => {
        try{
            const addFriend = await adicionarUserAmizade(idUsuarioParaAdd, token!);

            await puxarDadosDoUsuarioClient();
        }

        catch(error){
            console.log(error);
        }
    }

    //exclude friend
    const DelFriend = async(idUsuarioParaDel: number) => {
        try{
            const addFriend = await deletarAmigo(idUsuarioParaDel, token!);

            await puxarDadosDoUsuarioClient();
        }

        catch(error){
            console.log(error);
        }
    }

    //add coment
    const AddComent = async(comentario: string) => {
        try{
            const addFriend = await adicionarComentariosPerfil(id,comentario, token!);

            await puxarDadosDoUsuarioClient()

            setTipPopUp(`${dadosUsuario?.nome} foi adicionar a sua lista de amigos`);
        }

        catch(error){
            console.log(error);
        }
    }

    //delete coment
    const DeleteComent = async(idComentario: number) => {
        try{
            const deleteComent = await deletarComentarioPerfil( idComentario, token!);

            await puxarDadosDoUsuarioClient();
        }

        catch(error){
            console.log(error);
        }
    }

    //DEFINE TIPO DE POPUP
    const DefineTipoPopUp = (tipo: string) => {
        setTipPopUp(tipo);
    }

    useEffect(() => {
        const puxar = async() => {
            await puxarDadosDoUsuarioClient();
        }

        if(!loading){
            console.log("Renderizando, Loading é", loading);

            puxar();
        }
    }, [loading, id]);


    return(
            <>
               <div className="min-h-screen bg-gradient-to-r from-[rgb(33,50,57)]   
              to-[#2E222E]">
                        <Layout/>

                        {/*Componentes*/}
                        <div className="pt-20.5">
                            <HeaderUsuario
                                idPage={Number(id)}
                                idUsuario={usuario?.id}
                                foto_perfil={dadosUsuario?.foto_perfil}
                                nome={dadosUsuario?.nome}
                                email={dadosUsuario?.email}
                                pais={dadosUsuario?.pais}
                                descricao={dadosUsuario?.descricao}
                                nivel={dadosUsuario?.nivel}

                                amigos={amigosDoUser}
                                
                                adicionarAmigo={AddFriend}
                                deletarAmigo={DelFriend}
                                tipoPopUp={DefineTipoPopUp}
                            />

                            <PorComentariosU
                              dados={AddComent}
                            />

                            {/*Render Comentários */}
                            <div className="max-h-[34vh] overflow-y-auto">
                                {/*Tittle */}
                                <p className="w-[95vw] mx-auto mt-6 p-3 bg-[#242D3F] text-[18px] text-[white] rounded-md">
                                    Comentários
                                </p>
                                
                                <RenderComentarios
                                    idUsuario={usuario?.id}
                                    idPage={Number(id)}
                                    comentarios={dadosUsuario?.usuario_que_recebeu}

                                    deletarComentarioRender={DeleteComent}
                                />
                            </div>
                        </div>

                        {/*Pop Ups */}
                        {tipoPopUp === "Amigos" && (
                            <EsqPopUpAmigos
                                idUsuarioAtual={id}
                                nomeUsuario={dadosUsuario?.nome}
                                closePopUp={() => setTipPopUp(null)}
                                amigos={amigosDoUser}
                            />
                        )}
                </div>
            </>
    )
}