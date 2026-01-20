'use client'


import Layout from "@/componentes/layout/Layout";
import LoginForm from "@/componentes/pages/authentication/login/loginForm";
import PrimeiraVez from "@/componentes/pages/authentication/login/PrimeiraVez";

import { useRouter } from "next/navigation";
import { Dado } from "@/componentes/pages/authentication/cadastro/CadastroForm";
import { loginUsuario } from "@/lib/firebase/authentication";
import { dadosGlobais } from "@/componentes/gerenciaContext/GlobalContext";

export type LoginIdentificador = {
    uid: string
}

export default function PageLogin() {

    //context login
    const {login} = dadosGlobais()!;

    const router = useRouter();
    

    const LoginUser = async (dados: Dado) => {
        try {
            const loginFB = await loginUsuario
            (dados.email, dados.senha);

            const token = loginFB.token;
            const uid = loginFB.uid;

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/login/api`, { // URL do seu route.tsx
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: uid
                })
            });

            const result = await response.json();
            console.log(result);
            //gera o context do login
            login(result, token);

            router.push("/")

        } catch (error) {
            console.error('Erro no fetch:', error);
        }
    }

    return(
        <div className="min-h-screen bg-[#171A21]">
            <Layout/>

            <div className="pt-16">
                <LoginForm
                    dadosLogin={LoginUser}
                />
            </div>

            <PrimeiraVez/>
            
        </div>
    )
}