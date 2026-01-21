
import EsqComentario from "@/componentes/esqueletos/EsqComentarios"
import { comentarios } from "@/servers/types/TypeJogos"


type comentariosArray = {
    comentarios?: comentarios[]
}

export default function RenderizacaoComents({comentarios} : comentariosArray){

    return(
        <>
            <p className="mt-7 ml-4 text-[#D0D0D0] uppercase">análises mais úteis</p>

            {comentarios?.map((coment) => (
                <EsqComentario
                    usuario={coment.usuario}
                    recomenda={coment.recomenda}
                    data_publicacao={coment.data_publicacao}
                    comentario={coment.comentario}
                />
            ))}
        </>
    )
}