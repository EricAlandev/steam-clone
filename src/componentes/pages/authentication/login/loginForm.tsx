'use client'

import { useState } from "react"
import { Dado } from "../cadastro/CadastroForm";

//type dos dados enviados
type typeLogin = {
    dadosLogin: (dados: Dado) => void
}

//form de login
export default function LoginForm({dadosLogin}: typeLogin){


    const [dados, setDados] = useState<Dado>({email: "", senha: ""});

    //define o changer dos dados;
    const PegarDados = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDados((dado) => (
           {...dado, [name] : value}
        ))
    }

    return(
        <>
            {/*Overlay */}
            <div className="fixed inset-0 bg-[black] opacity-82 z-10"></div>

            {/*Imagem de fundo */}
            <img
                src="/login/imagemFundo.webp"
                className="
                    fixed w-full h-[70vh] z-0
                "
                />
            
            {/*Login em si*/}
            <div className="absolute z-15 w-full">
                
                {/*Tittle */}
                <h1 className="login_Tittle mt-6 mb-20">
                    Iniciar sessão
                </h1>

                {/*Formulário */}
                <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    dadosLogin(dados);
                }}
                className="w-[80vw] mx-auto"
                >

                    <label htmlFor=""
                    className="block mt-4 font-bold uppercase text-[#1879FF]">
                        iniciar sessão com o nome de usuário
                    </label>

                    {/*Email */}
                    <input
                        type="email"
                        name="email"
                        value={dados.email}
                        onChange={PegarDados}
                        className="w-full mt-1.5 p-2.5 bg-[#393C44] rounded-[8px] text-[white]"
                    />
                    
                    <label htmlFor=""
                    className="block mt-4 font-medium text-[#A0A0A0] uppercase ">
                        senha
                    </label>

                    {/*Senha */}
                    <input
                        type="password"
                        name="senha"
                        value={dados.senha}
                        onChange={PegarDados}
                        className="w-full mt-1.5 p-2.5 bg-[#393C44] rounded-[8px] text-[white]"
                    />

                    <div className="flex gap-2">
                        <input
                            type="checkbox"
                        />

                        <label className="text-[#A0A0A0]">
                            Lembre-me
                        </label>
                    </div>

                    <button
                      className="login_button mt-6 text-[20px]"
                    >
                        Iniciar sessão
                    </button>
                </form>
            </div>

            
                
        </>
    )
}