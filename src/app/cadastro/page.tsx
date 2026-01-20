
'use client'

import Layout from "@/componentes/layout/Layout";
import CadastroForm from "@/componentes/pages/authentication/cadastro/CadastroForm";
import { useRouter } from "next/navigation";


//type de dados
import { Dado } from "@/componentes/pages/authentication/cadastro/CadastroForm";
import { criarUsuario } from "@/lib/firebase/authentication";


export default function PageCadastro(){

    const router = useRouter();

    const CadastroUser = async (dados: Dado) => {
        try {
            const uid = await criarUsuario(dados.email, dados.senha);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/cadastro/api`, { // URL do seu route.tsx
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: uid,
                    email: dados.email
                })
            });

            const result = await response.json();
            console.log('Resposta do servidor:', result);
            router.push("/login")

        } catch (error) {
            console.error('Erro no fetch:', error);
        }
    }

    return(
        <>
            <Layout/>
            <div className="mt-15.5">
                <CadastroForm
                  dadosCadastro={CadastroUser}
                />
            </div>
        </>
    )
}