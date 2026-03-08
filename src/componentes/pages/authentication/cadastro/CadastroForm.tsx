
'use client'

import { useState } from "react"

    //type dado
    export type Dado = {
        autorizacao: string,
        uid?: string,
        nome: string,
        email: string,
        senha: string,
        pais: string
    }
    
    //define os dados enviados com um return void
    type DadoCadastro = {
        dadosCadastro: (dados: Dado) => void
    }

//form de login
export default function CadastroForm({dadosCadastro}: DadoCadastro){


    //define o dado específico
    const [dados, setDados] = useState<Dado>({
        autorizacao: "",
        nome: "",
        email: "", 
        senha: "",
        pais: ""
    });

    //Pega os values dos inputs
    const PegaValues = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        setDados((dado) =>  (
            {...dado, [name] : value}
        ))
    }


    return(
        <>
            {/*Login em si*/}
            <div className="min-h-screen bg-[#212429]">
                
                {/*Tittle */}
                <h1 className="w-[80vw] mx-auto mt-6 mb-20 pt-10 text-[30px] text-[white] font-medium tracking-widest">
                    CADASTRAR-SE
                </h1>

                {/*Formulário */}
                <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    dadosCadastro(dados);
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] mx-auto"
                >
                    <label htmlFor="nome"
                    className="block mt-4 font-bold uppercase text-[#A0A0A0]">
                        Nome
                    </label>

                    {/*Nome */}
                    <input
                        type="nome"
                        id="nome"
                        name="nome"
                        value={dados.nome}
                        onChange={PegaValues}
                        className="w-full mt-1.5 p-2.5 bg-[#393C44] rounded-[8px] text-[white]"
                    />

                    {/*Select Country */}
                    <label htmlFor="pais"
                    className="block mt-4 font-bold uppercase text-[#A0A0A0]">
                        País
                    </label>

                    <select 
                    name="pais" 
                    id="pais"
                    value={dados?.pais}
                    onChange={PegaValues}
                    className="w-full mt-1.5 p-2.5 bg-[#393C44] rounded-[8px] text-[white]"
                    >
                        <option
                          value={"Brasil"}
                        >
                            Brasil
                        </option>

                        <option
                          value={"USA"}
                        >
                            USA
                        </option>
                    </select>

                {/*Select Authorization */}
                <label htmlFor="autorizacao"
                    className="block mt-4 font-bold uppercase text-[#A0A0A0]">
                        Autorização
                    </label>

                <select 
                    name="autorizacao" 
                    id="autorizacao"
                    value={dados?.pais}
                    onChange={PegaValues}
                    className="w-full mt-1.5 p-2.5 bg-[#393C44] rounded-[8px] text-[white]"
                >
                        <option
                          value={"dev"}
                        >
                            Desenvolvedor
                        </option>

                        <option
                          value={"publisher"}
                        >
                            Distribuidora
                        </option>

                        <option
                          value={"client"}
                        >
                            Comprador
                        </option>
                </select>

                    <label htmlFor="email"
                    className="block mt-4 font-bold uppercase text-[#1879FF]">
                        Endereço do e-mail
                    </label>

                    {/*Email */}
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={dados.email}
                        onChange={PegaValues}
                        className="w-full mt-1.5 p-2.5 bg-[#393C44] rounded-[8px] text-[white]"
                    />
                    
                    <label htmlFor="senha"
                    className="block mt-4 font-medium text-[#A0A0A0] uppercase ">
                        senha
                    </label>

                    {/*Senha */}
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        value={dados.senha}
                        onChange={PegaValues}
                        className="w-full mt-1.5 p-2.5 bg-[#393C44] rounded-[8px] text-[white]"
                    />

                    <div className="flex gap-2 mt-4.5">
                        <input
                            type="checkbox"
                            className="w-5"
                            required
                        />

                        <label className="
                          max-w-[310px]
                        text-[#A0A0A0]
                          text-[14px]
                        ">
                            Tenho 13 anos de idade ou mais e aceito os termos do 
                            <span className="pl-2 pr-1 text-[white]">Acordo de Assinatura do Steam</span>
                            e da 
                            <span className="pl-2 pr-1 text-[white]">Política de Privacidade da Valve.</span>
                        </label>
                    </div>

                    <button
                      className="block mx-auto w-[80vw]  p-2.5  text-[white] bg-gradient-to-r from-[#06BFFF] to-[#2D75FF] rounded-md mt-6 text-[20px]"
                    >
                        Continuar
                    </button>
                </form>
            </div>

            
                
        </>
    )
}