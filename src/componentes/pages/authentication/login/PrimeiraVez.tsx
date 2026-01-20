import Link from "next/link";


export default function PrimeiraVez(){

    return(
        <div className="absolute  bottom-35 z-15 flex flex-col w-full mx-auto  gap-4 ">
            {/*Tittle */}
            <h2 className="cadastro_Tittle mt-4">Primeira vez no Steam?</h2>


            {/*redireciona para o cadastro */}
            <Link
             href={"/cadastro"}
             className="redireciona_cadastro_button text-[16px]"
            >
                Cadastrar-se
            </Link>

            {/*texto footer */}
            <p className="max-w-[318px] mx-auto text-[#F0F0F0]  ">
            É gratuito e fácil. Descubra milhares de jogos para jogar com milhões de novos amigos. <br/>
            
            {/*Redireciona para /sobreSteam */}
             <Link 
             href={"/"}
             className="block text-center underline"
             >
                Saiba mais sobre o Steam
             </Link>
            </p>
        </div>
    )
}