'use client'

import { useState } from "react";

export type Pesquisa = {
    pesquisa? : string
}
 
type envioPesquisa = {
    envioDaPesquisa : (pesquisa: Pesquisa) => void;
}

export default function HeaderPesquisaUser({envioDaPesquisa} : envioPesquisa){

    const [dados, setDados] = useState<Pesquisa>({pesquisa : ""});

    const pegarValues = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDados((dado) => (
            {...dado, [name] : value}
        ))
    }

    return(
        <>
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    envioDaPesquisa(dados);
                }}
                className="flex flex-col gap-8 w-[85vw] mx-auto "
            >
                <label
                id="pesquisa"
                className="login_Tittle"
                >
                    Pesquise o usuário
                </label>

                <input
                    id="pesquisa"
                    name="pesquisa"
                    onChange={pegarValues}
                    placeholder="Pesquisa Usuário"
                    className="p-3 bg-[#393C44] rounded-md  
                    
                    text-[white]
                    "
                />
            </form>
        </>
    )
}