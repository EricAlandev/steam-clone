
import EsqComentUser from "@/componentes/esqueletos/EsqComentUser"
import { dadosGlobais } from "@/componentes/gerenciaContext/GlobalContext"
import { TypeUsuario } from "@/servers/types/TypeUsuario"


type typeComentarioUser = {
    id?: number,
    comentario?: string,
    data_publicacao?: string
    usuario_enviou: TypeUsuario
}

type comentariosUsers = {
    comentarios? :typeComentarioUser[],
    idUsuario: number,
    idPage: number,

    deletarComentarioRender: (idComentario: number) => void
}

export default  function RenderComentarios({comentarios = [], idPage, idUsuario, deletarComentarioRender} : comentariosUsers){


    const {usuario} = dadosGlobais();

    //verifica se a page é do próprio usuário
    let PageDoProprioUsuario = false;

    //sendo true, o sistema entende que é do próprio user.
    if (idPage === idUsuario){
        PageDoProprioUsuario = true;
    }

    return(
        <div className="flex flex-col gap-4">
            {comentarios.length > 0 ? (
                comentarios.map((c) => {
                    if(Number(c.usuario_enviou.id) !== Number(idPage)){
                        return(
                            <EsqComentUser
                            key={c.id}
                            usuario={c.usuario_enviou}
                            data_publicacao={c.data_publicacao}
                            comentario={c.comentario}
                            PagePertenceAoUser={PageDoProprioUsuario}
        
                            deletarComentario={() =>{
                                deletarComentarioRender(c.id!)
                            }}
                        />
                        )
                    }  
                })
            ) : (
                <p className="mt-4 text-[white] text-[17px] text-center">Sem comentários</p>
            )}
        </div>
    )
}