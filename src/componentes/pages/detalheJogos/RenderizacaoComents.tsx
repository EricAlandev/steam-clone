
import EsqComentario from "@/componentes/esqueletos/EsqComentarios"
import { comentarios } from "@/servers/types/TypeJogos"


type comentariosArray = {
    nome: string,
    foto_perfil: string,
    comentarios?: comentarios[]
}

export default function RenderizacaoComents({comentarios,nome, foto_perfil} : comentariosArray){

    return(
        <>
            <p className="mt-7 ml-4 text-[#D0D0D0] uppercase">análises mais úteis</p>

            {comentarios?.map((coment) => (
                <EsqComentario
                    nome={nome}
                    foto_perfil={foto_perfil}
                    recomenda={coment.recomenda}
                    data_publicacao={coment.data_publicacao}
                    comentario={coment.comentario}
                />
            ))}
        </>
    )
}