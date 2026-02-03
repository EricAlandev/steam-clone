


'use client'

import { TypeUsuario } from "@/servers/types/TypeUsuario";
import { useState } from "react"


type EnvioForm = {
    envioDados: (dados: TypeUsuario) => void
}

export default function FormAlterarPerfil(
    {envioDados} : EnvioForm
){

    const [dadosUsuario, setDadosUsuarios] = useState<TypeUsuario>({
        nome: "",
        foto_perfil: "",
        descricao: "",
        pais: ""
    });

    const pegarDados = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setDadosUsuarios((dado) => ({
            ...dado, [name] : value
        }))
    }

    return(
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <form 
             onSubmit={(e) => {
                e.preventDefault();
                envioDados(dadosUsuario);
             }}
             className="flex flex-col w-[70vw] gap-4 text-[white]"
            >

                {/*Imagem  */}
                <div className="flex flex-col gap-2">
                    <p className="textoEdicaoPerfil text-[18px] text-center">
                            Foto de Perfil
                    </p>

                    {/*Fotos de perfil */}
                    <div className="flex gap-4 justify-center">
                        <img
                            src={"/login/imagemFundo.webp"}
                            className="w-20 h-20 border-[2px] border-[white] rounded-md"
                            onClick={() => setDadosUsuarios({
                                ...dadosUsuario, foto_perfil: "/login/imagemFundo.webp"
                            })}
                        />

                        <img
                            src={"/jogos/distribuidora/wallpaper/WallpaperPadrao.png"}
                            className="w-20 h-20 border-[2px] border-[white] rounded-md"
                            onClick={() => setDadosUsuarios({
                                ...dadosUsuario, foto_perfil: "/jogos/distribuidora/wallpaper/WallpaperPadrao.png"
                            })}
                        />
                    </div>
                </div>

                {/*Edição nome */}
                <div className="flex flex-col gap-2">
                    <label className="textoEdicaoPerfil">
                        Nome
                    </label>

                    <input
                        name="nome"
                        value={dadosUsuario.nome}
                        onChange={pegarDados}
                        placeholder="Novo nome.."
                        className="tipoInputAlterarPerfil "
                    />
                </div>

                {/*Descrição  */}
                <div className="flex flex-col gap-2">
                    <label className="textoEdicaoPerfil">
                            Descrição
                    </label>

                    <input
                        name="descricao"
                        value={dadosUsuario.descricao}
                        onChange={pegarDados}
                        placeholder="Nova descrição.."
                        className="tipoInputAlterarPerfil"
                    />
                </div>

                {/*Edição  país*/}
                <div className="flex flex-col gap-2">
                    <label className="textoEdicaoPerfil">
                        País
                    </label>

                    <select
                     name="pais"
                     value={dadosUsuario.pais}
                     onChange={pegarDados}
                     className="tipoInputAlterarPerfil text-[white]"
                    >
                        <option value={"Brasil"}>Brasil</option>
                        <option value={"USA"}>Estados Unidos</option>
                    </select>
                </div>  


                <button
                 className="login_button mt-4.5"
                >
                    Alterar
                </button>
            </form>
        </div>
    )
}