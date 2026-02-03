
'use client'

import Link from "next/link";
import { useState } from "react"
import { dadosGlobais } from "../gerenciaContext/GlobalContext";
import { useRouter } from "next/navigation";

//types
export type pesquisa = {
    valorPesquisa?: string
}

export default function HeaderMobile(){

    //armazena a pesquisa do usuário
    const [pesquisa, setPesquisa] = useState<pesquisa>({valorPesquisa: ""});

    //renderiza o menu
    const [droperMenu, setDroperMenu] = useState(false);

    //define o tipo de droper já dentro do menu
    const [tipoDroper, setTipoDroper] = useState("");

    //define os tipos permitidos
    type TipoDroper = "loja" | "comunidade"


    const {usuario, logOut} = dadosGlobais()!;
    const router = useRouter();

    //pega valor do Objeto;
    const alteraValor = (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setPesquisa((pesq) => (
                {
                    ...pesq, [name] : value
                }
            ))
    }

    //function que determina qual o droper e se já pode fechar ao clicar de novo
    const droper = async (valor: TipoDroper) => {
        setTipoDroper((tipo) => tipo === valor ? "" : valor)
    }

    return(
        <>
                <header className="fixed top-0 flex items-center w-full  min-h-16 gap-4 mb-10 p-2 bg-[#171A21] z-20">
                {/*Hamburguer Menu */}
                <img
                    src={"/header/hamburguer.png"}
                    onClick={() => setDroperMenu(true)}
                    className="max-h-10"
                    loading="lazy"
                />
    
                {/*Search Bar */}
                <div className="flex items-center gap-0">
                    {/*input de search */}
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            router.push(`/pesquisa?pesquisa=${pesquisa.valorPesquisa}`);
                        }}
                    >
                        <input
                            name="valorPesquisa"
                            value={pesquisa.valorPesquisa}
                            onChange={alteraValor}
                            placeholder="Procurar na loja"
                            className="w-[70vw] p-2 bg-[#35414F] placeholder:text-[#B0B0B0]"
                        />
                    </form>
                    
                    {/*Imagem da lupa*/}
                    <div className="max-h-10 p-2 bg-[#45ACFF] rounded-r-[8px]">
                        <img
                            src={"/header/loupe.png"}
                            className="max-h-7 "
                            loading="lazy"
                        />
                    </div>
                </div>
    
                {/*Dropper */}
                {droperMenu && (
                    <>
                        {/*overlay*/}
                        <div className="fixed inset-0 bg-black 
                        opacity-60"
                            onClick={() => setDroperMenu(false)}
                        ></div>
    
                        {/*Opções */}
                        <aside className="absolute top-0 left-0 w-[70vw] h-screen bg-[#171A21] z-10 ">
                            <nav>
                                <ul>
                                    {/*Define se o user tá logado ou não */}
                                    {usuario ? (
                                        <>
                                        {/*Usuário logado */}
                                        <li className="nav_titulos pt-4 pl-4 pb-4">
                                            <div className="flex items-center gap-2">
                                                {/*Foto Perfil */}
                                                <img
                                                    src={usuario?.foto_perfil}
                                                    className="min-w-[11vw] max-w-[12vw]
                                                    
                                                    min-h-[11vw] max-h-[12vw] rounded-md
                                                    "
                                                />

                                                <Link
                                                    href={`/usuario/${usuario?.id}`}
                                                >
                                                    <p className="text-[16px]">
                                                        Olá!
                                                    </p>
        
                                                    <p className="max-w-[230px] truncate">
                                                        {usuario.email}
                                                    </p>
                                                </Link>
                                            </div>
                                        </li>
                                        </>
                                    ): (
                                        <>
                                        {/*Iniciar sessão*/}
                                        <li className="nav_titulos pt-4 pl-4 pb-4">
                                            <Link href={"/login"}>
                                                iniciar sessão
                                            </Link>
                                        </li>
                                        </>
                                    )}
    
                                    {/*Droper de Lojas */}
                                    <li className="nav_titulos"
                                    onClick={() => droper('loja')}
                                    >
                                        <div className={`flex items-center justify-between pr-4 
                                        ${tipoDroper === "loja" 
                                        ? 
                                        "bg-[#3D4450]" 
                                        :
                                         ""
                                         }
                                         `}>
    
                                            {/*Loja */}
                                            <p className="pt-4 pl-4 pb-4">Loja</p>
    
                                            <img
                                            src={"/header/arrow-down.png"}
                                            className={`${tipoDroper === "loja" ? "rotate-180" : ""}
                                            
                                            `}
                                            loading="lazy"
                                            />
                                        </div>
    
                                        {/*opções do droper de lojas*/}
                                        {tipoDroper === "loja" && (
                                            <ul className="flex flex-col  h-full pb-3 bg-[#30353F]">
                                                <Link href={"/"}
                                                className="nav_subTitulos">
                                                    Início
                                                </Link>
    
                                                <Link href={`/usuario/${usuario?.id}/carrinho`}>
                                                    <li className="nav_subTitulos">Carrinho</li>
                                                </Link>
                                                <li className="nav_subTitulos">Loja de Pontos</li>
                                                <li className="nav_subTitulos">Notícias</li>
                                                <li className="nav_subTitulos">Estatísticas</li>
                                            </ul>
                                        )}
                                    </li>
                                    
                                    {/*comunidade*/}
                                    <li className="nav_titulos "
                                     onClick={() => droper('comunidade')}
                                    >   
                                        <div className={`flex items-center justify-between pr-4
                                        ${tipoDroper === "comunidade" ? "bg-[#3D4450]" : ""}`
                                        }>
                                            {/*Comunidade */}
                                            <p className={`pt-4 pl-4 pb-4`}>Comunidade</p>
    
                                            <img
                                            src={"/header/arrow-down.png"}
                                            className={`${tipoDroper === "comunidade" ? "rotate-180" : ""}`}
                                            loading="lazy"
                                            />
                                        </div>
    
                                        {/*opções do droper de comunidade*/}
                                        {tipoDroper === "comunidade" && (
                                            <ul className="flex flex-col bg-[#30353F]">
                                                <Link 
                                                 href="/usuario/pesquisa" className="nav_subTitulos">Usuários</Link>
                                                <li className="nav_subTitulos">Início</li>
                                                <li className="nav_subTitulos">Início</li>
                                                <li className="nav_subTitulos">Início</li>
                                                <li className="nav_subTitulos">Início</li>
                                                <li className="nav_subTitulos">Início</li>
                                            </ul>
                                        )}  
                                    </li>
                                    
                                    {/*Sobre */}
                                    <li className="nav_titulos pt-4 pl-4 pb-4">
                                        Sobre
                                    </li>
    
                                    {/*Apoio */}
                                    <li 
                                    onClick={async () => await logOut()}
                                    className="nav_titulos pt-4 pl-4 pb-4">
                                        Sair
                                    </li>
                                </ul>
                            </nav>
                        </aside>
                    </>
                )}
            </header>
        </>
    )

}