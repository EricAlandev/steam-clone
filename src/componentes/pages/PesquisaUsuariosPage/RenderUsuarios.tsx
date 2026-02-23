import { RetornoUsuarios } from "@/app/usuario/pesquisa/page"
import EsqUsuariosPesquisa from "@/componentes/esqueletos/EsqUsuariosPesquisa"

type result = {
    resultado : RetornoUsuarios[],
    addFriend: (idUserAdd: number) => void;
}

export default function RenderUsuarios({
    resultado,
    addFriend
    } : result){

    return(
        <>
            {resultado?.length > 0 && (
                resultado?.map((user) => (
                    <div className="flex flex-col gap-4 mt-8">

                        <p className="text-[17px] text-[white] text-center">Usuários encontrados...</p>

                            <EsqUsuariosPesquisa
                                idUserPesquisa={Number(user?.id)}
                                nome={user?.nome}
                                foto={user?.foto_perfil}
                                estadoAmizade={user.estadoAmizade}

                                adicionar={addFriend}
                                remover={() => 0}
                            />
                    </div>
                )) 
            )}
        </>
    )
}