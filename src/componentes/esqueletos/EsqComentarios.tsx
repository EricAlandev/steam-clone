import ConversorDate from "@/lib/functions/ConversorDate"
import { comentarios } from "@/servers/types/TypeJogos"


export default function EsqComentario({
    usuario,
    recomenda,
    data_publicacao,
    comentario
} : comentarios){


    const data = ConversorDate(data_publicacao)

    return(
        <div className="mt-4 ml-4 mr-4 bg-[#16202D] ">

            {/*Linha meramente visual */}
            <p className="h-[2.5px]   bg-gradient-to-r from-[#5EAFDE] to-[#16202D]  "></p>

            {/*Usuário do comentário */}
            <div className=" flex items-center max-w-[253px] pt-4 pl-3 pr-3 pb-8 gap-4 text-[14.5px] truncate">


                {/*Foto perfil */}
                <img
                src={usuario?.foto_perfil}
                alt=""
                className="min-w-[11vw] max-w-[11vw]                
                            min-h-[11vw] max-h-[11vw] rounded-md
                        "
                />
                
                {/*Nome */}
                <p className="text-[white]">{usuario?.email}</p>
            </div>

            {/*Recomendação. */}
            {recomenda && (
                <div className="bg-[#121A24] ml-3 mr-3">
                {/*Recomenda */}
                {recomenda === true ? (
                    <div className="flex items-center gap-4  rounded-r-md">
                        <img
                        src={"/gerais/like.png"}
                        className="min-w-[11vw] max-w-[11vw]              p-1 bg-[#2B5470]"
                        />

                        <p className="font-medium text-[white]">Recomendo</p>
                    </div>
                ) : (
                   <>
                        {/*Não recomenda */}
                        <div className="flex items-center gap-4">
                            <img
                            src={"/gerais/like.png"}
                            className="min-h-[11vw] max-h-[11vw] p-1 bg-[#2B5470] rotate-180"
                            />

                            <p className="font-medium text-[white]">Não recomendo</p>
                        </div>
                   </>
                )}
            </div>
            )}

           <div className="min-h-[100px] pl-2 pr-2 ">
                {/*Data de publicação */}
                <p className="pt-3 mb-2 text-[gray]  uppercase">
                    Publicada: {data}
                </p>

                <p className="max-h-[150px] pb-2 text-[white] border-b-[1px] border-[gray] overflow-y-auto">
                    {comentario}
                </p>
           </div>

            
        </div>
    )
}