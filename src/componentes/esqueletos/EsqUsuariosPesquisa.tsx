import Link from "next/link"


type UsuariosPesquisa = {
    idUserPesquisa: number,
    nome?: string,
    foto?: string,
    estadoAmizade: string
}

type UserActions = UsuariosPesquisa & {
    adicionar: (idUserAdd: number) => void,
    remover: (idUserAdd: number) => void
} 

export default function EsqUsuariosPesquisa({
    idUserPesquisa,
    nome, 
    foto, 
    estadoAmizade,

    adicionar,
    remover
} : UserActions){

    return(
        <div className="flex justify-between items-center w-[85vw] mx-auto px-2.5 py-2.5 bg-[#000000] rounded-md">  
                {/*Usuário + Perfil */}
                <Link
                href={`/usuario/${idUserPesquisa}`}
                className="flex items-center gap-4"
                >
                    <img
                        src={foto}
                        className="min-w-[20px] max-w-[60px] min-h-[20px] min-h-[60px] rounded-md"
                    />

                    <p className="max-w-[150px] truncate text-[white]">{nome}</p>
                </Link>

                {/*TYPES OF FRIENDSHIP */}
                {estadoAmizade === "Você" && (
                    <div>
                        <button
                        className=" p-2.5  text-[white] bg-[#2A475E] rounded-md"
                        >
                        Você
                        </button>
                    </div>
                )}

                {estadoAmizade === "Amigos" && (
                    <div>
                        <button
                        className=" p-2.5  text-[white] bg-[#2A475E] rounded-md"
                        >
                        Amigos
                        </button>
                    </div>
                )}

                {estadoAmizade === "Não Amigos" && (
                    <div>
                        <button
                        className=" p-2.5  text-[white] bg-[#2A475E] rounded-md"
                        onClick={() => adicionar(idUserPesquisa)}
                        >
                        Adicionar
                        </button>
                    </div>
                )}
        </div> 
    )
}