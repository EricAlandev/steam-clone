import EsqUsuariosPesquisa from "@/componentes/esqueletos/EsqUsuariosPesquisa"
import { TypeUsuario } from "@/servers/types/TypeUsuario"
import Link from "next/link"

type Usuarios = {
    usuarios? : TypeUsuario[]
}

export default function RenderUsuarios({usuarios} : Usuarios){

    return(
        <>
            {usuarios?.length! > 0 && (
                usuarios?.map((user) => (
                    <div className="flex flex-col gap-4 mt-8">

                        <p className="text-[17px] text-[white] text-center">Usuários encontrados...</p>

                        <Link
                            href={`/usuario/${user?.id}`}
                        >
                            <EsqUsuariosPesquisa
                                nome={user?.nome}
                                foto={user?.foto_perfil}
                            />
                        </Link>
                    </div>
                )) 
            )}
        </>
    )
}